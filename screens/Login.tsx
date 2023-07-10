/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    View,
    Alert,
} from 'react-native';
import { login_styles } from '../styles/pages_styles';
import auth from '@react-native-firebase/auth';

export function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function logIn() {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('New'))
            .catch(({ code, message }) => Alert.alert(code, message));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={login_styles.container}>
                <View style={login_styles.logoContainer}>
                    <Image source={require('../assets/news-min.png')} style={{width:250, height:250}}/>
                </View>

                <View style={login_styles.eventContainer}>
                    <TextInput
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={login_styles.input}
                        placeholder="E-posta adresinizi giriniz"
                        onChangeText={(value) => setEmail(value)}
                    />

                    <TextInput
                        style={login_styles.input}
                        secureTextEntry={true}
                        placeholder="Şifrenizi giriniz"
                        onChangeText={(value) => setPassword(value)}
                    />

                    <TouchableOpacity style={login_styles.button} onPress={logIn}>
                        <Text style={login_styles.btnTxt}>Giriş Yap</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={login_styles.button}
                        onPress={() => navigation.navigate('Signup')}>
                        <Text style={login_styles.btnTxt}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

