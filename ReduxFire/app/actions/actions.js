// Copyright (C) 2019 INTUZ. 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
// ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
// THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { connect } from 'react-redux';
import firebaseService from '../config/firebase';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import LoginView from '../components/LoginComponent';

/*
    DECLARED ACTION TYPES
*/
export const GOOGLE_LOGIN = 'google'
export const FACEBOOK_LOGIN = 'facebook'
export const NORMAL_LOGIN = 'normal'
export const ERROR_LOGIN = 'error'
export const LOADING = 'loading'
export const SIGN_UP = 'signup'
export const VALIDATION = 'validation'

/*
    GOOGLE LOGIN
*/
function doGoogleLogin() {
    return async (dispatch) => {
        try {
            await GoogleSignin.configure({
                iosClientId: 'PLACE GOOGLE CLIENT ID HERE'
            });
            const data = await GoogleSignin.signIn();
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            // login with credential
            const currentUser = await firebase.auth().signInWithCredential(credential);
            dispatch({ type: GOOGLE_LOGIN, currentUser });
        } catch (error) {
            console.log('error: ' + error);
            dispatch({ type: ERROR_LOGIN, error });
        }
    }
}

/*
    FACEBOOK LOGIN   
*/
function doFacebookLogin() {
    return async (dispatch) => {
        try {
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                console.log('Request cancelled');
            }
            console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                console.log('Something went wrong obtaining the users access token');
            }
            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            // login with credential
            const currentUser = await firebase.auth().signInWithCredential(credential);
            dispatch({ type: FACEBOOK_LOGIN, currentUser });
        } catch (error) {
            console.log('error: ' + error);
            dispatch({ type: ERROR_LOGIN, error });
        }
    }
}
/*
    NORMAL LOGIN   
*/
function doCustomLogin(email, password) {
    return function (dispatch) {
        if (email == '' || password == '') {
            dispatch({ type: VALIDATION });
        } else {
            //dispatch({ type: LOADING });
            firebaseService
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user.user.email);
                    dispatch({ type: NORMAL_LOGIN, user });
                })
                .catch(error => {
                    registerUser(email, password, dispatch)
                });
        }
    };
}
/*
    REGISTRATION
*/
function registerUser(email, password, dispatch) {
    firebaseService
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user.user.email);
            dispatch({ type: SIGN_UP, user });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: ERROR_LOGIN, error })
        });
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    normalLogin: (email, password) => dispatch(doCustomLogin(email, password)),
    googleLogin: () => dispatch(doGoogleLogin()),
    facebookLogin: () => dispatch(doFacebookLogin())
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginView);