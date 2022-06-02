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

import { login } from '../../redux/action/authSession';


export default function SignIn({ navigation }) {
    const passwordRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [icon, setIcon] = useState('eye');
    
    const dispatch = useDispatch();
    const authSession = useSelector((state) => state.authSession);

    function togglePassword() {
        setHidePassword(!hidePassword);
        setIcon(hidePassword ? 'eye-slash' : 'eye');
    }

    function onSignIn() {
        dispatch(login(email, password));
    }

    function onSignUp() {
        navigation.navigate('SignUp');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.screen}>
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
                <View style={styles.formField}>
                    <Text style={styles.label}>Email Address</Text>
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
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={hidePassword}
                        returnKeyType='go'
                        ref={passwordRef}
                        style={[ styles.input, { paddingRight: 55, } ]}
                        // onSubmitEditing={headStartLogin}
                    />
                    <FontAwesome5
                        name={icon}
                        size={24}
                        solid
                        color='#000'
                        style={styles.togglePassword}
                        onPress={togglePassword}
                    />
                </View>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
                <Text style={styles.warningText} numberOfLines={2}>
                    {authSession.warning}
                </Text>
                <View style={styles.authControl}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.6}
                        onPress={onSignIn}
                        // disabled={disabledButton}
                    >
                        <Text style={styles.labelButton}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.signUpLabel}>
                        Don't have an account?{" "}
                        <Text
                            style={styles.signUpLink}
                            onPress={onSignUp}
                        >
                            Sign up!
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
    logo: {
        width: '35%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center',
        marginTop: '10%',
    },
    title: {
        fontSize: 48,
        color: '#1488DB',
        fontFamily: 'PaytoneOne-Regular',
        alignSelf: 'center',
        top: '-2%',
        marginBottom: '10%',
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
        // backgroundColor: 'grey',
    },
    forgotPassword: {
        color: '#0C88FA',
        fontSize: 18,
        textDecorationLine: 'underline',
        marginHorizontal: 50,
    },
    warningText: {
        minHeight: 100,
        color: '#F00',
        fontStyle: 'italic',
        fontWeight: '600',
        marginHorizontal: 50,
        fontSize: 17,
        marginTop: 30,
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
    signUpLabel: {
        fontSize: 20,
        color: '#777777',
        textAlign: 'center',
    },
    signUpLink: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0C88FA',
        textDecorationLine: 'underline',
    },
})