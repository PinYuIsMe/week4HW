import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, Button, View, ScrollView, RefreshControl, TextInput, Alert,
} from 'react-native';
import firebase from 'firebase';
import {
  Card, Title,
} from 'react-native-paper';
import TimeController from './Time';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const firebaseConfig = {
  apiKey: 'AIzaSyDj9erffsi_efxCREDausT1rFmo5MoPqiw',
  authDomain: 'test-31260.firebaseapp.com',
  projectId: 'test-31260',
  storageBucket: 'test-31260.appspot.com',
  messagingSenderId: '445526792599',
  appId: '1:445526792599:web:802bf600113a2bd7ef4cd2',
  measurementId: 'G-9JDJV53QXZ',
};

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  const [items, setItems] = useState([]);
  // useEffect(() => {
  //   TimeController.getAllTimes().then((res) => {
  //     setItems(res);
  //   }).catch((err) => {
  //     throw err;
  //   });
  // }, []);
  const [lastestTime, setLastestTime] = useState([]);
  useEffect(() => {
    TimeController.getLastestTime().then((res) => {
      setLastestTime(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    TimeController.getAllTimes().then((res) => {
      setItems(res);
      setRefreshing(false);
    });
  };
  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
    )}
    >
      <View style={styles.container}>
        <Text>{'\n \n'}</Text>
        <Button
          onPress={TimeController.AllTime}
          title="get all time"
          color="#007FFF"
        />
        <Text>{'\n'}</Text>
        <Button
          onPress={TimeController.addCurrentTime}
          title="add current time"
          color="#00FF00"
        />
        <Text>{'\n'}</Text>
        <Button
          onPress={TimeController.deleteEarliestTime}
          title="delete earliest time"
          color="#FF0000"
        />
      </View>
      <Text>{'\n   All Time'}</Text>
      { items.map((item) => (
        <Card
          key={item.id}
          style={{ flex: 1, padding: 10, margin: 4 }}
        >
          <Card.Content>
            <Text>{`${item.time}`}</Text>
          </Card.Content>
        </Card>
      ))}
      <Button
        onPress={() => {
          TimeController.getLastestTime().then(() => { onRefresh(); });
        }}
        title="get lastest time"
        color="#FFBF00"
      />
      <Text>{'\n   Lastest Time'}</Text>
      { lastestTime.map((item) => (
        <Card
          key={item.id}
          style={{ flex: 1, padding: 10, margin: 4 }}
        >
          <Card.Content>
            <Text>{`${item.time}`}</Text>
          </Card.Content>
        </Card>
      ))}
      <Text>{'\n'}</Text>
    </ScrollView>
  );
}

// import React, { useState, useEffect } from 'react';
// import {
//   Card, Title,
// } from 'react-native-paper';
// import {
//   StyleSheet, Text, Button, ScrollView, RefreshControl, TextInput, Alert,
// } from 'react-native';
// import firebase from 'firebase';
// import FruitController from './Fruit';

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   backgroundColor: '#fff',
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   // },
//   scrollView: {
//     backgroundColor: '#0aa',
//   },
//   // textInput: {
//   //   backgroundColor: '#fff',
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   margin: 1,
//   //   width: 200,
//   //   height: 50,
//   // },
// });

// const firebaseConfig = {
//   apiKey: 'AIzaSyDj9erffsi_efxCREDausT1rFmo5MoPqiw',
//   authDomain: 'test-31260.firebaseapp.com',
//   projectId: 'test-31260',
//   storageBucket: 'test-31260.appspot.com',
//   messagingSenderId: '445526792599',
//   appId: '1:445526792599:web:802bf600113a2bd7ef4cd2',
//   measurementId: 'G-9JDJV53QXZ',
// };

// export default function App() {
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   } else {
//     firebase.app();
//   }
//   const [items, setItems] = useState([]);
//   useEffect(() => {
//     FruitController.getAllFruits().then((res) => {
//       setItems(res);
//     }).catch((err) => {
//       throw err;
//     });
//   }, []);
//   const [refreshing, setRefreshing] = useState(false);
//   const onRefresh = () => {
//     setRefreshing(true);
//     FruitController.getAllFruits().then((res) => {
//       setItems(res);
//       setRefreshing(false);
//     });
//   };
//   const [newFruit, setNewFruit] = useState({});

//   return (
//     <ScrollView
//       style={styles.scrollView}
//       refreshControl={(
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//         />
//     )}
//     >
//       <Text>{'\n'}</Text>
//       <Text>水果名稱</Text>
//       <TextInput
//         value={newFruit.name}
//         onChangeText={(text) => setNewFruit({ ...newFruit, name: text })}
//         style={{
//           height: 40,
//           margin: 12,
//           borderWidth: 1,
//           padding: 10,
//         }}
//         placeholder="請輸入水果名稱"
//       />
//       <Text>水果價格</Text>
//       <TextInput
//         value={newFruit.price}
//         onChangeText={(text) => setNewFruit({ ...newFruit, price: text })}
//         style={{
//           height: 40,
//           margin: 12,
//           borderWidth: 1,
//           padding: 10,
//         }}
//         keyboardType="numeric"
//         placeholder="請輸入水果價格"
//       />
//       <Text>{'\n'}</Text>
//       <Button
//         onPress={() => {
//           const {
//             name, price,
//           } = newFruit;
//           if (name === undefined) {
//             Alert.alert('商品名稱不得為空');
//           } else if (price === undefined) {
//             Alert.alert('價錢不得為空');
//           } else {
//             FruitController.addFruit(name, price, false);
//             setNewFruit({});
//             onRefresh();
//           }
//         }}
//         title="新增水果"
//         color="#007FFF"
//       />

//       <Button onPress={FruitController.getFruit} title="get fruit" color="#007FFF" />
//       <Text>{'\n'}</Text>
//       <Button onPress={FruitController.getAllFruits} title="get all fruits" color="#0000FF" />
//       <Text>{'\n'}</Text>
//       <Button onPress={FruitController.addFruit} title="add fruit" color="#00FF00" />
//       <Text>{'\n'}</Text>
//       <Button onPress={FruitController.deleteFruit} title="delete fruit" color="#FF0000" />
//       <Text>{'\n'}</Text>
//       <Button onPress={FruitController.switchFruitOnSale} title="switch on sale" color="#FFBF00" />
//       <Button
//         onPress={() => {
//           FruitController.deleteNotApple().then(() => { onRefresh(); });
//         }}
//         title="delete not apple"
//         color="#007FFF"
//       />

//       <Button
//         onPress={() => {
//           FruitController.addFruit();
//           onRefresh();
//         }}
//         title="add fruit"
//         color="#007FFF"
//       />
//       { items.map((item) => (
//         <Card
//           key={item.id}
//           style={{ flex: 1, padding: 10, margin: 4 }}
//         >
//           <Card.Content>
//             <Title>{item.name}</Title>
//             <Text>{`價錢:${item.price}`}</Text>
//           </Card.Content>
//         </Card>
//       ))}
//     </ScrollView>
//   );
// }
