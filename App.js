import React from 'react';
import { setCustomText } from 'react-native-global-props';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';

import Routes from './apps/routes/Routes';


export default function App() {
    setCustomText({
        style: {
            fontSize: 16,
            fontFamily: 'Roboto',
            color: 'black',
        }
    });

    return (
        <Routes/>
        // <Toast
        //     // config={toastConfig}
        // />
    );
};