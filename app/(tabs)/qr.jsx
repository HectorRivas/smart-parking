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

        if (userData) {
          const user = JSON.parse(userData);

          setUserId(user.id);
          setUserName(user.nombre.split(" ")[0]); // Obtener solo el primer nombre
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
        <View className="h-20 top-0 justify-center items-center w-full mb-8">
          <Text className="text-[#618D9E] text-2xl font-bold">
            Hola, {userName || "Usuario"}
          </Text>
        </View>
        <View className="items-center">
          <View className="w-80 h-80 bg-white p-4 rounded-3xl shadow-2xl flex items-center justify-center mb-8">
            <QRCode
              value={userId || "sin_id"}
              size={240}
              color="#273940"
              backgroundColor="transparent"
            />
          </View>
          <View className="w-80 h-auto p-4 bg-white rounded-xl shadow-2xl flex justify-center items-center mb-8">
            <Text className="text-[#618D9E] text-center font-bold w-80 ">
              Muestra este QR al ingresar o salir del estacionamiento para
              registrar tu estancia.
            </Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
