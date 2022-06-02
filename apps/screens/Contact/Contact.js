import {ListItem, Avatar} from '@rneui/base';
import {TouchableHighlight, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
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
import {Colors} from 'react-native/Libraries/NewAppScreen';

import { AuthContext } from '../../stores/AuthProvider';
import { DatabaseContext } from '../../stores/DatabaseProvider';

import {colors} from '../../script/color';

const data = [
  {chatUser: 'Typn', ava: ''},
  {
    chatUser: 'Mr. Dut',
    ava: 'https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg',
  },
  {chatUser: 'Mephisto', ava: ''},
];

function Header({navigation}) {
  // function goBack() {
  //     navigation.pop();
  // }
  // const dispatch = useDispatch();
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
    return (
        <ListItem
        Component={TouchableHighlight}
        containerStyle={{}}
        disabledStyle={{ opacity: 0.5 }}
        onLongPress={() => console.log("onLongPress()")}
        onPress={() => console.log("onPress()")}
        pad={20}
      >
        <AvatarContact uri={props.ava} name={props.roomName}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.textHeader}>
            <Text>{props.roomName}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text>{(props?.lastMess!=undefined)? props?.lastMess: "Tap here to say hi"}</Text>
            <Text>{(props?.lastActive!=undefined)? props?.lastActive: "N/A"}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Content>
    </ListItem>
  );
}


export default function Contact() {

  // For testing --------------------------
    const ctx=useContext(AuthContext);
    const ctx2=useContext(DatabaseContext);
    const chatRooms = ctx2.chatRooms;
    useEffect(()=>
    {
      if (ctx.user==null){
        ctx.login('admin@gmail.com','sadasd').then(()=>{
         console.log(ctx.user);
        });
      }
    }
      ,[])

    // useEffect(()=>
    //   {
    //     if (chatRooms.length>0){
    //       console.log('contact.js:',chatRooms);
    //       ctx2.setCurRoomUser(chatRooms[0]);
    //     }
    //   }
    //     ,[chatRooms])
    // useEffect(()=>
    //   {
    //     console.log(ctx2.curRoom)
    //     if (ctx2.curRoom){
    //       ctx2.pushMessage({content:'abc testing',time:Date.now()});
    //     }
    //   }
    //     ,[])
    // For testing --------------------------

    
    return (
            
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.screen}>
            <SectionList
                sections={[{data:chatRooms}]}
                renderItem={({ item, index }) => <ContactItem {...item} index={index} />}
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
