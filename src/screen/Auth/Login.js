import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import React, { useState } from 'react'
// import { TextInput } from 'react-native-paper'
import useAuthContext from '../../contexts/AuthContext'
import auth from '@react-native-firebase/auth';


export default function Login({ navigation }) {
    const { dispatch } = useAuthContext()
    const [state, setState] = useState({ email: "", password: "" })
    // const [isprocessing, setIsProcessing] = useState(false)

    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }))
    }

    const handleLogin = async () => {
        const { email, password } = state;

        if (!email) {
            return alert("Enter your email correctly.");
        }

        if (password.length < 6) {
            return alert("Enter your password with at least 6 characters correctly.");
        }

        setIsProcessing(true);

        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User signed in!');
            dispatch({ type: "LOGIN", payload: { user } });
        } catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert("Invalid email or password.");
            } else {
                alert("An error occurred during login");
                console.error(error);
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (

        <ImageBackground style={styles.image} source={require("../../assets/image/bacck.jpg")} >
            <View style={styles.container}>

                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.form}>
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
                        <Button title="Login" onPress={handleLogin} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signUpText}>I don't have an account. Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
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
        borderRadius: 10
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