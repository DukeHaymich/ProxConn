import {ListItem, Avatar} from '@rneui/base';
import {TouchableHighlight, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useContext} from 'react';
import {
  Keyboard,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  SectionList,
  TextInput,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {useDispatch} from 'react-redux';
// import {setFlag} from '../../redux/action/updateKeyboard';

import { DatabaseContext } from '../../stores/DatabaseProvider'
import { colors } from '../../scripts/color';

const data = [
  {roomName: 'Typn', ava: ''},
  {
    roomName: 'Mr. Dut',
    ava: 'https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg',
  },
  {roomName: 'Mephisto', ava: ''},
];

function Header({navigation}) {
  // function goBack() {
  //     navigation.pop();
  // }
  // const dispatch = useDispatch();
  const dbCtx = useContext(DatabaseContext);
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
          // onFocus={() => dispatch(setFlag(true))}
          // onBlur={() => dispatch(setFlag(false))}
          // onChangeText={(value) => setUsername(value)}
          // blurOnSubmit={false}
          // ref={refInputSearch}
          onChangeText={(value)=>{
            console.log(dbCtx.searchForPeople(value));
          }}
          style={{
            fontSize: 16,
            padding: 2,
            marginLeft: 5,
            flex: 1,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddNewMessage');
        }}>
        <FontAwesome5
          name="edit"
          color="#6100FF"
          size={32}
          style={styles.iconButton}
          solid
        />
      </TouchableOpacity>
    </View>
  );
}

function AvatarContact(props) {
  return (
    <Avatar
      //   activeOpacity={0.2}
      // avatarStyle={styles.userImg}
      containerStyle={styles.userImgContainer}
      //   icon={{}}
      //   iconStyle={styles.icon}
      //   imageProps={{}}
      //   onLongPress={() => alert("onLongPress")}
      //   onPress={() => alert("onPress")}
      //   overlayContainerStyle={{}}
      //   placeholderStyle={{}}
      rounded
      size="medium"
      source={props.uri == '' ? null : {uri: props.uri}}
      title={props.name[0]}
      //   titleStyle={{}}
    />
  );
}

function ContactItem(props) {
  // console.log(Date.now())
  // var time = new Date();
  // time = time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear()
  //     + "  " + time.toLocaleTimeString();
  const dbCtx = useContext(DatabaseContext);
  const navigation = props.navigation;
  let timeLog = new Date(props.lastActive);
  return (
    <ListItem
      Component={TouchableHighlight}
      containerStyle={styles.cardContainer}
      disabledStyle={{opacity: 0.5}}
      onLongPress={() => console.log('onLongPress()')}
      onPress={() =>{
          navigation.navigate('Chat', {userName: props.roomName, ava: ''})
          dbCtx.setCurRoomUser(props);
        }
      }
      pad={20}>
      <ListItem.Content style={styles.userInfo}>
        <AvatarContact uri={props.ava} name={props.roomName} />
        <ListItem.Content style={styles.userContent}>
          <ListItem.Content style={styles.userText}>
            <Text style={styles.userName}>{props.roomName}</Text>
            <Text style={styles.postTime}>{timeLog.toLocaleTimeString().substring(0,5)}</Text>
          </ListItem.Content>
          <ListItem.Content style={styles.messageText}>
            <Text>
              {props.lastMess}
            </Text>
          </ListItem.Content>
        </ListItem.Content>
      </ListItem.Content>
    </ListItem>
  );
}

export default function Contact(props) {
  const dataCtx = useContext(DatabaseContext);
  const data1=dataCtx.chatRooms;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.screen}>
        <Header navigation={props.navigation} />
        <SectionList
          sections={[{data: data1}]}
          renderItem={({item, index}) => (
            <ContactItem
              {...item}
              index={index}
              navigation={props.navigation}
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    width: '100%',
    // backgroundColor: 'blue',
    padding: 0,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
    paddingLeft: 10,
    // marginTop: -35
    // margin: 0
  },
  userImgContainer: {
    marginLeft: 10,
    alignSelf: 'center',
    backgroundColor: 'grey',
    borderColor: colors.background,
    borderWidth: 2,
  },
  // userImg: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25
  // },
  userContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 0,
    // paddingBottom: 10,
    marginLeft: 20,
    width: 300,
    borderBottomWidth: 1.2,
    borderBottomColor: '#cccccc',
    // backgroundColor: 'green',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    // backgroundColor: 'red',
    width: '100%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
    // fontFamily: 'Lato-Regular'
  },
  messageText: {
    fontSize: 16,
    color: '#333333',
  },
  iconButton: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  headerContainer: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    backgroundColor: '#FFCC00',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    flex: 1,
    marginLeft: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
    height: 35,
  },
  headerLabel: {
    color: '#6100FF',
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
});
