import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home() {
  const [userData, setUserData] = useState([]);
  const fetchDocument = () => {
    firestore()
      .collection('BoookedAppointments')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        const usersData = querySnapshot.docs.map(documentSnapshot => {
          return { id: documentSnapshot.id, ...documentSnapshot.data() };
        });
        setUserData(usersData);
        console.log()
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
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 20,marginHorizontal:10 }}>
          <Text>
            #
          </Text>
          <Text>
            Doctor Name
          </Text>
          <Text>
            Patient Name
          </Text>
          <Text>
            Action
          </Text>
        </View>
        {userData.map((user, i) => (
          <View key={user.id} style={styles.cardes}>
            <Text style={{ color: "white" }}>{i + 1}</Text>
            <Text style={{ color: "white" }}>{user.patientName}</Text>
            <Text style={{ color: "white" }}>{user.patientDoctor}</Text>
            <Text style={{ color: "white" }}><Icon name="delete" size={20} /></Text>
          </View>
        ))}
      </ScrollView>


    </ScrollView>
  )
}

const styles = StyleSheet.create({


  cardes: {
    justifyContent:"space-around",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#198EB6",
    borderRadius: 10,
    marginHorizontal: 5,
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