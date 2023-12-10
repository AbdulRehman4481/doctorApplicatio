import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import BookedAppointment from './BookedApponitment'
import Appointment from './Appointment'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons'
import Iconzz from 'react-native-vector-icons/Fontisto'

const Tabe = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppTabe = () => {
  return (
    <Tabe.Navigator>
      <Tabe.Screen name="Doctors" component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}

      />
      <Tabe.Screen name="To Appoint " component={Appointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Iconz name="book-search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabe.Screen name="Booked Appointment " component={BookedAppointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Iconzz name="bed-patient" color={color} size={size} />
          ),
        }}
      />

      {/* <Tabe.Screen name="Appointment " component={Appointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Iconz name="book-search-outline" color={color} size={size} />
          ),
        }}
      /> */}
    </Tabe.Navigator>
  );
}

export default function Frontend() {
  return (
    <>
      {/* <AppTabe /> */}
      <Stack.Navigator>
        <Stack.Screen name="Rootz" component={AppTabe}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </>
  )
}