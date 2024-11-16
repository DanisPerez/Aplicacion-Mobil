// src/services/DataCollector.js

import { PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log';
import SmsAndroid from 'react-native-get-sms-android';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

// Solicitar permisos
const requestPermission = async (permission, name) => {
    try {
        const granted = await PermissionsAndroid.request(permission);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log(`Permiso para ${name} concedido`);
            return true;
        } else {
            console.warn(`Permiso para ${name} denegado`);
            return false;
        }
    } catch (error) {
        console.error(`Error solicitando permiso de ${name}:`, error);
        return false;
    }
};

// Llamadas
export const obtenerLlamadas = async () => {
    const permissionGranted = await requestPermission(PermissionsAndroid.PERMISSIONS.READ_CALL_LOG, "llamadas");
    if (!permissionGranted) return [];

    try {
        const callLogs = await CallLogs.loadAll();
        const formattedCallLogs = callLogs.map(log => {
            const date = new Date(parseInt(log.timestamp, 10));
            return {
                numero: log.phoneNumber,
                duracion: parseInt(log.duration, 10),
                fecha: date.toISOString().split('T')[0],
                hora: date.toTimeString().split(' ')[0],
                tipo: log.type === 1 ? 'entrante' : 'saliente',
            };
        });
        console.log("Llamadas obtenidas:", formattedCallLogs);
        return formattedCallLogs;
    } catch (error) {
        console.error("Error obteniendo llamadas:", error);
        return [];
    }
};

// Función de envío de llamadas con validación de datos
export const enviarLlamadasAlServidor = async () => {
    let llamadas = await obtenerLlamadas();

    // Filtrar llamadas que tengan un "numero" válido
    llamadas = llamadas.filter((llamada) => llamada.numero && llamada.numero.trim() !== "");

    if (llamadas.length === 0) {
        console.warn("No hay llamadas válidas para enviar");
        return;
    }

    try {
        const dispositivoId = await AsyncStorage.getItem('dispositivoId');
        if (!dispositivoId) {
            throw new Error("dispositivoId no está en AsyncStorage");
        }

        const token = await AsyncStorage.getItem('authToken');
        const response = await api.post(`/api/dispositivos/${dispositivoId}/llamadas/recibir/`, llamadas, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

        if (response.status === 201) {
            console.log("Llamadas enviadas exitosamente al servidor");
        } else {
            console.error("Error enviando llamadas:", response.statusText);
        }
    } catch (error) {
        console.error("Error al enviar llamadas al servidor:", error);
    }
};

// Mensajes
export const obtenerMensajes = async () => {
    const permissionGranted = await requestPermission(PermissionsAndroid.PERMISSIONS.READ_SMS, "mensajes");
    if (!permissionGranted) return [];

    return new Promise((resolve, reject) => {
        SmsAndroid.list(
            JSON.stringify({ box: 'inbox', maxCount: 50 }),
            fail => {
                console.error("Error obteniendo mensajes:", fail);
                reject([]);
            },
            (count, smsList) => {
                const formattedMessages = JSON.parse(smsList).map(sms => ({
                    numero: sms.address,
                    contenido: sms.body,
                    fecha: new Date(sms.date).toISOString().split('T')[0],
                    hora: new Date(sms.date).toTimeString().split(' ')[0],
                    tipo: sms.type === 1 ? 'entrante' : 'saliente',
                }));
                console.log("Mensajes obtenidos:", formattedMessages);
                resolve(formattedMessages);
            }
        );
    });
};

export const enviarMensajesAlServidor = async () => {
    const mensajes = await obtenerMensajes();
    if (mensajes.length === 0) return;

    try {
        const dispositivoId = await AsyncStorage.getItem('dispositivoId');
        const token = await AsyncStorage.getItem('authToken');
        await api.post(`/api/dispositivos/${dispositivoId}/mensajes/recibir/`, mensajes, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        console.log("Mensajes enviados exitosamente al servidor");
    } catch (error) {
        console.error("Error al enviar mensajes al servidor:", error);
    }
};

// Contactos
export const obtenerContactos = async () => {
    const permissionGranted = await requestPermission(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, "contactos");
    if (!permissionGranted) return [];

    try {
        const contacts = await Contacts.getAll();
        const formattedContacts = contacts
            .filter(contact => contact.givenName)
            .map(contact => ({
                nombre: contact.givenName,
                numero: contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : "Sin número",
            }));
        console.log("Contactos obtenidos:", formattedContacts);
        return formattedContacts;
    } catch (error) {
        console.error("Error obteniendo contactos:", error);
        return [];
    }
};

export const enviarContactosAlServidor = async () => {
    const contactos = await obtenerContactos();
    if (contactos.length === 0) return;

    try {
        const dispositivoId = await AsyncStorage.getItem('dispositivoId');
        const token = await AsyncStorage.getItem('authToken');
        await api.post(`/api/dispositivos/${dispositivoId}/contactos/recibir/`, contactos, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        console.log("Contactos enviados exitosamente al servidor");
    } catch (error) {
        console.error("Error al enviar contactos al servidor:", error);
    }
};

// Sincronización general
export const sincronizarDatos = async () => {
    console.log("Iniciando sincronización de todos los datos...");

    await enviarLlamadasAlServidor();
    await enviarMensajesAlServidor();
    await enviarContactosAlServidor();

    console.log("Sincronización de todos los datos completa.");
};
