// PermisoBateria.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform } from 'react-native';

const PermisoBateria = ({ navigation }) => {
    const openBatteryOptimizationSettings = () => {
        if (Platform.OS === 'android') {
            // Abre la configuración de optimización de batería
            Linking.openSettings().catch(() => {
                Alert.alert(
                    "Error",
                    "No se pudo abrir la configuración de optimización de batería. Por favor, ve manualmente a Configuración > Batería > Optimización de la batería y excluye esta aplicación."
                );
            });
        }
    };

    const handleNextPermission = () => {
        Alert.alert(
            "Confirmación de Permiso",
            "¿Has desactivado la optimización de batería para esta aplicación?",
            [
                { text: "No", onPress: () => {} },
                { text: "Sí", onPress: () => navigation.navigate('PermisoArranqueAutomatico') } // Reemplaza 'SiguientePantalla' por la próxima pantalla
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ignorar Optimización de Batería</Text>
            <Text style={styles.description}>
                Para que la aplicación funcione correctamente en segundo plano, es necesario desactivar la optimización de batería para esta aplicación.
            </Text>
            <Text style={styles.instructions}>
                Para desactivar la optimización de batería, sigue estos pasos:
                {'\n\n'}1. Presiona el botón "Configurar" para ir a la configuración de optimización de batería.
                {'\n'}2. En la configuración, selecciona "No optimizar" para esta aplicación.
                {'\n'}3. Vuelve a esta pantalla y presiona "Continuar" para confirmar.
            </Text>

            <TouchableOpacity
                style={styles.configureButton}
                onPress={openBatteryOptimizationSettings}
            >
                <Text style={styles.configureButtonText}>Configurar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextPermission}
            >
                <Text style={styles.nextButtonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PermisoBateria;

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
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
