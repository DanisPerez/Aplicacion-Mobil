import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: 'http://192.168.1.10:8000', // Cambia la IP a la misma que usas en Postman
  timeout: 20000,
});

// Interceptor de solicitud para agregar el token de autenticación si está disponible
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al obtener el token de autenticación:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para el manejo de errores detallados
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Captura todo el contenido de la respuesta del error
      const status = error.response.status;
      const errorData = JSON.stringify(error.response.data);

      // Muestra una alerta con el código de estado y el contenido completo del error
      Alert.alert('Error', `Código de estado ${status}: ${errorData}`);
      console.error('Detalles del error completo:', error.response.data); // Imprime el error en consola para más información
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
      Alert.alert('Error', 'No se pudo conectar al servidor. Revise su conexión.');
    } else {
      console.error('Error en la configuración de la solicitud:', error.message);
      Alert.alert('Error', `Error en la configuración de la solicitud: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;
