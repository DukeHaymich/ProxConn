import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';

import * as profileAction from '../../redux/action/userProfile'


function Header({ navigation }) {
    function goBack() {
        navigation.pop();
    }

    return (
        <View style={styles.headerContainer}>
            <FontAwesome5
                name='chevron-left'
                color='#6100FF'
                size={32}
                style={styles.iconButton}
                onPress={goBack}
            />
            <Text style={styles.headerLabel}>
                Account settings
            </Text>
        </View>
    )
}

function EditDialog({ onEdit = ()=>{}, onSave = ()=>{}, onDiscard = ()=>{}}) {
    const [isEditing, setIsEditing] = useState(false);
    return (isEditing
        ? (
        <View style={styles.editPanel}>
            <FontAwesome5
                name='check'
                size={22}
                color='#000'
                style={styles.editButton}
                onPress={() => { onSave(); setIsEditing(false) }}
            />
            <FontAwesome5
                name='times'
                size={22}
                color='#000'
                style={styles.editButton}
                onPress={() => { onDiscard(); setIsEditing(false) }}
            />
        </View>) : (
            <FontAwesome5
                name='pen'
                size={22}
                color='#000'
                style={styles.iconButton}
                onPress={() => { onEdit(); setIsEditing(true) }}
            />
        )
    )
}

function Divider() {
    return (
        <View style={styles.settingDivider}></View>
    )
}

function SettingUsername() {
    const userProfile = useSelector((state) => state.userProfile);
    const dispatch = useDispatch();

    const [username, setUsername] = useState(userProfile.name);
    const [editable, setEditable] = useState(false);
    const [active, setActive] = useState(null);
    const inputRef = useRef(null);

    function onEdit() {
        setEditable(true);
    }
    function onSave() {
        setEditable(false);
        dispatch(profileAction.setName(username));
    }
    function onDiscard() {
        setEditable(false);
        setUsername(userProfile.name);
    }

    useEffect(() => {
        if (editable) {
            inputRef.current.focus();
        }
    }, [editable]);

    return (
        <View style={[ styles.settingElement, styles.settingSingleLine ]}>
            <Text style={styles.settingLabel}>
                Username:
            </Text>
            <TextInput
                style={[styles.inputField, active, { marginLeft: 5 }]}
                value={username}
                onChangeText={setUsername}
                onFocus={() => { setActive(styles.inputActive) }}
                onBlur={() => { setActive(null) }}
                maxLength={30}
                editable={editable}
                ref={inputRef}
            />
            <EditDialog
                onEdit={onEdit}
                onSave={onSave}
                onDiscard={onDiscard}
            />
        </View>
    )
}

function SettingPassword() {
    const password = "123456";
    const [isEditing, setIsEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function onEdit() {
        setIsEditing(true);
    }
    function onSave() {
        setIsEditing(false);
    }
    function onDiscard() {
        setIsEditing(false);
    }

    return (
        <View style={[ styles.settingElement, styles.settingPassword]}>
            <View style={styles.settingSingleLine}>
                <Text style={styles.settingLabel}>
                    Change password
                </Text>
                <EditDialog
                    onEdit={onEdit}
                    onSave={onSave}
                    onDiscard={onDiscard}
                />
            </View>
            {isEditing ? (
                <>
                <View style={styles.settingSingleLine}>
                    <Text style={styles.settingLabel}>
                        Old password:
                    </Text>
                    <TextInput
                        style={[styles.inputField, styles.inputActive, { marginLeft: 5, marginRight: 20 }]}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        secureTextEntry
                    />
                </View>
                <View style={styles.settingSingleLine}>
                    <Text style={styles.settingLabel}>
                        New password:
                    </Text>
                    <TextInput
                        style={[styles.inputField, styles.inputActive, { marginLeft: 5, marginRight: 20 }]}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                    />
                </View>
                <View style={styles.settingSingleLine}>
                    <Text style={styles.settingLabel}>
                        Re-type new password:
                    </Text>
                    <TextInput
                        style={[styles.inputField, styles.inputActive, { marginLeft: 5, marginRight: 20 }]}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>
                </>
            ) : null}
        </View>
    )
}

function SettingBio() {
    const userProfile = useSelector((state) => state.userProfile);
    const dispatch = useDispatch();
    const [bio, setBio] = useState(userProfile.bio);
    const [editable, setEditable] = useState(false);
    const [active, setActive] = useState(null);
    const inputRef = useRef(null);

    function onEdit() {
        setEditable(true);
    }
    function onSave() {
        setEditable(false);
        dispatch(setBio(bio));
    }
    function onDiscard() {
        setEditable(false);
        setBio(userProfile.bio);
    }

    useEffect(() => {
        if (editable) {
            inputRef.current.focus();
        }
    }, [editable]);

    return (
        <View style={[ styles.settingElement, styles.settingBio]}>
            <View style={styles.settingSingleLine}>
                <Text style={styles.settingLabel}>
                    Personal bio:
                </Text>
                <EditDialog
                    onEdit={onEdit}
                    onSave={onSave}
                    onDiscard={onDiscard}
                />
            </View>
            <TextInput
                style={[styles.inputField, active, styles.bioInputField]}
                value={bio}
                onChangeText={setBio}
                onFocus={() => { setActive(styles.inputActive) }}
                onBlur={() => { setActive(null) }}
                maxLength={1000}
                multiline
                placeholder="Tell people something about you..."
                editable={editable}
                ref={inputRef}
            />
        </View>
    )
}

export default function Settings({ navigation }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.screen}>
                <Header navigation={navigation}/>
                <ScrollView style={styles.body}>
                    <SettingUsername/>
                    <Divider/>
                    <SettingPassword/>
                    <Divider/>
                    <SettingBio/>
                </ScrollView>
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
    },
    iconButton: {
        width: 65,
        height: 65,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    headerLabel: {
        color: '#6100FF',
        fontSize: 24,
        fontWeight: '700',
        flex: 1,
    },
    body: {
        flex: 1,
        // backgroundColor: 'gray',
    },
    settingElement: {
        paddingLeft: 20,
    },
    settingDivider: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    settingLabel: {
        fontWeight: '600',
        fontSize: 22,
        color: '#6100FF',
    },
    inputField: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        paddingVertical: 3,
        paddingRight: 0,
        fontSize: 22,
        fontWeight: '600',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#0000',
        color: '#000',
    },
    inputActive:{
        borderColor: '#000',
    },
    editPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    editButton: {
        width: 50,
        height: 65,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    settingSingleLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 65,
    },
    settingPassword: {
        width: '100%',
        justifyContent: 'space-between',
    },
    settingBio: {
        minHeight: 350,
        justifyContent: 'space-between',
    },
    bioInputField: {
        width: '95%',
        marginRight: 20,
        textAlignVertical: 'top',
        textAlign: 'justify',
        fontSize: 20,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
})