import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  KeyboardEvent,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  SectionList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useKeyboard} from '@react-native-community/hooks';

import {Avatar} from '@rneui/base';

import {colors} from '../../script/color';
import Message from './Message';
// import {ScrollView} from 'react-native-gesture-handler';

// const messageList = [
//   {
//     userName: 'minh',
//     time: '4:25',
//     message: 'Hello mấy cưng'
//   },
//   {
//     userName: 'sơn',
//     time: '4:25',
//     message: 'Hello mấy cưng'
//   },
//   {
//     userName: 'minh',
//     time: '4:25',
//     message: 'yolooo'
//   },
// ];

function Header(props) {
  // function goBack() {
  //     navigation.pop();
  // }
  const {navigation, route} = props;
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <FontAwesome5
          name="chevron-left"
          color="#6100FF"
          size={32}
          style={styles.iconButton}
        />
      </TouchableOpacity>
      <Avatar
        //   activeOpacity={0.2}
        // avatarStyle={styles.userImg}
        containerStyle={styles.ava}
        //   icon={{}}
        //   iconStyle={styles.icon}
        //   imageProps={{}}
        //   onLongPress={() => alert("onLongPress")}
        //   onPress={() => alert("onPress")}
        //   overlayContainerStyle={{}}
        //   placeholderStyle={{}}
        rounded
        size="medium"
        source={route.params.ava == '' ? null : {uri: route.params.ava}}
        title={route.params.userName[0]}
        //   titleStyle={{}}
      />
      <Text style={styles.headerLabel}>{route.params.userName}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <FontAwesome5
          name="phone-alt"
          color="#6100FF"
          size={25}
          style={styles.iconButton}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <FontAwesome5
          name="video"
          color="#6100FF"
          size={25}
          style={styles.iconButton}
        />
      </TouchableOpacity>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome5
          name="smile"
          color="#6100FF"
          size={32}
          style={styles.iconButton}
          solid
        />
      </TouchableOpacity>
      <View style={styles.textBar}>
        <TextInput
          editable
          placeholder="Message..."
          multiline
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
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => {}}>
          <Octicons
            name="image"
            color="#6100FF"
            size={32}
            style={[styles.iconButton, {height: '80%'}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            color="#6100FF"
            size={40}
            style={[styles.iconButton, {height: '80%'}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MessageList() {
  const [messages, setMessages] = useState([
    {
      user: 1,
      time: '4:25',
      content: 'Hello mấy cưng222',
    },
    {
      user: 0,
      time: '4:25',
      content: 'Hello mấy cưng1111',
    },
    {
      user: 0,
      time: '4:25',
      content: 'Hello mấy cưng222',
    },
    {
      user: 0,
      time: '4:25',
      content: 'Hello mấy cưng',
    },
    {
      user: 1,
      time: '4:25',
      content: 'Hello mấy cưng',
    },
    {
      user: 0,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 0,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 1,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 1,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 0,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 0,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 0,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 0,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 0,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 0,
      time: '4:25',
      content: 'yolooo',
    },
    {
      user: 0,
      time: '4:25',
      content: 'yolooo',
    },
  ]);
  const user = useRef(0);
  // const scrollView = useRef();
  return (
    <SectionList
      sections={[{data: messages}]}
      inverted={true}
      renderItem={({item, index}) => (
        <Message
          index={index}
          time={item.time}
          isLeft={item.user !== user.current}
          message={item.content}
        />
      )}
      // renderSectionHeader={({ section: { title } }) => (
      //     <Text style={styles.heading}>{title}</Text>
      //   )}
      // onEndReachedThreshold={0.3}
      // onEndReached={()=>{
      //     setIsRefreshing(true);
      //     dbCtx.fetchDeviceLog(15,()=>setIsRefreshing(false))
      // }}
      // onRefresh={()=>{
      //     setIsRefreshing(true);
      // }}
      // refreshing={isRefreshing}
    />
  );
}

export default function Chat(props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.screen}>
        <Header {...props} />
        <MessageList />
        <Footer />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // height: 500,
    backgroundColor: 'white',
    // justifyContent: 'space-between',
  },
  headerContainer: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    backgroundColor: '#FFCC00',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLabel: {
    color: '#6100FF',
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  iconButton: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    // backgroundColor: 'red',
  },
  ava: {
    marginRight: 10,
    marginLeft: 10,
    // alignSelf: 'center',
    backgroundColor: 'grey',
    borderColor: colors.background,
    borderWidth: 1,
  },
  textBar: {
    backgroundColor: '#FBFBFB',
    flex: 1,
    height: 39,
    padding: 5,
    borderRadius: 30,
  },
  chatContainer: {},
  message: {},
});
