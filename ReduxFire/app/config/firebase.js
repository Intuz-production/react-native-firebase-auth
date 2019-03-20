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
    apiKey: 'PUT GOOGLE API KEY HERE',
    databaseURL: 'PUT DATABASE URL HERE',
    projectId: 'PUT PROJECT ID HERE',
    storageBucket: 'PUT STORAGE BUCKET HERE',
    messagingSenderId: 'PUT SENDER ID HERE',
    clientId: 'PUT CLIENT ID HERE',
    appId: 'PUT APP ID HERE',
    // enable persistence by adding the below flag
    persistence: true,
};

/**
 * CONFIGURATIOIN FOR ANDROID APP: All params will get from google-services.json file
 *  */
const androidConfig = {
    clientId: 'PUT CLIENT ID HERE',
    appId: 'PUT APP ID HERE',
    apiKey: 'PUT GOOGLE API KEY HERE',
    databaseURL: 'PUT DATABASE URL HERE',
    storageBucket: 'PUT STORAGE BUCKET HERE',
    messagingSenderId: 'PUT SENDER ID HERE',
    projectId: 'PUT PROJECT ID HERE',

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
