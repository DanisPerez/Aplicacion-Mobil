// src/services/SyncService.js

import { enviarLlamadasAlServidor, enviarMensajesAlServidor, enviarContactosAlServidor } from './DataCollector';

export const sincronizarDatos = async () => {
    console.log("Iniciando sincronización de datos...");

    // Sincronizar llamadas
    console.log("Sincronizando llamadas...");
    await enviarLlamadasAlServidor();

    // Sincronizar mensajes
    console.log("Sincronizando mensajes...");
    await enviarMensajesAlServidor();

    // Sincronizar contactos
    console.log("Sincronizando contactos...");
    await enviarContactosAlServidor();

    console.log("Sincronización completa de todos los datos.");
};
