import React from "react";
import { View, Platform, StatusBar as RNStatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

export default function ScreenWrapper({ children, backgroundColor = "#FFFFFF" }) {
  return (
    <SafeAreaProvider>
      {/* Fondo de la barra de estado */}
      <View
        style={{
          height: Platform.OS === "android" ? Constants.statusBarHeight : 0,
          backgroundColor: "#273940",
        }}
      />
      <RNStatusBar style="light" backgroundColor="#273940" />

      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
