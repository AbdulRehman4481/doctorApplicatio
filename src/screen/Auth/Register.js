import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const initialState = { name: "", email: "", password: "" }

export default function Register({ navigation }) {
    // const { dispatch } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [isprocessing, setIsProcessing] = useState(false)

    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }))
    }




    const handleRegister = async () => {
        try {
            const { name, email, password } = state;


            if (name === "") {
                return alert("Enter your name correctly.");
            }
            if (!email) {
                return alert("Enter your email correctly.");
            }
            if (!password) {
                return alert("Enter your password correctly.");
            }


            setIsProcessing(true);

            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await addDocument(user);
            console.log('User created & signed in!');
        } catch (error) {
            console.error('Registration Error:', error);

            if (error.code === 'auth/email-already-in-use') {
                console.log('Email already in use.');
                alert('That email address is already in use!');
            } else if (error.code === 'auth/invalid-email') {
                console.log('Invalid email address.');
                alert('That email address is invalid!');
            } else {
                console.log('Unknown error during registration.');
                alert('An error occurred during registration.');
            }
        } finally {
            // setIsProcessing(false);
        }
    };
    const addDocument = async (user) => {
        try {
            let { name } = state;
            const { email, uid } = user;

            const userData = {
                name,
                email,
                uid,
                dateCreated: firestore.FieldValue.serverTimestamp(),
                status: "active",
                roles: ["customer"]
            };

            await firestore()
                .collection('users')
                .doc(user.uid)
                .set(userData);

            console.log('User has been added to Firestore!');
            // dispatch({ type: "LOGIN", payload: { user } });
        } catch (err) {
            console.error('Something went wrong while adding user to Firestore', err);
        } finally {
            navigation.navigate("Login")

            // setIsProcessing(false);
        }
    };



    return (
        <ImageBackground style={styles.image} source={require("../../assets/image/bacck.jpg")} >
            <View style={styles.container}>
                {/* Use BlurView to apply backdrop filter */}
                <View style={styles.loginContainer}    >
                    <Text style={styles.title}>Register</Text>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={(value) => handleChange('name', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone No"
                            onChangeText={(value) => handleChange('phoneNo', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={(value) => handleChange('email', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={(value) => handleChange('password', value)}
                        />
                        <Button title="Register" onPress={handleRegister} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signUpText}>I  have an account. Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        // flex: 1,
        width: "100%",
        height: "110%"

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        width: '80%',
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        marginBottom: 10,
    },
    form: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    signUpText: {
        textAlign: 'center',
        marginTop: 10,
        color: 'blue', // Adjust the color as needed
    },
});
