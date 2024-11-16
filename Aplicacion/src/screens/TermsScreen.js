import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsScreen = () => {
    const navigation = useNavigation();

    const handleAgree = () => {
        navigation.navigate('Login'); // Navega a la pantalla de Login si el usuario acepta
    };

    const handleDisagree = () => {
        BackHandler.exitApp(); // Cierra la aplicación si el usuario no está de acuerdo
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Protect & Política de Privacidad</Text>
            <ScrollView style={styles.termsContainer}>
            <Text style={styles.terms}>
            Términos y Condiciones de Uso de Protect {"\n"}
            Fecha de Vigencia: 09/2024 {"\n"}
            {"\n"}
            Te damos la bienvenida a Protect, una aplicación de control parental diseñada para ayudarte a monitorear y supervisar las actividades en línea de tus hijos. Al instalar y utilizar Protect, aceptas y te comprometes a cumplir los presentes términos y 	condiciones. Si no aceptas estos términos, te recomendamos no instalar ni utilizar la aplicación. {"\n"}
            {"\n"}
            1. Aceptación de los Términos {"\n"}
            Al descargar, instalar o utilizar Protect, confirmas que: {"\n"}
            {"\n"}
            1.1 Eres el titular de la cuenta y responsable del uso de la aplicación. {"\n"}
            1.2 Has leído, comprendido y aceptado estos términos. {"\n"}
            1.3 Eres mayor de edad o cuentas con el consentimiento legal de un adulto para utilizar la aplicación. {"\n"}
            {"\n"}
            2. Uso Responsable de Protect {"\n"}
            2.1 Finalidad del Servicio: {"\n"}
            Protect está diseñado para proporcionar un entorno seguro para la supervisión y monitoreo de menores de edad en dispositivos digitales. La aplicación debe ser utilizada únicamente con el fin de proteger a los niños de actividades potencialmente 	peligrosas en línea. {"\n"}
            {"\n"}
            2.2 Usuario Responsable: {"\n"}
            El uso de Protect debe hacerse de forma legal y ética. El usuario se compromete a no utilizar la aplicación para fines que violen los derechos de privacidad o cualquier normativa legal vigente. Protect no debe ser utilizado para monitorear a individuos 	mayores de edad sin su consentimiento explícito. {"\n"}
            {"\n"}
            3. Privacidad y Protección de Datos {"\n"}
            3.1 Datos recopilados: {"\n"}
            Protect recopila y procesa información personal de los padres o tutores y del menor bajo supervisión. Estos datos pueden incluir, pero no se limitan a: {"\n"}
            {"\n"}
            • Información de contacto y perfil de usuario. {"\n"}
            • Datos de actividad en línea y ubicaciones del menor. {"\n"}
            {"\n"}
            3.2 Uso de los Datos: {"\n"}
            Los datos recopilados por Protect son utilizados exclusivamente para mejorar el rendimiento de la aplicación, proporcionar los servicios de monitoreo y garantizar la seguridad del menor en línea. No compartimos tus datos con terceros salvo que sea 	requerido por la ley. {"\n"}
            {"\n"}
            3.3 Consentimiento y Política de Privacidad: {"\n"}
            Al utilizar Protect, aceptas nuestra [Política de Privacidad](enlace a la política de privacidad), la cual describe en detalle cómo se recopilan, almacenan y utilizan tus datos personales. Te recomendamos leerla detenidamente. {"\n"}
            {"\n"}
            4. Responsabilidades del Usuario {"\n"}
            4.1 Cuenta de Usuario: {"\n"}
            Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Asegúrate de que solo las personas autorizadas tengan acceso a tu cuenta. {"\n"}
            {"\n"}
            4.2 Uso Acorde a la Ley: {"\n"}
            Eres responsable de asegurarte de que el uso de Protect cumple con todas las leyes aplicables en tu país de residencia, especialmente en lo que se refiere a la supervisión y protección de menores. {"\n"}
            {"\n"}
            4.3 Supervisión Activa: {"\n"}
            Protect es una herramienta de apoyo. Los padres y tutores son responsables de supervisar de manera activa el uso de dispositivos por parte de sus hijos, y tomar las medidas correctivas necesarias ante comportamientos inadecuados. {"\n"}
            {"\n"}
            5. Limitación de Responsabilidad {"\n"}
            5.1 Uso bajo Tu Propia Responsabilidad: {"\n"}
            El uso de Protect se realiza bajo tu propio riesgo. No garantizamos que la aplicación sea infalible o que proteja completamente a los menores de todos los peligros en línea. {"\n"}
            {"\n"}
            5.2 Exención de Garantías: {"\n"}
            Protect se proporciona "tal cual" y no ofrecemos garantías de ningún tipo, expresas o implícitas, incluyendo garantías de comercialización o adecuación a un propósito particular. {"\n"}
            {"\n"}
            5.3 Limitación de Daños: {"\n"}
            En ningún caso seremos responsables por daños directos, indirectos, incidentales, especiales, punitivos o consecuentes derivados del uso o imposibilidad de uso de Protect, incluso si hemos sido advertidos sobre la posibilidad de tales daños. {"\n"}
            {"\n"}
            6. Modificaciones y Terminación del Servicio {"\n"}
            6.1 Cambios en los Términos: {"\n"}
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Notificaremos a los usuarios de cualquier cambio importante mediante un aviso dentro de la aplicación o por otros medios. Es tu responsabilidad revisar periódicamente los 	términos actualizados. {"\n"}
            {"\n"}
            6.2 Suspensión o Terminación del Servicio: {"\n"}
            Podemos suspender o terminar tu acceso a Protect en cualquier momento y por cualquier motivo, incluyendo el incumplimiento de estos términos. En caso de suspensión o terminación, tus derechos de uso de la aplicación finalizarán inmediatamente. 	{"\n"}
            {"\n"}
            7. Propiedad Intelectual {"\n"}
            7.1 Derechos de Propiedad Intelectual: {"\n"}
            Todos los derechos de propiedad intelectual sobre la aplicación Protect, incluidos los derechos sobre el software, gráficos, textos y demás contenidos, pertenecen a [Nombre del titular] o a sus licenciantes. No se otorga ningún derecho o licencia de uso de 	nuestros derechos de propiedad intelectual sin nuestro consentimiento explícito. {"\n"}
            {"\n"}
            7.2 Uso Limitado de la Aplicación: {"\n"}
            No puedes modificar, copiar, distribuir, transmitir, mostrar, ejecutar, reproducir, publicar, licenciar, crear obras derivadas, transferir o vender cualquier información, software, productos o servicios obtenidos a través de Protect. {"\n"}
            {"\n"}
            8. Legislación Aplicable y Resolución de Conflictos {"\n"}
            Estos términos se regirán por las leyes de [País o Estado]. Cualquier disputa que surja en relación con estos términos será resuelta ante los tribunales competentes de [País o Estado]. {"\n"}
            {"\n"}
            9. Contacto {"\n"}
            Si tienes alguna pregunta sobre estos términos y condiciones o deseas más información sobre el uso de Protect, puedes contactarnos a través de support@protect.com.co {"\n"}
            </Text>
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
                    <Text style={styles.buttonText}>De acuerdo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.disagreeButton} onPress={handleDisagree}>
                    <Text style={styles.buttonText}>Desacuerdo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TermsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 15,
        marginTop: 40, // Ajuste para evitar la cámara
    },
    termsContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F7F9FC',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 20,
    },
    terms: {
        fontSize: 16,
        color: '#4F4F4F',
        lineHeight: 24,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    agreeButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    disagreeButton: {
        backgroundColor: '#F44336',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
});
