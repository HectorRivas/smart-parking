import { StatusBar } from "expo-status-bar";
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
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Link } from "expo-router";
import QR from "../assets/QR.png";

export default function RegisterScreen() {
  return (
    <SafeAreaProvider>
      {/* Fondo de la barra de estado */}
      <View
        style={{
          height: Platform.OS === "android" ? Constants.statusBarHeight : 0,
          backgroundColor: "#273940",
        }}
      />
      <StatusBar style="light" backgroundColor="#273940" />

      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
              backgroundColor: "white", // 👈 asegura fondo blanco siempre
            }}
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
          >
            <View className="h-auto top-0 justify-center items-center w-full">
              <Image source={QR} className="w-20 h-20 mb-2 mt-10" />
              <Text className="text-[#273940] text-4xl font-bold">
                Crear cuenta
              </Text>
            </View>

            <View className="flex-1 justify-center items-center w-full">
              <View className="h-auto justify-center items-start m-4 p-4 w-full">
                <Text className="text-gray-600 text-lg font-semibold m-1 p-1">
                  Nombre
                </Text>
                <TextInput
                  placeholder="Ingrese su nombre"
                  className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
                />
  
                <Text className="text-gray-600 text-lg font-semibold m-1 p-1">
                  Correo electrónico
                </Text>
                <TextInput
                  inputMode="email"
                  placeholder="Ingrese su correo electrónico"
                  className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
                />

                <Text className="text-gray-600 text-lg font-semibold m-1 p-1">
                  Telefono
                </Text>
                <TextInput
                  keyboardType="phone-pad"
                  inputMode="tel"
                  placeholder="Ingrese su telefono"
                  className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
                />

                <Text className="text-gray-600 text-lg font-semibold m-1 p-1">
                  Contraseña
                </Text>
                <TextInput
                  placeholder="Crear contraseña"
                  className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
                  secureTextEntry
                />

                <Text className="text-gray-600 text-lg font-semibold m-1 p-1">
                  Confirmar Contraseña
                </Text>
                <TextInput
                  placeholder="Confirme su contraseña"
                  className="border-2 border-gray-300 rounded-full p-4 w-full mb-4"
                  secureTextEntry
                />

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

                <View className="h-auto justify-center items-center mt-4 w-full">
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
