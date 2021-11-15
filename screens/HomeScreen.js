import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { useState } from 'react'
import {  Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import { v4 as uuidv4 } from 'react-native-uuid';

const initialList = [
  {
    id: 'a',
    name: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    name: 'Dave',
    lastname: 'Davidds',
    year: 1993,
  },
  {
    id: 'c',
    name: 'Nekin',
    lastname: 'Mars',
    year: 1997,
  },
  {
    id: 'd',
    name: 'Alex',
    lastname: 'Willingston',
    year: 1991,
  },
  // {
  //   id: 'e',
  //   name: 'Chyeiro',
  //   lastname: 'Robert',
  //   year: 1985,
  // },
  // {
  //   id: 'f',
  //   name: 'Jim',
  //   lastname: 'Ken',
  //   year: 1989,
  // },
];

const HomeScreen = () => {
  const [list, setList] = React.useState(initialList);
  const [name, setName] = React.useState('');

  const navigation = useNavigation()

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);
 
    setList(newList);
  }
  function handleChange(event) {
    setName(event.target.value);
  }
  function handleAdd() {
    // add item
    const newList = list.concat({ name });
 
    setList(newList);
    setName('');
  }
 
  
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  

  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
      {/* <Text>Email: {auth.currentUser?.email}</Text> */}
      <SafeAreaView style={styles.container}>
      <TextInput type="text" value={name} onChange={handleChange}  style={styles.input} />
      <Button
              title="Add"
              onPress ={handleAdd}
             />
        {list.map((item, index) => { 
          return<View style={styles.card} key = {index.id}>
             <Text key={item.id}> {item.name} </Text>
            <Text key={item.id}> {item.lastname} </Text>
            <Text key={item.id}> {item.year} </Text>
             <Button
              title="remove"
              onPress ={() => handleRemove(item.id)}
             />
          </View>
        })}   
        
    </SafeAreaView> 
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#d8bfd8',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
    width: 300, height: 80,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  
})
