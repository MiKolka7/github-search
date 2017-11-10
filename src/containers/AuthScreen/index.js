import { object } from 'prop-types';
import React, { Component } from 'react';

import {
    Animated,
    AsyncStorage,
    Image,
    Keyboard,
    Platform,
    Text,
    TextInput,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/user.actions';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';
import { messages } from '../../constants/general';
import { screens } from '../../screens';
import Styles from './style';

const octocat = require('../../assets/img/octocat.png');

class AuthScreen extends Component {
    static propTypes = {
        navigator: object
    };

    constructor(props) {
        super(props);

        this.keyboardHeight = new Animated.Value(0);
        this.isAndroid = Platform.OS === 'android';
        this.handlerSubmit = this._handlerSubmit.bind(this);
    }

    state = {
        pass:              '',
        userLogin:         '',
        isFetching:        false,
        errorFetchingText: ''
    };

    componentWillMount() {
        if (!this.isAndroid) {
            this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
            this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
        }
    }

    componentDidMount() {
        this.setState(() => ({ isFetching: true }));

        AsyncStorage.getItem('auth').then((data) => {
            const auth = JSON.parse(data);

            if (auth && auth.token) {
                this.props.actions.checkAuth(auth);
                this._openNextScreen();
            }

            this.setState(() => ({ isFetching: false }));
        });
    }

    componentWillUnmount() {
        if (!this.isAndroid) {
            this.keyboardWillShowSub.remove();
            this.keyboardWillHideSub.remove();
        }
    }

    _openNextScreen() {
        this.props.navigator.resetTo(screens.searchScreen);
    }

    _keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue:  event.endCoordinates.height
            })
        ]).start();
    };

    _keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue:  0
            })
        ]).start();
    };

    _handlerSubmit() {
        const { userLogin, pass } = this.state;

        if (userLogin && pass) {
            this.setState(() => ({ isFetching: true }));

            this.props.actions.auth(userLogin, pass)
                .then((status) => {
                    this.setState(() => ({
                        isFetching:        false,
                        errorFetchingText: !status ? messages.error.badLogin : ''
                    }));

                    if (!status) {
                        setTimeout(() => {
                            this.setState(() => ({ errorFetchingText: '' }));
                        }, 3000);
                    }
                    else {
                        this._openNextScreen();
                    }
                })
                .catch(() => {
                    this.setState(() => ({ errorFetchingText: messages.error.undef }));
                });

        }
    }

    _handlerInput(event, name) {
        const { text } = event.nativeEvent;

        this.setState(() => ({ [name]: text }));
    }

    render() {
        const { userLogin, pass, isFetching, errorFetchingText } = this.state;

        const loader = (
            <View style = { Styles.loader }>
                <ProgressBar />
            </View>
        );

        return (
            <View style = { Styles.view }>
                { isFetching && loader }
                <Animated.View style = { [Styles.content, { paddingBottom: this.keyboardHeight }] }>
                    <Image source = { octocat } style = { Styles.img } />

                    <TextInput
                        autoFocus
                        placeholder = { 'Login' }
                        returnKeyType = { 'default' }
                        style = { Styles.textInput }
                        underlineColorAndroid = 'transparent'
                        value = { userLogin }
                        onChange = { (e) => this._handlerInput(e, 'userLogin') }
                    />
                    <TextInput
                        secureTextEntry
                        placeholder = { 'Password' }
                        returnKeyType = { 'default' }
                        style = { Styles.textInput }
                        underlineColorAndroid = 'transparent'
                        value = { pass }
                        onChange = { (e) => this._handlerInput(e, 'pass') }
                    />
                    <Button onPress = { this.handlerSubmit }>
                        <View style = { Styles.btn }>
                            <Text>Auth</Text>
                        </View>
                    </Button>

                    <View style = { Styles.alertBox }>
                        <Text style = { Styles.alertText }>{ errorFetchingText }</Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(AuthScreen);

