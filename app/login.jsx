import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Image,
  ActivityIndicator, // 💡 Agregado
} from "react-native";
import { useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenWrapper from "../components/ScreenWrapper";
import QR from "../assets/QR.png";

export default function LoginScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!correo || !contraseña) {
      Alert.alert("Error", "Por favor ingresa correo y contraseña");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://192.168.100.81:4000/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contraseña }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Correo o contraseña incorrectos");
        return; // No hace falta setLoading(false) aquí si ya está en finally
      }

      // Guardar usuario en AsyncStorage
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          nombre: data.user.nombre,
          correo: data.user.correo,
          telefono: data.user.telefono, // 💡 Guardando el teléfono
        })
      );

      // Redirigir a QR
      router.replace("/(tabs)/qr");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper backgroundColor="white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cabecera */}
          <View className="h-auto top-0 justify-center items-center w-full">
            <Image source={QR} className="w-20 h-20 mb-2 mt-10" />
            <Text className="text-[#273940] text-4xl font-bold">
              Iniciar sesión
            </Text>
          </View>

          <Text className="text-gray-600 text-lg font-semibold m-1 p-1">
            Correo electrónico
          </Text>
          <TextInput
            placeholder="Ingresa tu correo"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
          />

          <Text className="text-gray-600 text-lg font-semibold m-1 p-1">
            Contraseña
          </Text>
          <TextInput
            placeholder="Ingresa tu contraseña"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
            className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
          />

          <Pressable
            onPress={handleLogin}
            className={`bg-[#273940] rounded-full p-4 w-full items-center ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {/* 💡 Uso de ActivityIndicator */}
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-lg font-bold">
                Iniciar sesión
              </Text>
            )}
          </Pressable>

          <View className="justify-center items-center mt-4 w-full">
            <Text className="text-[#273940] text-lg font-bold p-1">
              ¿No tienes una cuenta?
            </Text>
            <Link asChild href="/register">
              <Pressable className="w-full items-center">
                <Text className="text-[#273940] text-lg font-bold underline">
                  Regístrate aquí
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}