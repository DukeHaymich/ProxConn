import React from 'react';
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


export default function SignUp() {
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
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFCC00',
    },
    // logoArea: {
    //     flexDirection
    // }
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
})