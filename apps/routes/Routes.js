import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import BottomTab from './BottomTab';


export default function Routes() {
    return (
        <NavigationContainer>
            {/* <AuthStack/> */}
            <BottomTab/>
        </NavigationContainer>
    )
}