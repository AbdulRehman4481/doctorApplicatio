import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const patientDetail = {
  patientName: "",
  patientEmail: "",
  patientDoctor: ""
}
const Appointment = ({ route }) => {
  const [state, setState] = useState(patientDetail);
  const { doctorData } = route.params;
  const { doctorName } = doctorData;

  const handleChange = (name, val) => {
    setState(s => ({ ...s, [name]: val }))
  }
  const handleAppointment = async () => {

    const { patientName,
      patientEmail,
      patientDoctor
    } = state;

    if (!patientName || !patientEmail) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const detail = {
      patientName,
      patientEmail,
      patientDoctor: doctorName,
      status: 'active',
      dateCreated: new Date().getTime(),
      id: Math.random().toString(36).slice(2),
      // createdBy: {
      //   email: user.createdBy.email,
      //   uid: user.createdBy.uid,
      // },
    };

    await addDocument(detail);
    Alert.alert('Success', 'Booked Appointment');
  };

  const addDocument = async (detail) => {
    try {
      let { patientName, patientEmail } = state;
      let { patientDoctor } = detail
      const userData = {
        patientName, patientEmail, patientDoctor,
        dateCreated: firestore.FieldValue.serverTimestamp(),
        status: "active",
        roles: ["customer"]
      };

      await firestore()
        .collection('BoookedAppointments')
        .doc(userData.id)
        .set(userData);

      console.log('User has been added to Firestore!');
    } catch (err) {
      console.error('Something went wrong while adding user to Firestore', err);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/image/bacck.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Book an Appointment</Text>
        <TextInput
          style={styles.input}
          label="Patient Name"
          onChangeText={(value) => handleChange('patientName', value)}
          left={<TextInput.Icon name={() => <Icon name="user" size={24} color="black" />} />}
        />
        <TextInput
          style={styles.input}
          label="Patient Email"
          onChangeText={(value) => handleChange('patientEmail', value)}
          left={<TextInput.Icon name={() => <Icon name="person" size={24} />} />}
        />

        <TextInput
          style={styles.input}
          label="Doctor"
          value={doctorName}
          left={<TextInput.Icon name={() => <Icon name="person" size={24} />} />}
        />


        <Button mode="contained" onPress={handleAppointment} style={styles.button}>
          Book Appointment
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  datePicker: {
    width: '100%',
    marginBottom: 16,
  },
  dateInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  button: {
    marginTop: 24,
  },
});

export default Appointment;
