import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

import ContactStack from './ContactStack';
import ProximityStack from './ProximityStack';
import AccountStack from './AccountStack';
import {colors} from '../script/color';
// import { NavigationRouteContext } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const TabList = [
  {
    route: 'ContactStack',
    label: 'Message',
    icon: 'envelope',
    component: ContactStack,
  },
  {
    route: 'ProximityStack',
    label: 'Proximity',
    icon: 'compass',
    component: ProximityStack,
  },
  {
    route: 'AccountStack',
    label: 'Profile',
    icon: 'user',
    component: AccountStack,
  },
];
const zoomIn = {
  0: {scale: 0.5, translateY: 9},
  0.92: {translateY: -25},
  1: {scale: 1.5, translateY: -15},
};
const zoomOut = {
  0: {scale: 1.2, translateY: -15},
  1: {scale: 1, translateY: 9},
};
const btnBGIn = {
  0: {scale: 0.5, translateY: 0},
  1: {scale: 2.2, translateY: 9},
};
const btnBGOut = {0: {scale: 2.2, translateY: 9}, 1: {scale: 1, translateY: 0}};

const TabButton = props => {
  const {item, onPress, isFocused, onLongPress} = props;
  const viewRef = useRef(null);
  const btnBGRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      viewRef.current.animate(zoomIn);
      btnBGRef.current.animate(btnBGIn);
      textRef.current.transitionTo({scale: 1});
    } else {
      viewRef.current.animate(zoomOut);
      btnBGRef.current.animate(btnBGOut);
      textRef.current.transitionTo({scale: 0});
    }
  }, [isFocused]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={1}>
      <Animatable.View style={styles.container} ref={viewRef} duration={300}>
        <View style={styles.btn}>
          <Animatable.View
            ref={btnBGRef}
            duration={100}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: colors.background,
              borderRadius: 12,
            }}
          />
          <FontAwesome5
            name={item.icon}
            size={36}
            color={isFocused ? colors.primary : colors.primaryLight}
            solid
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.labelTab}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

function MyTabBar({state, descriptors, navigation}) {
  const getTabBarVisibility = route => {
    // console.log(route)
    const routeName = getFocusedRouteNameFromRoute(route);
    // console.log(routeName);
    if (routeName?.includes('Chat')) {
      return false;
    }
    return true;
  };
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          display:
            !keyboardStatus && getTabBarVisibility(state.routes[state.index])
              ? 'flex'
              : 'none',
        },
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarIcon.label;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // console.log(state);
        return (
          <TabButton
            key={index}
            item={options.tabBarIcon}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
}

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="ContactStack"
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      {TabList.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarIcon: {icon: item.icon, label: item.label},
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // display: 'none'
  },
  btn: {
    height: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    // backgroundColor: 'blue'
  },
  labelTab: {
    color: colors.primary,
    textAlign: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 65,
    alignSelf: 'center',
    backgroundColor: colors.background,
    alignItems: 'center',
    // display: 'none',
  },
});
