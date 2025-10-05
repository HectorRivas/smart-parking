import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Link } from "expo-router";
import QR from "../assets/QR.png";

// --- Componente principal ---
export default function RegisterScreen() {
  return (
    <SafeAreaProvider>
      <RegisterContent />
    </SafeAreaProvider>
  );
}

// --- Contenido separado, usando useSafeAreaInsets ---
function RegisterContent() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop:
          Platform.OS === "android" ? Constants.statusBarHeight : insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {/* Barra de estado */}
      <StatusBar style="light" backgroundColor="#273940" translucent />

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
            backgroundColor: "white",
          }}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        >
          {/* Encabezado */}
          <View className="justify-center items-center w-full mt-10">
            <Image source={QR} className="w-20 h-20 mb-2" />
            <Text className="text-[#273940] text-4xl font-bold">
              Crear cuenta
            </Text>
          </View>

          {/* Formulario */}
          <View className="flex-1 justify-center items-center w-full">
            <View className="justify-center items-start m-4 p-4 w-full">
              <Input label="Nombre" placeholder="Ingrese su nombre" />
              <Input
                label="Correo electrónico"
                placeholder="Ingrese su correo electrónico"
                inputMode="email"
              />
              <Input
                label="Teléfono"
                placeholder="Ingrese su teléfono"
                keyboardType="phone-pad"
                inputMode="tel"
              />
              <Input
                label="Contraseña"
                placeholder="Crear contraseña"
                secureTextEntry
              />
              <Input
                label="Confirmar Contraseña"
                placeholder="Confirme su contraseña"
                secureTextEntry
              />

              {/* Botón de registro */}
              <Link asChild href="/crear-cuenta">
                <Pressable className="bg-[#273940] rounded-full m-1 p-4 w-full items-center">
                  {({ pressed }) => (
                    <Text
                      className="text-white text-lg font-bold"
                      style={{ color: pressed ? "#d1d1d1" : "white" }}
                    >
                      Registrarse
                    </Text>
                  )}
                </Pressable>
              </Link>

              {/* Enlace a login */}
              <View className="justify-center items-center mt-4 w-full">
                <Text className="text-[#273940] text-lg font-bold p-1">
                  ¿Ya tienes una cuenta?
                </Text>
                <Link asChild href="/login">
                  <Pressable className="w-full items-center">
                    {({ pressed }) => (
                      <Text
                        className="text-[#273940] text-lg font-bold underline"
                        style={{ color: pressed ? "#d1d1d1" : "#273940" }}
                      >
                        Inicia sesión aquí
                      </Text>
                    )}
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// --- Componente reutilizable para inputs ---
function Input({
  label,
  placeholder,
  secureTextEntry,
  keyboardType,
  inputMode,
}) {
  return (
    <>
      <Text className="text-gray-600 text-lg font-semibold m-1 p-1">
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        inputMode={inputMode}
        className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
      />
    </>
  );
}
