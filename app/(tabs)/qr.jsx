import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QRScreen() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");

        // --- 🔎 LOG 1: Verificar si hay datos guardados ---
        console.log("Datos de usuario RAW:", userData); 
        
        if (userData) {
          const user = JSON.parse(userData);

          // --- 🔎 LOG 2: Verificar el objeto parseado ---
          console.log("Objeto de usuario parseado:", user); 
          console.log("Valor de user.nombre (minúscula):", user.nombre);
          console.log("Id del usuario:", user.id);
          
          // ✅ ¡ATENCIÓN! Usar siempre 'nombre' en MINÚSCULA
          setUserId(user.id);
          setUserName(user.nombre); 
        } else {
          // Si no hay userData, mostrar alerta
          Alert.alert("Error de Sesión", "No se encontró sesión de usuario.");
        }
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#618D9E" />
          <Text className="mt-4 text-gray-500">Cargando...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center w-full bg-white">
        <View className="h-20 top-0 justify-center items-center w-full">
          <Text className="text-[#618D9E] text-2xl font-bold">
            Hola, {userName || "Usuario"}
          </Text>
        </View>
        <View className="items-center">
          <View className="w-80 h-80 bg-white p-4 rounded-3xl shadow-2xl flex items-center justify-center">
            <QRCode
              value={userId || "sin_id"}
              size={240}
              color="#273940"
              backgroundColor="transparent"
            />
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