import React, { createContext, useContext, useEffect, useReducer } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

 const initialState = { isAuthantication: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return Object.assign({}, { isAuthantication: true, user: payload.user })
        case "LOGOUT":
            return initialState
        default:
            return state
    }
}
  function AuthContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
                readUserProfile(user);
            } else {
                console.log("User isn't signed in");
            }
        });

        return () => unsubscribe();
    }, []);

    const readUserProfile = async (user) => {
        try {
            const docRef = firestore().collection('users').doc(user.uid);
            const docSnap = await docRef.get();

            if (docSnap.exists) {
                const userData = docSnap.data();
                dispatch({ type: "LOGIN", payload: { user: userData } });
            } else {
                console.error('User data not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch, readUserProfile }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthContextProvider