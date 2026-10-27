import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text } from "react-native";
import { router } from "expo-router";

const logo = require("../../assets/Logo.png");

export default function Index() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => router.replace("/login"), 2200);
    return () => clearTimeout(timer);
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>
        <Text style={styles.titleRe}>Re: </Text>
        <Text style={styles.titleVitalize}>Vitalize</Text>
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#effcf5",
  },
  logo: { width: 96, height: 96, borderRadius: 48 },
  title: {
    marginTop: 16,
    fontSize: 28,
    fontFamily: "cindel",
    fontWeight: "700",
  },
  titleRe: {
    color: "#006a43",
  },
  titleVitalize: {
    color: "#131e1a",
  },
});