import React from 'react'
import AppNavigation from './src/navigation/AppNavigation'
import AuthContextProvider from './src/contexts/AuthContext'

export default function App() {
  // componentDidmount(){

  // }
  return (
      <AuthContextProvider>
        <AppNavigation />
      </AuthContextProvider>
  )
}