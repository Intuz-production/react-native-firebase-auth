// Copyright (C) 2018 INTUZ. 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
// ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
// THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import * as actionTypes from '../actions/actions';

const initialState = {
    loading: false,
    success: false,
    result: '',
    error: false
}
/* 
    UPDATE STATE HERE AS PER ACTION TYPE
*/
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GOOGLE_LOGIN:
            let result = JSON.stringify(action.currentUser.user.toJSON())
            alert("Google login successfully ");
            //return state;
            return { ...state, loading: false, success: true, result: 'You have logged in successfully', error: false };
        case actionTypes.FACEBOOK_LOGIN:
            alert("Facebook login successfully");
            return state;
        case actionTypes.NORMAL_LOGIN:
            //alert("Login successfully " + action.user.user.email);
            return { ...state, loading: false, success: true, result: 'You have logged in successfully' };
        case actionTypes.SIGN_UP:
            alert("Register successfully " + action.user.user.email);
            return state;
        case actionTypes.ERROR_LOGIN:
            //alert("Error: " + action.error);
            // let resultStr = JSON.stringify(action.error)
            return { ...state, loading: false, success: false, result: action.error.toString(), error: true };
        // return state;
        case actionTypes.LOADING:
            alert("Loading... ");
            return { ...state, loading: true, success: false, result: 'Please wait...', error: false };
        //return state;
        case actionTypes.VALIDATION:
            alert("Please enter valid Email and Password");
            return state;
        default:
            return state;
    }
}
export default loginReducer;

