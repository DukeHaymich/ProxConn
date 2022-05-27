import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ContactStack from './ContactStack';
import ProximityStack from './ProximityStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="ContactStack"
                component={ContactStack}
            />
            <Tab.Screen
                name="ProximityStack"
                component={ProximityStack}
            />
            <Tab.Screen
                name="AccountStack"
                component={AccountStack}
            />
        </Tab.Navigator>
    );
}