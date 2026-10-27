import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

const logoLocal = require("../../assets/Logo.png");

export default function WelcomeScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.bgShapeTop} />
      <View style={styles.bgShapeCenter} />
      <View style={styles.bgShapeBottom} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Integrated Brand Lockup (No harsh white background) */}
          <View style={styles.brandLockup}>
            <View style={styles.logoRing}>
              <Image
                source={logoLocal}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text style={styles.logoTitle}>
                <Text style={styles.logoRe}>Re: </Text>
                <Text style={styles.logoVitalize}>Vitalize</Text>
              </Text>
              <Text style={styles.logoSubtitle}>WELLNESS &amp; VITALITY</Text>
            </View>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>
              The best{"\n"}companion{"\n"}for your health
            </Text>
            <Text style={styles.heroSubtitle}>
              Restore balance, track daily vitals, and build lasting vitality.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionGroup}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.primaryButtonText}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.85}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.secondaryButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#3D6B5B",
    position: "relative",
    overflow: "hidden",
  },
  bgShapeTop: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "#4A7C6B",
    top: -90,
    right: -100,
    opacity: 0.6,
  },
  bgShapeCenter: {
    position: "absolute",
    width: 280,
    height: 420,
    borderRadius: 140,
    backgroundColor: "#345C4E",
    top: "22%",
    left: -90,
    transform: [{ rotate: "-25deg" }],
    opacity: 0.75,
  },
  bgShapeBottom: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#477767",
    bottom: -80,
    right: -70,
    opacity: 0.45,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 44,
    justifyContent: "space-between",
  },
  brandLockup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logoRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 2,
    backgroundColor: "rgba(141, 248, 189, 0.22)",
    borderWidth: 1,
    borderColor: "rgba(174, 241, 205, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#002112",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  logoTitle: {
    fontSize: 24,
    fontFamily: "cindel",
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  logoRe: {
    color: "#71DBA2",
  },
  logoVitalize: {
    color: "#FFFFFF",
  },
  logoSubtitle: {
    fontSize: 10,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.65)",
    letterSpacing: 1.8,
    marginTop: 2,
  },
  heroSection: {
    marginTop: 20,
  },
  heroTitle: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.6,
  },
  heroSubtitle: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 23,
    color: "rgba(255, 255, 255, 0.85)",
    maxWidth: 280,
  },
  actionGroup: {
    gap: 16,
  },
  primaryButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: "#E59572",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1E382F",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  secondaryButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: "#B8B0C4",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
