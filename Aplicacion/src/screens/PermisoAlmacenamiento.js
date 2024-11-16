// PermisoAlmacenamiento.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';

const PermisoAlmacenamiento = ({ navigation }) => {
    const [isStoragePermissionGranted, setIsStoragePermissionGranted] = useState(false);

    const solicitarPermisoAlmacenamiento = async () => {
        if (Platform.OS === 'android' && Platform.Version < 33) { // Solo para Android 12 y versiones anteriores
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);

                if (
                    granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    setIsStoragePermissionGranted(true);
                    Alert.alert("Permiso Concedido", "El acceso al almacenamiento ha sido concedido.");
                } else {
                    Alert.alert("Permiso Denegado", "El acceso al almacenamiento es necesario para exportar datos.");
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            // En Android 13+ no se requiere este permiso general
            setIsStoragePermissionGranted(true);
            Alert.alert("Permiso Concedido", "El acceso al almacenamiento no es necesario en esta versión de Android.");
        }
    };

    const handleNextPermission = () => {
        if (isStoragePermissionGranted) {
            navigation.navigate('PermisoBateria'); // Cambia por la siguiente pantalla en tu flujo
        } else {
            Alert.alert(
                "Permiso Requerido",
                "Por favor, concede el permiso de almacenamiento antes de continuar."
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Permitir Acceso al Almacenamiento</Text>
            <Text style={styles.description}>
                Para que la aplicación funcione correctamente y pueda exportar datos, es necesario permitir el acceso al almacenamiento en tu dispositivo.
            </Text>
            <Text style={styles.instructions}>
                Para activar este permiso, sigue estos pasos:
                {'\n\n'}1. Presiona el botón "Configurar".
                {'\n'}2. Cuando se te solicite, concede el permiso de acceso al almacenamiento.
                {'\n'}3. Una vez otorgado el permiso, presiona "Continuar" para avanzar.
            </Text>

            <TouchableOpacity
                style={styles.configureButton}
                onPress={solicitarPermisoAlmacenamiento}
            >
                <Text style={styles.configureButtonText}>Configurar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.nextButton, !isStoragePermissionGranted && styles.disabledButton]}
                onPress={handleNextPermission}
                disabled={!isStoragePermissionGranted}
            >
                <Text style={styles.nextButtonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PermisoAlmacenamiento;

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
        backgroundColor: '#B0B0B0', // Color gris para indicar que está deshabilitado
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
