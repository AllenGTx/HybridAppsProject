import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MobileFrame } from "../components/MobileFrame";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <MobileFrame>
        <Stack screenOptions={{ headerShown: false }} />
      </MobileFrame>
    </SafeAreaProvider>
  );
}
