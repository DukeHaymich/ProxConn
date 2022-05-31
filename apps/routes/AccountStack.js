import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Account from '../screens/Account/Account';
import Settings from '../screens/Account/Settings';


const stack = createNativeStackNavigator();

export default function AccountStack() {
    return (
        <stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <stack.Screen
                name='Account'
                component={Account}
            />
            <stack.Screen
                name='Account_setting'
                component={Settings}
            />
        </stack.Navigator>
    )
}