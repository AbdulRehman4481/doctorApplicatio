import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Screen2({navigation}) {
    return (
        <View style={{ backgroundColor: "#198EB6", flex: 1 }}>
            <View >
                <Text style={styles.mainheading}>All doctors treat, but a good doctor lets nature heal.</Text>
            </View>
            <View style={styles.container}>
                <LottieView
                    style={{ width: 300, height: 300 }}
                    source={require('../../assets/animation/Animation - 1702399379966.json')}
                    autoPlay

                />
            </View>
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity style={styles.nxtBtn} onPress={()=>{navigation.navigate("Rootz")}}>
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
        fontSize: 20,
        color: "#023047",
        margin: 50,
        fontFamily: "serif",
        fontWeight: "bold"
    },
    nxtBtn:{
        backgroundColor:"#023047",
        padding:7,
        borderRadius:50
    }
});