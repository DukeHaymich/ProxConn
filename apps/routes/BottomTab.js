import React, { useEffect, useRef } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

import ContactStack from './ContactStack';
import ProximityStack from './ProximityStack';
import AccountStack from './AccountStack';
import { colors } from '../scripts/color';
// import { NavigationRouteContext } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const TabList = [
    { route: 'ContactStack', label: 'Message', icon: 'envelope', component: ContactStack},
    { route: 'ProximityStack', label: 'Proximity', icon: 'compass', component: ProximityStack},
    { route: 'AccountStack', label: 'Profile', icon: 'user', component: AccountStack},
];
const zoomIn = {0: {scale: .5, translateY: 9}, .92:{translateY: -25}, 1: {scale: 1.5, translateY: -15}};
const zoomOut = {0: {scale: 1.5, translateY: -15}, 1: {scale: 1, translateY: 9}};
const btnBGIn = {0: {scale: .5, translateY: 0}, 1: {scale: 2.2, translateY: 9}};
const btnBGOut = {0: {scale: 2.2, translateY: 9}, 1: {scale: 1, translateY: 0}};

const TabButton = (props) => {
    const {item, onPress, accessibilityState} = props;
    const isFocused = accessibilityState.selected;
    const viewRef = useRef(null);
    const btnBGRef = useRef(null);
    const textRef = useRef(null);
    
    useEffect(() => {
        if (isFocused){
            viewRef.current.animate(zoomIn);
            btnBGRef.current.animate(btnBGIn);
            textRef.current.transitionTo({scale:1});
        }
        else {
            viewRef.current.animate(zoomOut);
            btnBGRef.current.animate(btnBGOut);
            textRef.current.transitionTo({scale: 0});
        }
    },[isFocused])

    return (
        <TouchableOpacity
            style = {styles.container}
            onPress = {onPress}
            activeOpacity={1}
        >
            <Animatable.View
                style = {styles.container}
                ref = {viewRef}
                duration={300}
            >
                <View style={styles.btn}>
                    <Animatable.View
                        ref = {btnBGRef}
                        duration = {100}
                        style = {{...StyleSheet.absoluteFillObject, backgroundColor: colors.background,borderRadius: 12}}
                    />
                    <FontAwesome5 name = {item.icon} size = {36} color = {isFocused ? colors.primary : colors.primaryLight} solid />
                </View>
                <Animatable.Text
                    ref = {textRef}
                    style = {styles.labelTab}
                >
                    {item.label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    )
}


export default function BottomTab() {
    return (
        <Tab.Navigator
            initialRouteName="ContactStack"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    height: 65
                }
            }}
        >
            {TabList.map((item,index) => {
                    return (
                        <Tab.Screen key = {index} name = {item.route} component = {item.component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabButton {...props} item = {item}/>
                            }}

                        />
                    )
            })}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        height: 40,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // backgroundColor: 'blue'
    },
    labelTab:{
        color: colors.primary,
        textAlign: 'center',
    }
})