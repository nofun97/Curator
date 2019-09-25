import firebase from 'react-native-firebase';

const collection = firebase.firestore().collection('items');
const storage = firebase.storage();
// export var uploadTasks = [];
/**
 *{
  owners: {string: Boolean},
  description: string,
  photos: [urls], // need to check cloud storage
  dateRegistered: Date,
  dateOwned: Date,
  categories: {string: Boolean}, // maybe for organizing features
}
 */

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
            console.log(task.shapshot.downloadURL + ' is complete!');
          }
    );
  });
};

const deleteImageAsPromise = (itemID, photosNames) => {
  var deletionPromise = [];
  for (let i = 0; i < photosNames.length; i++) {
    deletionPromise.push(storage.ref(`${itemID}/${photosNames[i]}`).delete());
  }
  return Promise.all(deletionPromise);
};

export const viewItem = itemId => {
  return collection
    .doc(itemId)
    .get()
    .then(d => {
      if (d.exists) {
        return d;
      }
      console.log('Data not found');
      return {
        err: 'Data not found',
      };
    })
    .catch(err => {
      console.log(err);
      return {
        err: err,
      };
    });
};

// function viewAllItems();
// This is to view specific item, only plan
// function getItemData(item); // To view item in more detail
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
  var deletePhotos = []
  if (updated.photos !== []){
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
