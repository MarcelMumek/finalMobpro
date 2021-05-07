import React, {useContext, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Header} from '../../../components/molecules';
import {Card, Button} from '../../../components/atoms';
import {TextInput} from '../../../components/atoms';
import firebase from '../../../config/firebase'
import BackendDataContext from '../../../contexts/backendDataContext';
import {showMessage, hideMessage} from 'react-native-flash-message'

const Settings = ({navigation}) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [roomCapacity, setRoomCapacity] = useState('')
  const backendData = useContext(BackendDataContext)
  
  const setNewNameHandler = () => {
    firebase.database().ref(`pengguna/${backendData.getUserDetail().uid}`).set({
      ...backendData.getUserDetail(),
      name: name,
    })
    .then(() => {
      showMessage({
        message: "Name successfully changed",
        type: 'success',
        hideOnPress: true
      })

      //update the local data
      backendData.setUserDetail({
        ...backendData.getUserDetail(),
        name: name
      })
    })
    .catch(() => {
      console.log(error)
      showMessage({
          message: error,
          type: 'success',
          hideOnPress: true
      })
    })
  }

  const setNewPasswordHandler = () => {
    firebase.auth().currentUser.updatePassword(password)
      .then(() => {
        showMessage({
          message: "Password successfully changed",
          type: 'success',
          hideOnPress: true
        })
      })
      .catch(() => {
        console.log(error)
        showMessage({
            message: error,
            type: 'success',
            hideOnPress: true
        })
      })
  }

  const setNewRoomCapacityHandler = () => {
    firebase.database().ref(`pengguna/${backendData.getUserDetail().uid}`).set({
      ...backendData.getUserDetail(),
      roomCapacity: parseInt(roomCapacity)
    })
    .then(() => {
      showMessage({
        message: "Room capacity successfully changed",
        type: 'success',
        hideOnPress: true
      })

      //update the local data
      backendData.setUserDetail({
        ...backendData.getUserDetail(),
        roomCapacity: parseInt(roomCapacity)
      })
    })
    .catch(() => {
      console.log(error)
      showMessage({
          message: error,
          type: 'success',
          hideOnPress: true
      })
    })
  }


  return (
    <View>
      <Header navigation={navigation} title="Settings" />
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          <Card>
            <View>
              <View
                style={styles.orangeCardHeaderContainer}>
                <Text style={styles.boldText}>Name</Text>
              </View>
              <View style={styles.cardContentContainer}>
                <Text style={styles.boldText}>
                  Enter new name
                </Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={name}
                    setValue={setName}
                    placeholder="Enter your hospital name"
                  />
                </View>
                <View style={styles.changeButton}>
                  <Button bgColor="#6200EE" text="Change" textColor="white" onPress={setNewNameHandler}/>
                </View>
              </View>
            </View>
          </Card>
        </View>


        <View style={styles.innerContainer}>
          <Card>
            <View>
              <View
                style={styles.purpleCardHeaderContainer}>
                <Text
                  style={[styles.boldText, {color: 'white'}]}>
                  Password
                </Text>
              </View>
              <View style={styles.cardContentContainer}>
                <Text style={styles.boldText}>
                  Enter new password
                </Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={password}
                    setValue={setPassword}
                    placeholder="Enter your password"
                    isPassword
                  />
                </View>
                <View style={styles.changeButton}>
                  <Button bgColor="#F4511E" text="Change" textColor="black" onPress={setNewPasswordHandler}/>
                </View>
              </View>
            </View>
          </Card>
        </View>


        <View style={[styles.innerContainer, {marginBottom: 150}]}>
          <Card>
            <View>
              <View
                style={styles.orangeCardHeaderContainer}>
                <Text
                  style={[styles.boldText, {color: 'black'}]}>
                  Room Capacity
                </Text>
              </View>
              <View style={styles.cardContentContainer}>
                <Text style={styles.boldText}>
                  Enter new room capacity
                </Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={roomCapacity}
                    setValue={setRoomCapacity}
                    placeholder="Enter your hospital's room capacity"
                  />
                </View>
                <View style={styles.changeButton}>
                  <Button bgColor="#F4511E" text="Change" textColor="black" onPress={setNewRoomCapacityHandler}/>
                </View>
              </View>
            </View>
          </Card>
        </View>


      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  innerContainer: {
    height: 250, 
    paddingHorizontal: 25, 
    paddingTop: 30
  },
  orangeCardHeaderContainer: {
    backgroundColor: '#F4511E',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  purpleCardHeaderContainer: {
    backgroundColor: '#6200EE',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  boldText: {
    fontSize: 18, 
    fontWeight: 'bold'
  },
  cardContentContainer: {
    padding: 15
  },
  textInputContainer: {
    marginTop: 20
  },
  changeButton: {
    marginTop: 20, 
    paddingHorizontal: 80
  },
})

export default Settings;
