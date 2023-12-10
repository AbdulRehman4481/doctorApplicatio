import { View, Text } from 'react-native'
import React from 'react'
import Login from './Login'
import Register from './Register'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
export default function Authca() {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}
                    options={{
                        headerShown: false
                    }}
                    />
                <Stack.Screen name="Register" component={Register}
                    options={{
                        headerShown: false
                    }}
                    
                />
            </Stack.Navigator>
           
        </>
    )
}