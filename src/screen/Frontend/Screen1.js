import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Screen1({navigation}) {
    return (
        <View style={{ backgroundColor: "#198EB6", flex: 1 }}>
            <View >
                <Text style={styles.mainheading}>Welcome To Medicios</Text>
            </View>
            <View style={styles.container}>
                <LottieView
                    style={{ width: 300, height: 300 }}
                    source={require('../../assets/animation/Animation - 1702395443730.json')}
                    autoPlay

                />
            </View>
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity style={styles.nxtBtn} onPress={()=>{navigation.navigate("Screen2")}}>
                    <Text >
                        <Icon name="navigate-next" size={50} color="white"/>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainheading: {
        textAlign: "center",
        fontSize: 30,
        color: "#023047",
        margin: 80,
        fontFamily: "serif",
        fontWeight: "bold"
    },
    nxtBtn:{
        backgroundColor:"#023047",
        padding:7,
        borderRadius:50
    }
});