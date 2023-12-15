import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Account({ navigation }) {
    return (
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.loginBtn}  onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "white" }} >
                    LOGIN
                </Text>
            </TouchableOpacity>
            <Text>
                You Did not have Account
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loginBtn: {
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 15,
        borderColor: "#198EB6",
        backgroundColor: "#198EB6"

    }
})