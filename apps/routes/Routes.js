import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import AuthStack from './AuthStack';
import BottomTab from './BottomTab';

import AuthProvider from '../stores/AuthProvider';
import DatabaseProvider from '../stores/DatabaseProvider';

import { setToken, subscribe } from '../redux/action/authSession';


export default function Routes() {
    const authSession = useSelector((state) => state.authSession);
    const dispatch = useDispatch();
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = token => {
        dispatch(setToken(token));
        // user.setToken(prev=>{
        //     if (!prev && token && token.uid) {
        //         dbContext.updateLoginHistory(token.uid);
        //     }
        //     return token;
        // });
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        // <AuthProvider>
        <DatabaseProvider>
        <NavigationContainer>
            { authSession.userToken
            ? <BottomTab/>
            : <AuthStack/>
            }
        </NavigationContainer>
        </DatabaseProvider>
        // </AuthProvider> 
    )
}