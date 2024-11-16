import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Playprotect = ({ navigation }) => {
    const [isConfigured, setIsConfigured] = useState(false);

    const handleNextPermission = () => {
        Alert.alert(
            "Confirmación de Desactivación",
            "¿Has desactivado Google Play Protect siguiendo las instrucciones?",
            [
                { text: "No", onPress: () => setIsConfigured(false) },
                { text: "Sí", onPress: () => {
                    setIsConfigured(true);
                    navigation.navigate('EstadisticasUsoPermiso');
                }}
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Desactivar Google Play Protect</Text>
            <Text style={styles.description}>
                Para que la aplicación funcione correctamente, es necesario desactivar Google Play Protect. 
                Esto permitirá que la aplicación acceda a las funciones necesarias sin restricciones.
            </Text>
            <Text style={styles.instructions}>
                Para desactivar Play Protect, sigue estos pasos:
                {'\n\n'}1. Abre la aplicación de Google Play Store en tu dispositivo.
                {'\n'}2. Toca tu icono de perfil en la esquina superior derecha.
                {'\n'}3. Selecciona "Play Protect" en el menú.
                {'\n'}4. Presiona el icono de configuración en la esquina superior derecha.
                {'\n'}5. Desactiva "Analizar aplicaciones con Play Protect".
            </Text>

            <TouchableOpacity
                style={[styles.nextButton, !isConfigured && styles.disabledButton]}
                onPress={handleNextPermission}
            >
                <Text style={styles.nextButtonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Playprotect;

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
    nextButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#4CAF50', // Color gris para indicar que está deshabilitado
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
