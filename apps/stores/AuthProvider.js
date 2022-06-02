import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    function onAuthStateChanged(user) {
        setUserToken(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    
    return (
        <AuthContext.Provider
            value={{
                user: userToken,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                        return 'OK';
                    } catch (e) {
                        console.log(e);
                        switch (true) {
                            case e.message.includes('invalid-email'):
                                return 'invalid-email';
                            case e.message.includes('user-not-found'):
                            case e.message.includes('wrong-password'):
                                return 'bad-identity';
                            case e.message.includes('network-request-failed'):
                                return 'network-issue';
                            default:
                                console.log(e)
                                return 'unhandled-exception';
                        }
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
                theme: {
                    isDarkMode: isDarkMode,
                    toggleDarkMode: () => { setIsDarkMode(!isDarkMode) },
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
