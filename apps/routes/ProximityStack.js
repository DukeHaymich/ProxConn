import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Proximity from '../screens/Proximity';


const stack = createNativeStackNavigator();

export default function ProximityStack() {
    return (
        <stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <stack.Screen
                name='Proximity'
                component={Proximity}
            />
        </stack.Navigator>
    )
}