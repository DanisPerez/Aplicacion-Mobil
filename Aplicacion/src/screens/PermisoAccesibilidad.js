// PermisoAccesibilidad.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const PermisoAccesibilidad = ({ navigation }) => {
    const [isAccessibilityEnabled, setIsAccessibilityEnabled] = useState(false);

    const handleNextPermission = () => {
        // Confirma si el usuario ha activado el permiso de accesibilidad antes de continuar
        Alert.alert(
            "Confirmación de Permiso",
            "¿Has activado el permiso de accesibilidad para supervisión?",
            [
                { text: "No", onPress: () => setIsAccessibilityEnabled(false) },
                { text: "Sí", onPress: () => navigation.navigate('PermisoAlmacenamiento') }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activar Accesibilidad para Supervisión</Text>
            <Text style={styles.description}>
                Para que la aplicación funcione correctamente, es necesario activar el acceso de accesibilidad.
                Esto permitirá que la aplicación supervise y ofrezca asistencia en la actividad de tu dispositivo.
            </Text>
            <Text style={styles.instructions}>
                Para activar el permiso de accesibilidad, sigue estos pasos:
                {'\n\n'}1. Abre la aplicación de "Configuración" en tu dispositivo.
                {'\n'}2. Ve a "Accesibilidad".
                {'\n'}3. Toca "Servicios instalados" o "Aplicaciones de accesibilidad".
                {'\n'}4. Busca y selecciona "Aplicacion" en la lista.
                {'\n'}5. Activa el acceso de accesibilidad para "Aplicacion".
                {'\n'}6. Confirma cualquier mensaje de advertencia que aparezca.
            </Text>

            <TouchableOpacity
                style={[styles.nextButton, !isAccessibilityEnabled && styles.disabledButton]}
                onPress={handleNextPermission}
            >
                <Text style={styles.nextButtonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PermisoAccesibilidad;

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
