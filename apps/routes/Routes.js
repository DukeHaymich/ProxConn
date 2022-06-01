import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import BottomTab from './BottomTab';

import AuthProvider from '../stores/AuthProvider';
import DatabaseProvider from '../stores/DatabaseProvider';

export default function Routes() {
    return (
        <AuthProvider>
        <DatabaseProvider>
        <NavigationContainer>
            {/* <AuthStack/> */}
            <BottomTab/>
        </NavigationContainer>
        </DatabaseProvider>
        </AuthProvider>
    )
}