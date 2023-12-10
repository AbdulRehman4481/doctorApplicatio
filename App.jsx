import React from 'react'
import AppNavigation from './src/navigation/AppNavigation'
import AuthContextProvider from './src/contexts/AuthContext'

export default function App() {
  return (
      <AuthContextProvider>

        <AppNavigation />
      </AuthContextProvider>
  )
}