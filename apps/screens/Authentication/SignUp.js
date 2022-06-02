import React, { useRef, useState } from 'react';
import {
    Image,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../redux/action/authSession';


export default function SignUp({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [iconPassword, setIconPassword] = useState('eye');
    const [iconConfirmPassword, setIconConfirmPassword] = useState('eye');

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const usernameRef = useRef(null);

    const dispatch = useDispatch();
    const authSession = useSelector((state) => state.authSession);

    function onSignUp() {
        dispatch(register(email, password));
    }
    function onSignIn() {
        navigation.navigate('SignIn');
    }
    function togglePassword() {
        setHidePassword(!hidePassword);
        setIconPassword(hidePassword ? 'eye-slash' : 'eye');
    }
    function toggleConfirmPassword() {
        setHideConfirmPassword(!hideConfirmPassword);
        setIconConfirmPassword(hideConfirmPassword ? 'eye-slash' : 'eye');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.screen}>
                <View style={styles.logoArea}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>
                        Prox
                        <Text style={styles.title2}>
                            Conn
                        </Text>
                    </Text>
                </View>
                <View style={styles.formField}>
                    <Text style={styles.label}>
                        Email Address
                        <Text style={{ color: '#F00' }}>*</Text>
                    </Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        returnKeyType='next'
                        onSubmitEditing={() => passwordRef.current.focus()}
                        blurOnSubmit={false}
                        style={styles.input}
                    />
                </View>
                <View style={styles.formField}>
                    <Text style={styles.label}>
                        Password
                        <Text style={{ color: '#F00' }}>*</Text>
                    </Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={hidePassword}
                        returnKeyType='next'
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                        blurOnSubmit={false}
                        style={[ styles.input, { paddingRight: 55, } ]}
                        ref={passwordRef}
                    />
                    <FontAwesome5
                        name={iconPassword}
                        size={24}
                        solid
                        color='#000'
                        style={styles.togglePassword}
                        onPress={togglePassword}
                    />
                </View>
                <View style={styles.formField}>
                    <Text style={styles.label}>
                        Re-type password
                        <Text style={{ color: '#F00' }}>*</Text>
                    </Text>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={hideConfirmPassword}
                        returnKeyType='next'
                        onSubmitEditing={() => usernameRef.current.focus()}
                        blurOnSubmit={false}
                        style={[ styles.input, { paddingRight: 55, } ]}
                        ref={confirmPasswordRef}
                    />
                    <FontAwesome5
                        name={iconConfirmPassword}
                        size={24}
                        solid
                        color='#000'
                        style={styles.togglePassword}
                        onPress={toggleConfirmPassword}
                    />
                </View>
                <View style={styles.formField}>
                    <Text style={styles.label}>
                        What can people call you?
                        <Text style={{ color: '#F00' }}>*</Text>
                    </Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        returnKeyType='next'
                        // onSubmitEditing={() => passwordRef.current.focus()}
                        blurOnSubmit={false}
                        style={styles.input}
                        ref={usernameRef}
                    />
                </View>
                <Text style={styles.warningText} numberOfLines={2}>
                    {authSession.warning}
                </Text>
                <View style={styles.authControl}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.6}
                        onPress={onSignUp}
                        // disabled={disabledButton}
                    >
                        <Text style={styles.labelButton}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.signInLabel}>
                        Already have an account?{" "}
                        <Text
                            style={styles.signInLink}
                            onPress={onSignIn}
                        >
                            Sign in!
                        </Text>
                    </Text>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFCC00',
    },
    logoArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '10%',

    },
    logo: {
        width: '30%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center',
        // marginTop: '10%',
    },
    title: {
        fontSize: 48,
        color: '#1488DB',
        fontFamily: 'PaytoneOne-Regular',
        alignSelf: 'center',
        // top: '-2%',
    },
    title2: {
        fontSize: 48,
        color: '#032B91',
        fontFamily: 'PaytoneOne-Regular',
        alignSelf: 'center',
    },
    formField: {
        marginHorizontal: 50,
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        color: '#001AFF',
    },
    input: {
        backgroundColor: '#FFF',
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        color: '#000',
        height: 35,
        width: '100%',
        paddingVertical: 5,
        paddingLeft: 5,
        alignSelf: 'center',
    },
    togglePassword: {
        width: 55,
        height: 35,
        marginTop: -35,
        alignSelf: 'flex-end',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    warningText: {
        minHeight: 100,
        color: '#F00',
        fontStyle: 'italic',
        fontWeight: '600',
        marginHorizontal: 50,
        fontSize: 17,
    },
    authControl: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },
    button: {
        backgroundColor: '#6100FF',
        height: 50,
        marginHorizontal: 50,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 25,
    },
    labelButton: {
        color: '#FFF',
        fontFamily: 'Nunito-Black',
        fontSize: 24,
        textAlign: 'center',
    },
    signInLabel: {
        fontSize: 20,
        color: '#777777',
        textAlign: 'center',
    },
    signInLink: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0C88FA',
        textDecorationLine: 'underline',
    },
})