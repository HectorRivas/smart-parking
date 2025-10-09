import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import QR from "../assets/QR.png";
import ScreenWrapper from "../components/ScreenWrapper";

export default function RegisterScreen() {
  return (
    <SafeAreaProvider>
      <RegisterContent />
    </SafeAreaProvider>
  );
}

function RegisterContent() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // --- Estado de los campos del formulario ---
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmar, setConfirmar] = useState("");

  // --- Función para manejar el registro ---
  const handleRegister = async () => {
    if (!nombre || !correo || !contraseña) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios.");
      return;
    }

    if (contraseña !== confirmar) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.100.81:4000/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            correo,
            telefono,
            contraseña,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Usuario registrado correctamente.");
        router.push("/login");
      } else {
        Alert.alert("Error", data.message || "No se pudo registrar el usuario.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
      console.error(error);
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
              <Input
                label="Nombre"
                placeholder="Ingrese su nombre"
                value={nombre}
                onChangeText={setNombre}
              />
              <Input
                label="Correo electrónico"
                placeholder="Ingrese su correo electrónico"
                inputMode="email"
                value={correo}
                onChangeText={setCorreo}
              />
              <Input
                label="Teléfono"
                placeholder="Ingrese su teléfono"
                keyboardType="phone-pad"
                inputMode="tel"
                value={telefono}
                onChangeText={setTelefono}
              />
              <Input
                label="Contraseña"
                placeholder="Crear contraseña"
                secureTextEntry
                value={contraseña}
                onChangeText={setContraseña}
              />
              <Input
                label="Confirmar Contraseña"
                placeholder="Confirme su contraseña"
                secureTextEntry
                value={confirmar}
                onChangeText={setConfirmar}
              />

              {/* Botón de registro */}
              <Pressable
                className="bg-[#273940] rounded-full m-1 p-4 w-full items-center"
                onPress={handleRegister}
              >
                {({ pressed }) => (
                  <Text
                    className="text-white text-lg font-bold"
                    style={{ color: pressed ? "#d1d1d1" : "white" }}
                  >
                    Registrarse
                  </Text>
                )}
              </Pressable>

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
    </ScreenWrapper>
  );
}

// --- Componente Input reutilizable ---
function Input({
  label,
  placeholder,
  secureTextEntry,
  keyboardType,
  inputMode,
  value,
  onChangeText,
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
        value={value}
        onChangeText={onChangeText}
        className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
      />
    </>
  );
}
