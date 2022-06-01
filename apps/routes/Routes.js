import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import AuthStack from './AuthStack';
import BottomTab from './BottomTab';


export default function Routes() {
    // const [initializing, setInitializing] = useState(true);

    // const onAuthStateChanged = token => {
    //     user.setToken(prev=>{
    //         if (!prev && token && token.uid) {
    //             dbContext.updateLoginHistory(token.uid);
    //         }
    //         return token;
    //     });
    //     if (initializing) setInitializing(false);
    // };

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber;
    // }, []);

    // if (initializing) return null;

    return (
        <NavigationContainer>
            {/* <AuthStack/> */}
            <BottomTab/>
        </NavigationContainer>
    )
}