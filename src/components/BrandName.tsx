import React from "react";
import { View, Text, Image, StyleSheet, ViewStyle } from "react-native";

const logoLocal = require("../../assets/Logo.png");

interface BrandNameProps {
  subtitle?: string;
  style?: ViewStyle;
}

export default function BrandName({ subtitle = "Your Health, Renewed", style }: BrandNameProps) {
  return (
    <View style={[styles.brandRow, style]}>
      <View style={styles.logoContainer}>
        <Image source={logoLocal} style={styles.logoImage} resizeMode="cover" />
      </View>
      <View style={styles.brandText}>
        <Text style={styles.brandName}>
          <Text style={styles.brandRe}>Re: </Text>
          <Text style={styles.brandVitalize}>Vitalize</Text>
        </Text>
        <Text style={styles.brandSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#006a43",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  brandText: {
    flex: 1,
  },
  brandName: {
    fontSize: 22,
    fontFamily: "cindel",
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  brandRe: {
    color: "#006a43",
  },
  brandVitalize: {
    color: "#131e1a",
  },
  brandSubtitle: {
    fontSize: 12,
    color: "#3e4941",
    marginTop: 1,
  },
});