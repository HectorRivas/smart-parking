import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, Pressable, ScrollView, Image } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ConfiguracionScreen() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");

        if (userData) {
          const user = JSON.parse(userData);

          setUserId(user.id);
          setUserName(user.nombre);
          setUserEmail(user.correo);
          setUserPhone(user.telefono);
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

  const iconMap = {
    perfil: "person-circle-outline",
    seguridad: "shield-checkmark-outline",
    pagos: "card-outline",
    editar: "create-outline",
  };

  const routeName = "perfil";
  const iconName = iconMap[routeName] || "ellipse-outline";

  return (
    <ScreenWrapper>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center w-full bg-white">
          <View className="items-center justify-center w-40 h-40 rounded-full border bg-white mb-8">
            <Image source={require("../../assets/user_icon.png")} className="w-24 h-24" />
          </View>
          <View className="w-11/12 h-auto bg-white p-4 rounded-3xl shadow-2xl flex mb-8">
            <Text className="text-gray-500 font-bold text-center">
              Información personal
            </Text>
            <Text className="text-gray-600 font-semibold mt-4">
              Nombre: <Text className="font-normal">{userName || "N/A"}</Text>
            </Text>
            <Text className="text-gray-600 font-semibold mt-2">
              Email: <Text className="font-normal">{userEmail || "N/A"}</Text>
            </Text>
            <Text className="text-gray-600 font-semibold mt-2">
              Teléfono:{" "}
              <Text className="font-normal">{userPhone || "N/A"}</Text>
            </Text>
            <Pressable
              className="mt-4 bg-[#618D9E] rounded-full p-3"
              onPress={async () => {
                await AsyncStorage.removeItem("user");
                Alert.alert("Aqui formulario para editar info");
              }}
            >
              <Text className="text-white font-bold text-center">
                Editar información
              </Text>
            </Pressable>
          </View>
          <View className="w-11/12 h-auto bg-white p-4 rounded-3xl shadow-2xl flex mb-8">
            <Text className="text-gray-500 font-bold text-center">
              Metodos de pago
            </Text>
            <Text className="text-gray-600 mt-4">
              No hay métodos de pago registrados.
            </Text>
            <Pressable
              className="mt-4 bg-[#618D9E] rounded-full p-3"
              onPress={async () => {
                Alert.alert("Aqui formulario para agregar metodo de pago");
              }}
            >
              <Text className="text-white font-bold text-center">
                Agregar método de pago
              </Text>
            </Pressable>
          </View>
          <View className="w-11/12 h-auto bg-white p-4 rounded-3xl shadow-2xl flex mb-8">
            <Text className="text-gray-500 font-bold text-center">
              Seguridad
            </Text>
            <Text className="text-gray-600 mt-4">
              Cambia tu contraseña regularmente para mantener tu cuenta segura.
            </Text>
          </View>
          <Pressable
            className="mt-4 bg-[#be0000] rounded-full p-3"
            onPress={async () => {
              await AsyncStorage.removeItem("user");
              router.replace("/login");
            }}
          >
            <Text className="text-white font-bold text-center">
              Cerrar sesión
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
