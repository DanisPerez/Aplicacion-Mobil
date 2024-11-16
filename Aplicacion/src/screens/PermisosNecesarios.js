import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const PermisosNecesarios = ({ navigation }) => {
    const permisos = [
        { nombre: 'Cámara', permiso: PERMISSIONS.ANDROID.CAMERA, key: 'camera' },
        { nombre: 'Contactos', permiso: PERMISSIONS.ANDROID.READ_CONTACTS, key: 'contacts' },
        { nombre: 'Micrófono', permiso: PERMISSIONS.ANDROID.RECORD_AUDIO, key: 'microphone' },
        { nombre: 'Registro de Llamadas', permiso: PERMISSIONS.ANDROID.READ_CALL_LOG, key: 'callLog' },
        { nombre: 'SMS', permiso: PERMISSIONS.ANDROID.READ_SMS, key: 'sms' },
        { nombre: 'Ubicación', permiso: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, key: 'location' },
        { nombre: 'Fotos y Videos', permiso: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, key: 'mediaImages' },
        { nombre: 'Música y Audio', permiso: PERMISSIONS.ANDROID.READ_MEDIA_AUDIO, key: 'mediaAudio' },
    ];

    const [permissionsGranted, setPermissionsGranted] = useState(
        permisos.reduce((acc, p) => ({ ...acc, [p.key]: false }), {})
    );

    useEffect(() => {
        verificarPermisosIniciales();
    }, []);

    const verificarPermisosIniciales = async () => {
        const permisoEstados = await Promise.all(
            permisos.map((permiso) => checkPermiso(permiso.permiso, permiso.key))
        );
        const nuevosEstados = permisos.reduce((acc, permiso, idx) => ({ ...acc, [permiso.key]: permisoEstados[idx] }), {});
        setPermissionsGranted(nuevosEstados);
    };

    const checkPermiso = async (permiso) => {
        const status = await check(permiso);
        return status === RESULTS.GRANTED;
    };

    const solicitarPermiso = async (permiso, key) => {
        const status = await request(permiso);
        if (status === RESULTS.GRANTED) {
            setPermissionsGranted((prev) => ({ ...prev, [key]: true }));
        } else if (status === RESULTS.BLOCKED) {
            Alert.alert(
                "Permiso Bloqueado",
                `El permiso de ${key} está bloqueado. Ve a configuración para habilitarlo manualmente.`,
                [
                    { text: "Cancelar" },
                    { text: "Abrir Configuración", onPress: () => Linking.openSettings() },
                ]
            );
        } else {
            Alert.alert("Permiso Denegado", `El permiso de ${key} es necesario para el funcionamiento de la aplicación.`);
        }
    };

    const solicitarTodosPermisos = async () => {
        for (const permiso of permisos) {
            if (!permissionsGranted[permiso.key]) {
                await solicitarPermiso(permiso.permiso, permiso.key);
            }
        }
    };

    const todosPermisosConcedidos = Object.values(permissionsGranted).every(Boolean);

    const handleContinue = () => {
        if (todosPermisosConcedidos) {
            Alert.alert("Todos los Permisos Concedidos", "Gracias por conceder todos los permisos.");
            navigation.navigate('PermisoAccesibilidad');
        } else {
            Alert.alert("Permisos Incompletos", "Por favor, concede todos los permisos antes de continuar.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Permisos Necesarios</Text>
            <Text style={styles.description}>
                Para que la aplicación funcione correctamente, es necesario conceder los siguientes permisos:
            </Text>

            {permisos.map((permiso) => (
                <Text key={permiso.key} style={styles.permissionItem}>
                    {permiso.nombre}: {permissionsGranted[permiso.key] ? "Concedido" : "No concedido"}
                </Text>
            ))}

            <TouchableOpacity style={styles.configureButton} onPress={solicitarTodosPermisos}>
                <Text style={styles.configureButtonText}>Configurar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.nextButton, !todosPermisosConcedidos && styles.disabledButton]}
                onPress={handleContinue}
                disabled={!todosPermisosConcedidos}
            >
                <Text style={styles.nextButtonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PermisosNecesarios;

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
    permissionItem: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
    },
    configureButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    configureButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#B0B0B0',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
