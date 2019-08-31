import firebase from 'react-native-firebase';

const collection = firebase.firestore().collection('items');

const registerItem = item => {
  var owners = {};
  for (const owner in item.owners) {
    owners[owner] = true;
  }

  var categories = {};
  for (const category in item.categories) {
    categories[category] = true;
  }

  var toSave = {
    dateOwned: item.dateOwned,
    dateRegistered: Date.now(),
    description: item.description,
    owners: owners,
    categories: categories,
  };
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
// function editItem(itemID, updated);

// console.log(viewItem('jmRD0gUvkB7XAOiY7wr1'));
