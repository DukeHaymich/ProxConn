import React from 'react';
import {
    Image,
    ImageBackground,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

import * as userProfile from '../../redux/action/userProfile';
import { logout } from '../../redux/action/authSession';


function Option({ onPress, title, icon, iconColor, iconBackgroundColor }){
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress ?? (() => {})}
            style={styles.optionContainer}
        >
            <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
                <FontAwesome5
                    name={icon}
                    color={iconColor ?? '#FFF'}
                    size={32}
                    solid
                />
            </View>
            <Text style={styles.optionLabel}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

function Divider() {
    return (
        <View style={styles.optionDivider}></View>
    )
}

export default function Account({ navigation }) {
    const wallpaperSource = require('../../assets/images/wallpaper.png');
    const avatarSource = require('../../assets/images/avatar.png');

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userProfile);
    const id = userInfo.id;
    const name = userInfo.name;

    function copyID() {
        Clipboard.setString(id);
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'ID is copied to clipboard!',
            position: 'top',
        })
    }

    function goToSetting() {
        navigation.navigate('Account_setting')
    }

    function signOut() {
        dispatch(logout());
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.screen}>
                {/* Profile view */}
                <View style={{ flex: 4 }}>
                    {/* Wallpaper & Avatar */}
                    <ImageBackground
                        style={styles.wallpaper}
                        resizeMode={'cover'}
                        source={wallpaperSource}
                    >
                        <LinearGradient colors={['#0000', '#7777']} >
                            <View style={{ width: '100%', height: '100%' }}>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                    <Image
                        style={styles.avatar}
                        source={avatarSource}
                    />
                    {/* ID & Name */}
                    <Text style={styles.idLabel} onPress ={copyID}>
                        ID:{id}
                    </Text>
                    <Text style={styles.nameLabel}>
                        {name}
                    </Text>
                </View>
                {/* Setting's view */}
                <View style={[ {flex: 5}, styles.optionSection ]}>
                    <Option
                        title='Account settings'
                        icon='id-badge'
                        iconBackgroundColor='#FF9900'
                        iconColor='#FFF'
                        onPress={goToSetting}
                    />
                    <Divider/>
                    <Option
                        title='Notifications'
                        icon='bell'
                        iconBackgroundColor='#6100FF'
                        iconColor='#FFCC00'
                    />
                    <Divider/>
                    <Option
                        title='Preferences'
                        icon='wrench'
                        iconBackgroundColor='#000'
                        iconColor='#FFF'
                    />
                    <Divider/>
                    <Option
                        title='Sign out'
                        icon='sign-out-alt'
                        iconBackgroundColor='#FF2222'
                        iconColor='#FFF'
                        onPress={signOut}
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    wallpaper: {
        width: '100%',
        height: 200,
    },
    avatar: {
        width: 120,
        height: undefined,
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'white',
        position: 'absolute',
        alignSelf: 'center',
        top: 150,
    },
    idLabel: {
        color: '#055D9C',
        textDecorationLine: 'underline',
        left: 30,
        top: 40,
    },
    nameLabel: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        alignSelf: 'center',
        top: 50,
    },
    optionSection: {
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        marginHorizontal: 30,
        marginTop: 40,
        marginBottom: 50,
        justifyContent: 'space-evenly',
    },
    optionDivider: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    // styles for option element
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionLabel: {
        fontWeight: '500',
        fontSize: 22,
        marginLeft: 25,
    },
})