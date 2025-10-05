import { View, Text } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";

export default function ConfiguracionScreen() {
  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-semibold">Pantalla Configuración</Text>
      </View>
    </ScreenWrapper>
  );
}
