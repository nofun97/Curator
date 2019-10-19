import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

const collection = firebase.firestore().collection('items');
const storage = firebase.storage();

export const registerItem = (
  item,
  progressStorage,
  errorStorage,
  completeStorage
) => {
  if (!item.owners) {
    return {
      error: 'No owner is assigned',
    };
  }

  var owners = {};
  for (let o of item.owners) {
    owners[o] = true;
  }

  if (!item.categories) {
    return {
      error: 'Item must belong in a category',
    };
  }

  var categories = {};
  for (let c of item.categories) {
    categories[c] = true;
  }

  if (!item.dateOwned) {
    return {
      error: 'Date must be assigned',
    };
  }

  const toUpload = {
    owners: owners,
    dateOwned: item.dateOwned,
    description: item.description,
    dateRegistered: Date.now(),
    dateUpdated: Date.now(),
    categories: categories,
  };
  var uploadToFirestore = collection.add(toUpload);
  var uploadImages = [];
  if (item.photos !== []) {
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
    var storageRef = storage.ref(`${itemID}/${Date.now()}`);

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
    deletionPromise.push(storage.ref(`${itemID}/${photosNames[i]}`).delete());
  }
  return deletionPromise;
};

// view item detail
export const viewItem = async itemId => {
  const itemDetails = await collection.doc(itemId).get();
  const picturesReferences = await storage.ref(`${itemId}/`).listAll();
  var downloadURLs = [];
  for (let i = 0; i < picturesReferences.items.length; i++) {
    downloadURLs.push(picturesReferences.items[i].getDownloadURL());
  }
  return {
    ...itemDetails.data(),
    photos: downloadURLs,
  };
};

export const getDataList = async (
  owner,
  pageStart,
  limit,
  order,
  categories
) => {
  if (!owner) {
    return {
      error: 'Owner must be defined',
    };
  }

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
  console.log(owner);
  var query = collection.where('owners', 'array-contains', owner);

  var categoriesMap = {};

  for (let i = 0; i < categories.length; i++){
    categoriesMap[categories[i]] = true;
  }

  query = query.orderBy(order.field, order.direction);

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

    // getting thumbnails
    const thumbnailList = await storage
      .ref(`${data.id}/`)
      .list({ maxResults: 1 });
    if (thumbnailList.items.length > 0) {
      item.thumbnail = await thumbnailList.items[0].getDownloadURL();
    } else {
      item.thumbnail = undefined;
    }
    return item;
  };

  var listOfItems = []; 
  for (let i = 0; i < items.length; i++) {
    if (!withinCategory(items[i])) {continue;}
    listOfItems.push(await dataTransform(items[i]));
  }

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

  return collection.doc(itemID).udpate(toUpload);
};
