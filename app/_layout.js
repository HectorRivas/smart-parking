import '../global.css';
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Iniciar sesión' }} />
      <Stack.Screen name="register" options={{ title: 'Registrarse' }} />
      <Stack.Screen name="terms" options={{ title: 'Términos y condiciones' }} />
    </Stack>
  );
}
