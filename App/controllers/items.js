import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

export const registerItem = (
  item,
  progressStorage = null,
  errorStorage = null,
  completeStorage = null
) => {


  if (typeof item.owners === undefined || item.owners.length <= 0) {
    throw new Error('No owner is assigned');
  }

  if (typeof item.categories === undefined || item.categories.length <= 0) {
    throw new Error('Item must belong in a category');
  }

  var categories = {};
  for (let c of item.categories) {
    categories[c] = true;
  }

  if (typeof item.dateOwned === undefined || item.dateOwned <= 0) {
    throw new Error('Date must be assigned');
  }

  if (typeof item.name === undefined || item.name === ''){
    throw new Error('Name must be defined');
  }

  const toUpload = {
    owners: item.owners,
    name: item.name,
    dateOwned: item.dateOwned,
    description: item.description,
    dateRegistered: Date.now(),
    dateUpdated: Date.now(),
    categories: categories,
  };
  var uploadToFirestore = firebase.firestore().collection('items').add(toUpload);
  var uploadImages = [];
  if (item.photos.length > 0) {
    for (let i = 0; i < item.photos.length; i++) {
      var promise = uploadToFirestore.then(data => {
        uploadImageAsPromise(
          data.id,
          item.photos[i],
          progressStorage,
          errorStorage,
          completeStorage
        );
      });
      uploadImages.push(promise);
    }
  }

  return Promise.all([uploadToFirestore, ...uploadImages]);
};

const uploadImageAsPromise = (itemID, filepath, progress, error, complete) => {
  return new Promise(function(resolve, reject) {
    var storageRef = firebase.storage().ref(`itemsPhotos/${itemID}/${Date.now()}`);

    //Upload file
    var task = storageRef.putFile(filepath);

    //Update progress bar
    task.on(
      'state_changed',
      progress
        ? progress
        : snapshot => {
            console.log(
              snapshot.downloadURL +
                ': ' +
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
      error
        ? error
        : err => {
            console.log(err);
          },
      complete
        ? complete
        : () => {
            console.log('upload is complete!');
          }
    );
  });
};

const deleteImageAsPromise = (itemID, photosNames) => {
  var deletionPromise = [];
  for (let i = 0; i < photosNames.length; i++) {
    deletionPromise.push(firebase.storage().ref(`itemsPhotos/${itemID}/${photosNames[i]}`).delete());
  }
  return deletionPromise;
};

// view item detail
export const viewItem = async itemId => {
  const itemDetails = await firebase.firestore().collection('items').doc(itemId).get();
  const picturesReferences = await firebase.storage().ref(`itemsPhotos/${itemId}/`).listAll();
  var downloadURLs = [];
  for (let i = 0; i < picturesReferences.items.length; i++) {
    downloadURLs.push(await picturesReferences.items[i].getDownloadURL());
  }
  const data = itemDetails.data();
  console.log(data);
  var categoriesList = [];
  for (let category in data.categories){
    categoriesList.push(category);
  }

  console.log(categoriesList);
  return {
    ...data,
    categories: categoriesList,
    dateOwned: new Date(data.dateOwned),
    dateRegistered: new Date(data.dateRegistered),
    photos: downloadURLs,
  };
};

export const getDataList = async (
  pageStart,
  limit,
  order,
  categories
) => {
  if (pageStart < 0) {
    pageStart = 0;
  }

  if (order === undefined || order.field === undefined) {
    order = {
      field: 'dateOwned',
      direction: 'desc',
    };
  }

  if (order.direction !== 'desc' && order.direction !== 'asc') {
    order.direction = 'desc';
  }

  if (limit < 0) {
    limit = 10;
  }
  var categoriesMap = {};

  for (let i = 0; i < categories.length; i++){
    categoriesMap[categories[i]] = true;
  }

  var query = firebase.firestore().collection('items').orderBy(order.field, order.direction);

  if (pageStart != null){
    query = query.startAfter(pageStart);
  }

  const querySnapshot = await query.limit(limit).get();

  const items = querySnapshot.docs;

  const withinCategory = data => {
    // check if not categories was set
    if (Object.entries(categoriesMap).length === 0 && categoriesMap.constructor === Object){
      return true;
    }

    // only include items that has all categories
    var item = data.data();
    for (let category in categoriesMap){
      if (!(category in item.categories)) {
        return false;
      }
    }

    return true;
  };


  const dataTransform = async data => {
    var item = data.data();

    // converting categories into a list
    var categoryList = [];
    for (let category in item.categories){
      categoryList.push(category);
    }
    item.categories = categoryList;
    item.id = data.id;
    // getting thumbnails
    const thumbnailList = await firebase.storage()
      .ref(`${data.id}/`)
      .list({ maxResults: 1 });
    if (thumbnailList.items.length > 0) {
      item.thumbnail = await thumbnailList.items[0].getDownloadURL();
    } else {
      item.thumbnail = '';
    }
    return item;
  };

  var listOfItems = [];
  for (let i = 0; i < items.length; i++) {
    if (!withinCategory(items[i])) {continue;}
    listOfItems.push(await dataTransform(items[i]));
  }
  console.log(listOfItems.length);
  return listOfItems;
};

export const editItemWithPhotosUpload = (
  itemID,
  updated,
  progressStorage,
  errorStorage,
  completeStorage
) => {
  var editItemPromise = editItemWithoutPhotosModification(itemID, updated);
  var addedPhotosPromise = [];
  if (updated.photos !== []) {
    for (let i = 0; i < updated.photos.length; i++) {
      var promise = editItemPromise.then(data => {
        uploadImageAsPromise(
          data.id,
          updated.photos[i],
          progressStorage,
          errorStorage,
          completeStorage
        );
      });
      addedPhotosPromise.push(promise);
    }
  }

  return Promise.all([editItemPromise, ...addedPhotosPromise]);
};

export const editItemWithPhotosDelete = (itemID, updated) => {
  var editItemPromise = editItemWithoutPhotosModification(itemID, updated);
  var deletePhotos = [];
  if (updated.photos !== []) {
    deletePhotos = deleteImageAsPromise(itemID, updated.photos);
  }
  return Promise.all([editItemPromise, ...deletePhotos]);
};

export const editItemWithoutPhotosModification = (itemID, updated) => {
  const toUpload = { dateUpdated: Date.now() };

  if (updated.owners !== []) {
    var owners = {};
    for (let o of updated.owners) {
      owners[o] = true;
    }
  }

  if (updated.dateOwned) {
    toUpload.dateOwned = updated.dateOwned;
  }

  if (updated.description) {
    toUpload.description = updated.description;
  }

  if (updated.dateRegistered) {
    return {
      error:
        "Hello there, you're not supposed to be able to do this but here you are, if you could create a github issue telling me how you did it, please do that, I'll appreciate you so much",
    };
  }

  if (updated.categories) {
    toUpload.categories = updated.categories;
  }

  return firebase.firestore().collection('items').doc(itemID).udpate(toUpload);
};
