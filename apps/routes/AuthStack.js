import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/Authentication/SignIn';
import SignUp from '../screens/Authentication/SignUp';

const stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <stack.Screen
                name='SignIn'
                component={SignIn}
            />
            <stack.Screen
                name='SignUp'
                component={SignUp}
            />
        </stack.Navigator>
    )
}