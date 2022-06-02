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
} from 'react-native';

export default function SignIn() {
    const passwordRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warningText, setWarningText] = useState("");


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
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    returnKeyType='next'
                    onSubmitEditing={() => passwordRef.current.focus()}
                    blurOnSubmit={false}
                    style={styles.input}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    returnKeyType='go'
                    ref={passwordRef}
                    style={styles.input}
                    // onSubmitEditing={headStartLogin}
                />
                <Text style={styles.forgotPassword}>Forgot password?</Text>
                
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    // onPress={onLoginHandler}
                    // disabled={disabledButton}
                >
                <Text style={styles.warning} numberOfLines={2}>
                    {warningText}
                </Text>
                    <Text style={styles.labelButton}>
                        SIGN IN
                    </Text>
                </TouchableOpacity>
                <Text style={styles.signUpLabel}>
                    Don't have an account?
                    <Text style={styles.signUpLink}>Sign up!</Text>
                </Text>
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
    },
    title2: {
        fontSize: 48,
        color: '#032B91',
        fontFamily: 'PaytoneOne-Regular',
        alignSelf: 'center',
    },
    label: {
        marginLeft: 50,
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
        paddingVertical: 5,
        alignSelf: 'center',
        marginHorizontal: 50,
    },
})