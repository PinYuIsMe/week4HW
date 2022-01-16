import firebase from 'firebase';

function toDateString(time) {
  const date = new Date(time.seconds * 1000);
  const dateString = `${date.getFullYear().toString()}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')}  ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}:${
    date.getSeconds().toString().padStart(2, '0')}`;

  return dateString;
}

function TimeEmpty() {
  const times = [];
  times.push({
    id: 'none',
    time: 'Time queue is empty',
  });
  return times;
}

async function getLastestTime() {
  const db = firebase.firestore();
  const LastestRef = db.collection('time').orderBy('time', 'asc').limitToLast(1);
  const times = [];
  const snapshot = await LastestRef.get();
  if (snapshot.empty) {
    return TimeEmpty();
  }
  snapshot.forEach((doc) => {
    times.push({
      id: doc.id,
      time: toDateString(doc.data().time),
    });
  });
  console.log(times);
  return times;
}

async function getAllTimes() {
  const db = firebase.firestore();
  const timesRef = db.collection('time').orderBy('time', 'desc');
  const timesArray = [];
  const querySnapshot = await timesRef.get();
  querySnapshot.forEach((doc) => {
    timesArray.push({
      id: doc.id,
      time: toDateString(doc.data().time),
    });
  });
  console.log(timesArray);
  return timesArray;
}

function addCurrentTime() {
  const db = firebase.firestore();
  const timesRef = db.collection('time');
  const time = {
    time: new Date(),
  };
  timesRef.add(time);
  return [];
}

async function deleteEarliestTime() {
  const db = firebase.firestore();
  const EarliestRef = db.collection('time').orderBy('time', 'desc').limitToLast(1);
  const snapshot = await EarliestRef.get();
  if (snapshot.empty) {
    return TimeEmpty();
  }
  snapshot.forEach((doc) => {
    db.collection('time').doc(doc.id).delete();
  });
  return [];
}
export default {
  toDateString,
  getLastestTime,
  getAllTimes,
  addCurrentTime,
  deleteEarliestTime,
};
