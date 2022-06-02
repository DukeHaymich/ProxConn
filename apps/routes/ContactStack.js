import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Contact from '../screens/Contact/Contact';
import Chat from '../screens/Contact/Chat';
import AddNewMessage from '../screens/Contact/AddNewMessage';

const stack = createNativeStackNavigator();
function Header({navigation}) {
  // function goBack() {
  //     navigation.pop();
  // }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchBar}>
        <FontAwesome5 name="search" color="#666666" size={22} />
        <TextInput
          editable
          placeholder="Search someone..."
          // placeholderTextColor={}
          // value={username}
          // // returnKeyType='next'
          // // autoFocus={true}
          // // onSubmitEditing={() => {}}
          // onFocus={() => {navigation.setOptions({tabBarStyle: {display: 'none'}});}}
          // onBlur={onUsernameBlur}
          // onChangeText={(value) => setUsername(value)}
          // blurOnSubmit={false}
          // ref={refInputSearch}
          style={{
            fontSize: 16,
            padding: 2,
            marginLeft: 5,
            flex: 1,
          }}
        />
      </View>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome5
          name="edit"
          color="#6100FF"
          size={32}
          style={styles.iconButton}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function ContactStack({navigation, route}) {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="Contact" component={Contact} />
      <stack.Screen name="AddNewMessage" component={AddNewMessage} />
      <stack.Screen
        name="Chat"
        component={Chat}
        options={({route}) => ({
          title: route.params.userName,
        })}
      />
    </stack.Navigator>
  );
}
