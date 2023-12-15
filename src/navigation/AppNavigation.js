import React, { useContext } from 'react'
import AuthContextProvider, { AuthContext, useAuthContext } from '../contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Authca from '../screen/Auth';
import Frontend from '../screen/Frontend';

export default function AppNavigation() {
  const { isAuthantication } = useAuthContext()
  console.log(isAuthantication)
  return (

    <NavigationContainer>
      <Frontend />
      {/* <Authca />   */}
{/*       
      {isAuthantication 
       ? 
       <Frontend />
       : 
         <Authca />  
        

        }  */}
    </NavigationContainer>
  )
}