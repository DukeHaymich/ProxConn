import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Contact from '../screens/Contact';

const stack = createNativeStackNavigator();

export default function ContactStack() {
    return (
        <stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <stack.Screen
                name='Contact'
                component={Contact}
            />
        </stack.Navigator>
    )
}