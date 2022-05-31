import React from 'react';
import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';


export default function SignUp() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.screen}>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    
})