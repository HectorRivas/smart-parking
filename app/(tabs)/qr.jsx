import { View, Text } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
// Importa el componente QRCode de la librería
import QRCode from 'react-native-qrcode-svg';

export default function QRScreen() {
  // 1. Define el ID ÚNICO que irá en el QR. 
  // ¡Importante! El ID lo obtendrías del estado de autenticación o de la BD.
  const userId = "a1b2c3d4-e5f6-7890-abcd-6a5s4d654aasd"; // Ejemplo de ID único
  // 2. Define el nombre del usuario para el saludo
  const userName = "Usuario"; // Este nombre lo obtendrías del estado de autenticación o de la BD.

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center w-full bg-white">
        <View className="h-20 top-0 justify-center items-center w-full">
          <Text className="text-[#618D9E] text-2xl font-bold">Hola, {userName}</Text>
        </View>
        <View className="items-center">
          <View className="w-80 h-80 bg-white p-4 rounded-3xl shadow-2xl flex items-center justify-center">
            {/* Componente QRCode */}
            <QRCode
              // 'value' es la información esencial que contendrá el QR (el ID único)
              value={userId}
              // Define el tamaño del código QR
              size={240} // Un tamaño de 240px se ajusta bien al contenedor de 80x80 (320px x 320px)
              // Color de los "cuadritos" del QR
              color="#273940"
              // Color de fondo
              backgroundColor="transparent"
            />
            {/* Fin del componente QRCode */}

          </View>
          <Text className="text-gray-600 mt-4 text-center w-80">
            Muestra este QR al ingresar o salir del estacionamiento para
            registrar tu estancia.
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}