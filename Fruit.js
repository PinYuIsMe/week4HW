import firebase from 'firebase';
import {
  Alert,
} from 'react-native';
// Functions
async function getFruit() {
  const db = firebase.firestore();
  const fruitRef = db.collection('fruit').doc('7AQdFINW0MhSkFc8RDDr');
  const doc = await fruitRef.get();
  console.log(doc.data());
}

async function getAllFruits() {
  const db = firebase.firestore();
  const fruitsRef = db.collection('fruit');

  const fruitsArray = [];
  const querySnapshot = await fruitsRef.get();
  querySnapshot.forEach((doc) => {
    fruitsArray.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return fruitsArray;
}

function submitFruit(value) {
  const db = firebase.firestore();
  const fruitsRef = db.collection('fruit');
  const fruit = {
    name: this.setState(value),
    price: 18,
    onSale: false,
  };
  fruitsRef.add(fruit);
}

// function addFruit() {
//   const db = firebase.firestore();
//   const fruitsRef = db.collection('fruit');
//   const fruit = {
//     name: 'banana',
//     price: 18,
//     onSale: false,
//   };
//   fruitsRef.add(fruit);
// }
function addFruit(name, price, onSale) {
  const db = firebase.firestore();
  const fruitsRef = db.collection('fruit');
  const fruit = {
    name: name.trim(),
    price: price.trim(),
    onSale,
  };

  if (!fruit.name) throw new Error('名稱不得為空！');
  if (!fruit.price) throw new Error('價格不得為空！');
  fruit.price = Number(fruit.price);
  if (Number.isNaN(fruit.price)) throw new Error('價格必須為數字！');

  fruitsRef.add(fruit);
  Alert.alert('新增成功!');
}

function deleteFruit() {
  const db = firebase.firestore();
  const fruitsRef = db.collection('fruit');
  fruitsRef.doc('7AQdFINW0MhSkFc8RDDr').delete();
}

async function switchFruitOnSale() {
  const db = firebase.firestore();
  const fruitRef = db.collection('fruit').doc('mbXSNx5nzV8sSx0RO3Pd');
  const doc = await fruitRef.get();
  fruitRef.set({
    onSale: !doc.data().onSale,
  }, { merge: true });
}

async function deleteNotApple() {
  const db = firebase.firestore();
  const fruitsRef = db.collection('fruit');
  const querySnapshot = await fruitsRef.where('name', '!=', 'apple').get();
  querySnapshot.forEach((doc) => {
    db.collection('fruit').doc(doc.id).delete();
  });
}

export default {
  getFruit,
  getAllFruits,
  addFruit,
  deleteFruit,
  switchFruitOnSale,
  deleteNotApple,
  submitFruit,
};
