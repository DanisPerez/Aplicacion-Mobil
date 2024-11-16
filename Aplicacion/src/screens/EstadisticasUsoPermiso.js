import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const EstadisticasUsoPermiso = ({ navigation }) => {
    const [isPermissionGranted, setIsPermissionGranted] = useState(false);

    const handleNextPermission = () => {
        // Confirmar si el usuario activó el permiso de estadísticas de uso antes de continuar
        Alert.alert(
            "Confirmación de Permiso",
            "¿Has activado el permiso de acceso a estadísticas de uso?",
            [
                { 
                    text: "No", 
                    onPress: () => setIsPermissionGranted(false) 
                },
                { 
                    text: "Sí", 
                    onPress: () => {
                        setIsPermissionGranted(true);
                        navigation.navigate('PermisosNecesarios');
                    } 
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Permitir Acceso a Estadísticas de Uso</Text>
            <Text style={styles.description}>
                Para que la aplicación funcione correctamente, es necesario permitir el acceso a las estadísticas de uso de aplicaciones.
                Esto nos ayuda a monitorear la actividad de la aplicación y ofrecerte mejores servicios.
            </Text>
            <Text style={styles.instructions}>
                Paso a Paso para Activar el Permiso:
                {'\n\n'}1. Presiona el botón "Configurar" para abrir la configuración de la aplicación.
                {'\n'}2. Ve a "Aplicaciones" o "Apps y notificaciones".
                {'\n'}3. Selecciona "Acceso especial" o "Permisos especiales".
                {'\n'}4. Selecciona "Acceso a estadísticas de uso".
                {'\n'}5. Busca esta aplicación en la lista y activa el permiso de acceso de uso.
            </Text>
            
            <TouchableOpacity
                style={[styles.nextButton, !isPermissionGranted && styles.disabledButton]}
                onPress={handleNextPermission}
            >
                <Text style={styles.nextButtonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EstadisticasUsoPermiso;

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
