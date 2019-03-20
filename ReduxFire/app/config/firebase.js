// Copyright (C) 2018 INTUZ. 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
// ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
// THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

/**
 * CONFIGURATIOIN FOR iOS APP: All params will get from GoogleService-Info.plist file
 *  */
const iosConfig = {
    apiKey: 'AIzaSyAg6D_wR9aslAq2CI9AgnL33wHRPf0oWE0',
    databaseURL: 'https://reduxfire-2b73a.firebaseio.com',
    projectId: 'reduxfire-2b73a',
    storageBucket: 'reduxfire-2b73a.appspot.com',
    messagingSenderId: '910646613562',
    clientId: '910646613562-44c92sun7pql90g5hfb113j6vuondd0f.apps.googleusercontent.com',
    appId: '1:910646613562:ios:889bb4201ed639d2',
    // enable persistence by adding the below flag
    persistence: true,
};

/**
 * CONFIGURATIOIN FOR ANDROID APP: All params will get from google-services.json file
 *  */
const androidConfig = {
    clientId: '910646613562-uk07476m4eo0i9pnbup69p7gvgkidhmc.apps.googleusercontent.com',
    appId: '1:910646613562:android:c858d3a9cdb9b917',
    apiKey: 'AIzaSyAOnDQ74Uq6izUlh0V1P9-xwcaXnTWMUAM',
    databaseURL: 'https://reduxfire-2b73a.firebaseio.com',
    storageBucket: 'reduxfire-2b73a.appspot.com',
    messagingSenderId: '910646613562',
    projectId: 'reduxfire-2b73a',

    // enable persistence by adding the below flag
    persistence: true,
};

let instance = null;

class FirebaseService {
    constructor() {
        //INITIALIZE FIREBASE AS PER OS
        if (!instance) {
            this.app = firebase.initializeApp(Platform.OS === 'ios' ? iosConfig : androidConfig);
            instance = this;
        }
        return instance;
    }
}

const firebaseService = new FirebaseService().app;
export default firebaseService;
