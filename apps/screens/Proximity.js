import React, { useContext, useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ListItem, Avatar } from '@rneui/base';

import { DatabaseContext } from '../stores/DatabaseProvider';


function Header({navigation}) {
    const dbCtx = useContext(DatabaseContext);
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerLabel}>
                Nearby groups
            </Text>
            <View style={styles.headerButtonContainer}>
                <FontAwesome5
                    name="info-circle"
                    color="#6100FF"
                    size={35}
                    style={styles.iconButton}
                    solid
                    onPress={() => {
                        navigation.navigate('AddNewMessage');
                    }}
                />
                <FontAwesome5
                    name="plus-square"
                    color="#6100FF"
                    size={35}
                    style={styles.iconButton}
                    onPress={() => {
                        navigation.navigate('AddNewMessage');
                    }}
                    />
            </View>
        </View>
    );
}

function AvatarContact(props) {
    return (
        <Avatar
            containerStyle={styles.userImgContainer}
            rounded
            size="medium"
            source={props.uri == '' ? null : {uri: props.uri}}
            title={props.name[0]}
        />
    );
}

function ContactItem(props) {
    const dbCtx = useContext(DatabaseContext);
    const navigation = props.navigation;
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
                </ListItem.Content>
            </ListItem.Content>
        </ListItem.Content>
        </ListItem>
    );
}

export default function Proximity(props) {
    const dataCtx = useContext(DatabaseContext);
    const data1 = dataCtx.chatRooms;

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
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFF',
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
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        flex: 1,
        flexGrow: 1,
    },
    headerButtonContainer: {
        // flex: 1,
        flexDirection: 'row',
        marginRight: 10,
    },
    iconButton: {
        width: undefined,
        height: '100%',
        aspectRatio: 0.8,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    userImgContainer: {
        marginLeft: 10,
        alignSelf: 'center',
        backgroundColor: 'grey',
        borderColor: '#FFF',
        borderWidth: 2,
    },
    cardContainer: {
        width: '100%',
        padding: 0,
        paddingVertical: 15,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    userContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 0,
        marginLeft: 20,
        width: 300,
        borderBottomWidth: 1.2,
        borderBottomColor: '#cccccc',
    },
    userText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        width: '100%',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})