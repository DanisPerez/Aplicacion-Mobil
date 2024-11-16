import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://192.168.1.10:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (response.status === 200 && data.access) {
                await AsyncStorage.setItem('authToken', data.access);
                await AsyncStorage.setItem('refreshToken', data.refresh);

                Alert.alert('Inicio de sesión exitoso', 'Bienvenido a la aplicación.', [
                    { text: 'OK', onPress: () => navigation.navigate('Permisos') }
                ]);
            } else {
                Alert.alert('Error', 'No se recibieron los datos esperados del servidor.');
            }
        } catch (error) {
            console.error("Error en la solicitud de autenticación:", error);
            Alert.alert('Error', 'No se pudo conectar al servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Bienvenido a</Text>
            <Text style={styles.title}>Protect</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#D0E6F0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#D0E6F0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={[styles.loginButton, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    welcome: {
        fontSize: 20,
        color: '#3B82F6',
        marginBottom: 10,
    },
    title: {
        fontSize: 40,
        color: '#3B82F6',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#F0F8FF',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginVertical: 10,
        fontSize: 16,
        color: '#3B82F6',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#3B82F6',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonDisabled: {
        backgroundColor: '#A7C7E7',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
