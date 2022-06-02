import { ListItem,Avatar } from '@rneui/base';
import { TouchableHighlight } from "react-native";
import React, { useEffect,useContext } from 'react';
import {
    Keyboard,
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    SectionList
    
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../../stores/AuthProvider';
import { DatabaseContext } from '../../stores/DatabaseProvider';

const data=[{roomName:"Typn",ava:""},{roomName:"Mr. Dut",ava:"https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg"},{chatUser:"Mephisto",ava:""}]

function AvatarContact(props){
    
    return (
    <Avatar
      containerStyle={{ backgroundColor: "#BDBDBD" }}
      rounded
      size="medium"
      // source={(props.uri==undefined?null:{uri:props?.uri})}
      title={props.name[0]}
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
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    item: {
        paddingTop: 10,
        flexDirection: 'row',
        // backgroundColor: 'green'
    },
    itemTextLastChild: {
        flex: 4,
        paddingBottom: 10,
        // backgroundColor: 'blue'
    },
    itemText: {
        flex: 4,
        // borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        paddingBottom: 10,
        // backgroundColor: 'blue',
    },
    icon: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: '700',
    },
    text: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '600'
    },
    heading: {
        fontWeight: '900',
        fontSize: 23,
        marginVertical: 10,
        marginLeft: 20,
        // color: colors.BKDarkBlue
    }
})
