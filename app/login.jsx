import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter, Link } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import QR from "../assets/QR.png";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Redirige al layout de tabs en la pestaña QR
    router.replace("/(tabs)/qr");
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
            justifyContent: "space-between",
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cabecera */}
          <View className="h-auto top-0 justify-center items-center w-full">
            <Image source={QR} className="w-20 h-20 mb-2 mt-10" />
            <Text className="text-[#273940] text-4xl font-bold">Iniciar sesión</Text>
          </View>

          {/* Formulario */}
          <View className="flex-1 justify-center items-center w-full">
            <View className="h-auto justify-center items-start m-4 p-4 w-full">
              <Text className="text-gray-600 text-lg font-semibold m-1 p-1">Usuario</Text>
              <TextInput
                placeholder="Ingrese su usuario"
                className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
              />
              <Text className="text-gray-600 text-lg font-semibold m-1 p-1">Contraseña</Text>
              <TextInput
                placeholder="Ingrese su contraseña"
                className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
                secureTextEntry
              />

              {/* Botón Iniciar sesión */}
              <Pressable
                onPress={handleLogin}
                className="bg-[#273940] rounded-full m-1 p-4 w-full items-center"
              >
                {({ pressed }) => (
                  <Text
                    className="text-white text-lg font-bold"
                    style={{ color: pressed ? "#d1d1d1" : "white" }}
                  >
                    Iniciar sesión
                  </Text>
                )}
              </Pressable>

              {/* Registro */}
              <View className="h-auto justify-center items-center mt-4 w-full">
                <Text className="text-[#273940] text-lg font-bold p-1">
                  ¿No tienes una cuenta?
                </Text>
                <Link asChild href="/register">
                  <Pressable className="w-full items-center">
                    {({ pressed }) => (
                      <Text
                        className="text-[#273940] text-lg font-bold underline"
                        style={{ color: pressed ? "#d1d1d1" : "#273940" }}
                      >
                        Regístrate aquí
                      </Text>
                    )}
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
