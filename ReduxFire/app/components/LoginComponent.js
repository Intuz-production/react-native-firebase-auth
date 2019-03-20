// Copyright (C) 2018 INTUZ. 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
// ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
// THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { name as appName } from '../../app.json';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import loginReducer from '../reducers/loginReducer.js';

const LOGO = require('../images/logo.jpeg');
/**
 * This Component includes:
 * 1) Login with Email and Password through Firebase authentication
 * 2) Login with Google SignIn with Firebase authentication
 * 3) Login with Facebook with Firebase authentication
 * 4) Registration with Firebase authentication
 *  */
class LoginView extends Component {
    //DEFINE STATE HERE
    state = { email: '', password: '' };
    constructor(props) {
        super(props)
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }

    // componentDidMount() {
    //     //this.props.restore();
    // }

    // componentDidUpdate(prevProps) {
    //     const { success, result, error } = this.props;
    //     if (success) {
    //         Alert.alert(result);
    //     }
    // }

    render() {
        let message;
        if (this.props.success) {
            message = "Success"
        } else {
            message = "Error"
        }
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                < View style={styles.container} >
                    <Text style={styles.title}>ReduxFire</Text>
                    {/* <Image source={LOGO} /> */}
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        onChangeText={this.handleEmail} />
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={this.handlePassword} />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.normalLogin(this.state.email, this.state.password)}>
                        <Text style={styles.label}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.props.googleLogin}>
                        <Text style={styles.label}>Login with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.props.facebookLogin}>
                        <Text style={styles.label}>Login with Facebook</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{message}</Text>
                </View >
            </ScrollView>
        );
    }
}
/* 
CREATE STYLESHEET FOR VIEWS
*/
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#2BD9D9',
        //alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#2BD9D9',
        //backgroundColor: '#8aa82a',
        padding: 20
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#355899',
        padding: 10,
        margin: 10
    },
    label: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 60,
        textAlign: 'center'
    },
    inputText: {
        margin: 15,
        fontSize: 18,
        padding: 10,
        // borderBottomWidth: 1,
        color: "#000000",
        backgroundColor: '#FFFFFF'
    }
});

// const mapStateToProps = state => {
//     return {

//     };
// };

const mapStateToProps = ({ loginReducer: { loading, success, result, error } }) => ({
    loading: loading,
    success: success,
    result: result,
    error: error
});

export default connect(mapStateToProps)(LoginView);     