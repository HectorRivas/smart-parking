import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Image, Platform } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Constants from "expo-constants";
import { Link } from "expo-router";
import QR from "../assets/QR.png";

export default function App() {
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

      <View className="flex-1 bg-white justify-between items-center">
          <View className="h-20 top-0 justify-center items-center bg-[#273940] w-full">
            <Text className="text-white text-2xl font-bold">Bienvenido a </Text>
          </View>

          <View className="flex-1 justify-center items-center w-full">
            <View className="h-auto justify-center items-center w-full">
              <Image source={QR} className="w-40 h-40 mb-2 mt-10" />
              <Text className="text-[#273940] text-4xl font-bold m-1 p-1">
                Smart Parking
              </Text>
              <Text className="text-gray-400 text-lg font-semibold m-1 p-1">
                La forma mas inteligente de estacionar.
              </Text>
            </View>

            <View className="h-auto justify-center items-center m-4 p-4 w-full">
              <Link asChild href="/login">
                <Pressable className="bg-[#273940] rounded-full m-2 p-4 w-full items-center">
                  {({ pressed }) => (
                    <Text
                      className="text-white text-lg font-bold"
                      style={{ color: pressed ? "#d1d1d1" : "white" }}
                    >
                      Iniciar sesión
                    </Text>
                  )}
                </Pressable>
              </Link>

              <Link asChild href="/register">
                <Pressable className="bg-white border-2 border-[#273940] rounded-full p-3 w-full items-center mt-4">
                  {({ pressed }) => (
                    <Text
                      className="text-[#273940] text-lg font-bold"
                      style={{ color: pressed ? "#d1d1d1" : "#273940" }}
                    >
                      Registrarse
                    </Text>
                  )}
                </Pressable>
              </Link>

              <Link asChild href="/terms">
                <Pressable className="m-4 p-2 w-full items-center">
                  {({ pressed }) => (
                    <Text
                      className="text-[#273940] text-lg font-bold underline p-1"
                      style={{ color: pressed ? "#d1d1d1" : "#273940" }}
                    >
                      Términos y condiciones
                    </Text>
                  )}
                </Pressable>
              </Link>
            </View>
          </View>
      </View>
    </SafeAreaProvider>
  );
}
