// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar las pantallas
import TermsScreen from './src/screens/TermsScreen';
import LoginScreen from './src/screens/LoginScreen';
import Permisos from './src/screens/Permisos';
import Playprotect from './src/screens/Playprotect';
import EstadisticasUsoPermiso from './src/screens/EstadisticasUsoPermiso';
import PermisosNecesarios from './src/screens/PermisosNecesarios';
import PermisoAccesibilidad from './src/screens/PermisoAccesibilidad';
import PermisoAlmacenamiento from './src/screens/PermisoAlmacenamiento';
import PermisoBateria from './src/screens/PermisoBateria';
import PermisoArranqueAutomatico from './src/screens/PermisoArranqueAutomatico';
import PermisosConcedidos from './src/screens/PermisosConcedidos'; // Importa la pantalla

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Terms">
        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Permisos"
          component={Permisos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Playprotect"
          component={Playprotect}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EstadisticasUsoPermiso"
          component={EstadisticasUsoPermiso}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermisosNecesarios"
          component={PermisosNecesarios}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermisoAccesibilidad"
          component={PermisoAccesibilidad}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermisoAlmacenamiento"
          component={PermisoAlmacenamiento}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermisoBateria" 
          component={PermisoBateria}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermisoArranqueAutomatico"
          component={PermisoArranqueAutomatico}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermisosConcedidos"
          component={PermisosConcedidos}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

