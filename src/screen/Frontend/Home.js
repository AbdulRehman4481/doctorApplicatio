import { View, Text, ScrollView, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';


const initialValue = {
  doctorName: "",
  doctorEmail: "",
  doctorSpecialization: ""
}
export default function Home({ navigation }) {
  const [state, setState] = useState(initialValue)
  const [modalVisible, setModalVisible] = useState(false);
  const [doctorData, setDoctorData] = useState([]);

  const handleChange = (name, val) => {
    setState(s => ({ ...s, [name]: val }))
  }

  const handleSubmit = async () => {
    let { doctorName, doctorEmail, doctorSpecialization } = state
    if (doctorName === "") {
      return alert("Enter your Name correctly.");
    }
    if (!doctorEmail) {
      return alert("Enter your email correctly.");
    }
    if (!doctorSpecialization) {
      return alert("Enter your Specialization correctly.");
    }

    const doctorData = {
      doctorName,
      doctorEmail,
      doctorSpecialization,
      id: Math.random().toString(36).slice(2),
      dateCreated: firestore.FieldValue.serverTimestamp(),
      status: "active",
      roles: ["admin"]
    };
    try {
      await firestore()
        .collection('doctorsDetail')
        .doc(doctorData.id)
        .set(doctorData)
      setState(initialValue);
      setModalVisible(false);
      fetchDocument()
    } catch (error) {
      console.log("error while add doctor")
    }
  }
  const fetchDocument = () => {
    firestore()
      .collection('doctorsDetail')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        const doctorData = querySnapshot.docs.map(documentSnapshot => {
          return { id: documentSnapshot.id, ...documentSnapshot.data() };
        });
        console.log("doctorData", doctorData)
        setDoctorData(doctorData);
      });
  }
  useEffect(() => {
    fetchDocument()
  }, [])
  return (
    <>
      <ScrollView>
        <View >
          <ImageBackground
            style={styles.backPhoto}
            source={require("../../assets/image/firstImage.jpg")} >

            <Text style={styles.mainHeading}>Appoint Doctors </Text>

          </ImageBackground>
        </View>

        {/* <Text>
        <Text>isAuthantication</Text>
        {isAuthantication}
      </Text> */}
        <View>
          <Text style={{ margin: 10, fontSize: 25, color: "#198EB6" }}>
            Catagaries
          </Text>

        </View>
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
            <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
              <View>
                <Text style={{ margin: 10, fontSize: 29, color: "black" }}>
                  All Doctors
                </Text>
              </View>
              <View>
                <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)
                }>
                  <Text style={{ color: "white" }}>
                    Add Doctor
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {doctorData.map((doc) => (
                <View style={styles.cardes} key={doc.id}>
                  <View style={{ flexDirection: "row",overflow:"hidden" }}>
                    <View>
                      <Image style={styles.image} source={require("../../assets/image/Dr1.jpg")} />
                    </View>
                    <View style={{ margin: 10, overflow:"hidden",width:120}}>
                      <Text style={{ fontSize: 19, color: "white" }} numberOfLines={1} ellipsizeMode="tail">
                        {doc.doctorName}
                      </Text>
                      <Text style={{ fontSize: 20, color: "white" }}>
                        For <Text style={{fontSize: 15}}>{doc.doctorSpecialization}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={{ justifyContent: "flex-end", }}>
                    <TouchableOpacity style={{ borderWidth: 1, padding: 7, borderColor: "white", borderRadius: 10 }} >
                      <Text style={{ color: "white" }}>
                        Appoint
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            {/*     <View style={styles.cardes}>
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
            </View> */}
          </View>
        </ScrollView>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false) }}

      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ color: "black", fontSize: 20, marginBottom: 10 }}>Add Doctor Detail</Text>
            <Text style={{ color: "black", marginBottom: 10 }}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder='Name'
              onChangeText={(value) => handleChange('doctorName', value)}
            />
            <Text style={{ color: "black", marginBottom: 10 }}> Specialization</Text>
            <TextInput
              style={styles.input}
              placeholder='Specialization'
              onChangeText={(value) => handleChange('doctorSpecialization', value)}
            />
            <Text style={{ color: "black", marginBottom: 10 }}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Email'
              onChangeText={(value) => handleChange('doctorEmail', value)}
            />

            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-around" }}>
              <TouchableOpacity style={styles.closeBtn} onPress={handleSubmit}>
                <Text style={{ color: "white" }}>
                  Add Doctor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeBtn} onPress={() => { setModalVisible(false) }}>
                <Text style={{ color: "white" }}>
                  Close Modal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    color: "black"
  },
  closeBtn: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 100,
    backgroundColor: "#198EB6",
    borderColor: "#198EB6"
  },
  addBtn: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 95,
    backgroundColor: "#198EB6",
    borderColor: "#198EB6"

  },
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
    backgroundColor: "#198EB6",
    justifyContent: "space-between"
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