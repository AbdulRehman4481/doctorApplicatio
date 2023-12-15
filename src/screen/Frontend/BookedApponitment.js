import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

export default function Home() {
  const [userData, setUserData] = useState([]);
  const fetchDocument = () => {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        const usersData = querySnapshot.docs.map(documentSnapshot => {
          return { id: documentSnapshot.id, ...documentSnapshot.data() };
        });
        setUserData(usersData);
      });
  }
  useEffect(() => {
    fetchDocument()
  }, [])
  return (
    <ScrollView>
      <View >
        <ImageBackground
          style={styles.backPhoto}
          source={require("../../assets/image/firstImage.jpg")} >

          <Text style={styles.mainHeading}>Booked Appointment </Text>

        </ImageBackground>
      </View>
      <ScrollView>
        {userData.map(user => (
          <View key={user.id} style={styles.cardes}>
            {/* Render components based on user data */}
            <Text>{user.patientName}</Text>
            {/* Add other user data fields as needed */}
          </View>
        ))}
      </ScrollView>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  cardes: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#198EB6",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 10,
    backgroundColor: "#198EB6"
  },
  backPhoto: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: "100%",
    flexDirection: "row",
    textAlign: "center",

  },
  secondView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "white",
    height: 70,
    width: 70,
    marginLeft: 20,


  },
  mainHeading: {
    // marginLeft: 50,
    color: "white",
    fontSize: 30,
    fontFamily: "serif",
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  image: {
    height: 90,
    width: 80,
  }

})