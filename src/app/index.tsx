import { useEffect, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

const logo = require("../../assets/Logo.png");

export default function Index() {
  const [opacity] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.88));
  const [pulseRing] = useState(() => new Animated.Value(1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseRing, {
          toValue: 1.15,
          duration: 1100,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseRing, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => router.replace("/welcome"), 2200);
    return () => clearTimeout(timer);
  }, [opacity, scale, pulseRing]);

  return (
    <View style={styles.container}>
      {/* Organic Background Shapes */}
      <View style={styles.bgCircleTop} />
      <View style={styles.bgCircleBottom} />
      <View style={styles.bgLeaf} />

      <Animated.View
        style={[
          styles.centerContent,
          { opacity, transform: [{ scale }] },
        ]}
      >
        <View style={styles.logoWrapper}>
          <Animated.View
            style={[
              styles.outerAura,
              { transform: [{ scale: pulseRing }] },
            ]}
          />
          <View style={styles.innerAura}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
        </View>

        <Text style={styles.title}>
          <Text style={styles.titleRe}>Re: </Text>
          <Text style={styles.titleVitalize}>Vitalize</Text>
        </Text>
        <Text style={styles.subtitle}>Your Health, Renewed</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#effcf5",
    position: "relative",
    overflow: "hidden",
  },
  bgCircleTop: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#d9f5e6",
    top: -110,
    right: -90,
    opacity: 0.75,
  },
  bgCircleBottom: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#dcf2e6",
    bottom: -90,
    left: -80,
    opacity: 0.85,
  },
  bgLeaf: {
    position: "absolute",
    width: 180,
    height: 320,
    borderRadius: 90,
    backgroundColor: "#e4f7ed",
    top: "18%",
    left: -70,
    transform: [{ rotate: "35deg" }],
    opacity: 0.7,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  logoWrapper: {
    width: 136,
    height: 136,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  outerAura: {
    position: "absolute",
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "rgba(0, 106, 67, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(0, 106, 67, 0.14)",
  },
  innerAura: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#006a43",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  title: {
    marginTop: 18,
    fontSize: 30,
    fontFamily: "cindel",
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  titleRe: {
    color: "#006a43",
  },
  titleVitalize: {
    color: "#131e1a",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#3e4941",
    letterSpacing: 0.5,
    fontWeight: "500",
  },
});
