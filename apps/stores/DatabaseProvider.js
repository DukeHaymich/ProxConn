import React, { createContext, useState, useEffect, useContext } from 'react';
// import publicIP from 'react-native-public-ip';
// import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthProvider';

export const DatabaseContext = createContext();

export default function DatabaseProvider({ children }) {
    const { user } = useContext(AuthContext);
    const userId = user?.uid;
    // useEffect(() => {
    // if (userId==null) return;
    // const subscriber = firestore()
    //     .collection('users')
    //     .doc(userId)
    //     .onSnapshot(documentSnapshot => {
    //     console.log('User data: ', documentSnapshot.data());
    //     });

    // // Stop listening for updates when no longer required
    // return () => subscriber();
    // }, [userId]);


    const context = {
    }
    return (
        <DatabaseContext.Provider
            value={context}
        >
            {children}
        </DatabaseContext.Provider>
    );
}
