import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import Iconz from 'react-native-vector-icons/FontAwesome5'
import { Avatar, Card, IconButton } from 'react-native-paper'
import { Button } from 'react-native-paper';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Home({ navigation }) {
  const {isAuthantication}= useAuthContext()
  console.log(isAuthantication)
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <ScrollView>
      <View >
        <ImageBackground
          style={styles.backPhoto}
          source={require("../../assets/image/firstImage.jpg")} >

          <Text style={styles.mainHeading}>Appoint Doctors </Text>

        </ImageBackground>
      </View>

     <Text>
      <Text>isAuthantication</Text>
      {isAuthantication}
     </Text>
      <Text style={{ margin: 10, fontSize: 20, color: "skyblue" }}>
        Catagaries
      </Text>
      <ScrollView horizontal>
        <Button style={{ margin: 23 }} mode="contained" onPress={() => console.log('Pressed')}>
          Physician
        </Button>

        <Button mode="contained" style={{ margin: 23 }} onPress={() => console.log('Pressed')}>
          Psychiatrist
        </Button>
        <Button mode="contained" style={{ margin: 23 }} onPress={() => console.log('Pressed')}>
          Dermatologist
        </Button>
        <Button mode="contained" style={{ margin: 23 }} onPress={() => console.log('Pressed')}>
          Gynaecologist
        </Button>

        <Button mode="contained" style={{ margin: 23 }} onPress={() => console.log('Pressed')}>
          Cardiologist
        </Button>

        <Button mode="contained" style={{ margin: 23 }} onPress={() => console.log('Pressed')}>
          Endocrinologist
        </Button>

        {/* </View> */}
      </ScrollView>
      <ScrollView>
        <View>
          <Text style={{ margin: 10, fontSize: 29, color: "black" }}>
            All Doctors
          </Text>
          <View style={styles.cardes}>
            <View>
              <Image style={styles.image} source={require("../../assets/image/Dr1.jpg")} />
            </View>
            <View style={{ justifyContent: "center", margin: 10 }}>
              <Text style={{ fontSize: 19, color: "white" }}>
                Abdul Rehman
              </Text>
              <Text style={{ fontSize: 19, color: "white" }}>
                For <Text>Physician</Text>
              </Text>
            </View>
          </View>
          <View style={styles.cardes}>
            <View>
              <Image style={styles.image} source={require("../../assets/image/dr2.png")} />
            </View>
            <View style={{ justifyContent: "center", margin: 10 }}>
              <Text style={{ fontSize: 19, color: "white" }}>
                Hasnain  Raza
              </Text>
              <Text style={{ fontSize: 19, color: "white" }}>
                For <Text>Dermatologist</Text>
              </Text>
            </View>
          </View>
          <View style={styles.cardes}>
            <View>
              <Image style={styles.image} source={require("../../assets/image/dr5.png")} />
            </View>
            <View style={{ justifyContent: "center", margin: 10 }}>
              <Text style={{ fontSize: 19, color: "white" }}>
                Amir Arshad
              </Text>
              <Text style={{ fontSize: 19, color: "white" }}>
                For <Text>Gynaecologist</Text>
              </Text>
            </View>
          </View>
          <View style={styles.cardes}>
            <View>
              <Image style={styles.image} source={require("../../assets/image/anya.png")} />
            </View>
            <View style={{ justifyContent: "center", margin: 10 }}>
              <Text style={{ fontSize: 19, color: "white" }}>
                Mozzam Ali
              </Text>
              <Text style={{ fontSize: 19, color: "white" }}>
                For <Text>Endocrinologist</Text>
              </Text>
            </View>
          </View>
          <View style={styles.cardes}>
            <View>
              <Image style={styles.image} source={require("../../assets/image/dr2.png")} />
            </View>
            <View style={{ justifyContent: "center", margin: 10 }}>
              <Text style={{ fontSize: 19, color: "white" }}>
                Asim Ali
              </Text>
              <Text style={{ fontSize: 19, color: "white" }}>
                For <Text>Endocrinologist</Text>
              </Text>
            </View>
          </View>
          {/* <Card.Title
            title="Abdul Rehman"
            subtitle="Spacilzation in  Physician"
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
          // left={(props) =><Avatar.Image source={require("../../assets/images/wifi.png ")}/>}
          /> */}
        </View>
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