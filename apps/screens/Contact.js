import { ListItem,Avatar } from '@rneui/base';
import { TouchableHighlight } from "react-native";
import React from 'react';
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

const data=[
  {chatUser:"Typn",ava:""},
  {chatUser:"Mr. Dut",ava:"https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg"},
  {chatUser:"Mephisto",ava:""}
];

function AvatarContact(props){
    
    return (
    <Avatar
    //   activeOpacity={0.2}
    //   avatarStyle={{}}
      containerStyle={{ backgroundColor: "#BDBDBD" }}
    //   icon={{}}
    //   iconStyle={styles.icon}
    //   imageProps={{}}
    //   onLongPress={() => alert("onLongPress")}
    //   onPress={() => alert("onPress")}
    //   overlayContainerStyle={{}}
    //   placeholderStyle={{}}
      rounded
      size="medium"
      source={(props.uri==""?null:{uri:props.uri})}
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
    return (
        <ListItem
        Component={TouchableHighlight}
        containerStyle={{}}
        disabledStyle={{ opacity: 0.5 }}
        onLongPress={() => console.log("onLongPress()")}
        onPress={() => console.log("onPress()")}
        pad={20}
      >
        <AvatarContact uri={props.ava} name={props.chatUser}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.textHeader}>
            <Text>{props.chatUser}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text>You: okay thay</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    
    );
}


export default function Contact() {
    return (
            
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.screen}>
            <SectionList
                sections={[{data:data}]}
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
