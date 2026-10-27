import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

const logoLocal = require("../../../assets/Logo.png");

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  showBack?: boolean;
  compact?: boolean;
}

export function AuthHeader({
  title,
  subtitle,
  showBack = true,
  compact = false,
}: AuthHeaderProps) {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/welcome");
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.headerBg, compact && styles.headerBgCompact]}>
        {/* Subtle organic botanical shapes in background */}
        <View style={styles.circleTopRight} />
        <View style={styles.circleLeft} />
        <View style={styles.leafShape1} />
        <View style={styles.leafShape2} />

        {/* Top Navigation Row */}
        <View style={styles.topBar}>
          {showBack ? (
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={0.7}
              style={styles.backButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.backChevron}>‹</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.backPlaceholder} />
          )}
        </View>

        {/* Integrated Brand Lockup */}
        <View style={styles.brandLockup}>
          <View style={styles.logoRing}>
            <Image
              source={logoLocal}
              style={styles.brandLogo}
              resizeMode="cover"
            />
          </View>
          <View style={styles.brandTextCol}>
            <Text style={styles.brandTitle}>
              <Text style={styles.brandRe}>Re: </Text>
              <Text style={styles.brandVitalize}>Vitalize</Text>
            </Text>
            <Text style={styles.brandTagline}>WELLNESS &amp; VITALITY</Text>
          </View>
        </View>

        {/* Main Screen Title & Subtitle */}
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* True Vector SVG Wave with multi-line ribbons (Matching the uploaded wave sheet) */}
        <View style={styles.svgWaveWrapper} pointerEvents="none">
          <Svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            {/* Outer delicate wave line */}
            <Path
              d="M0,192 C380,310 820,40 1440,120"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="8"
            />
            {/* Secondary inner wave ribbon */}
            <Path
              d="M0,210 C390,322 830,62 1440,138"
              fill="none"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="10"
            />
            {/* Main solid white wave body */}
            <Path
              d="M0,228 C400,335 840,85 1440,156 L1440,320 L0,320 Z"
              fill="#FFFFFF"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  headerBg: {
    backgroundColor: "#3D6B5B",
    paddingTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 86,
    position: "relative",
    overflow: "hidden",
  },
  headerBgCompact: {
    paddingTop: 26,
    paddingBottom: 74,
  },
  circleTopRight: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#4B7D6B",
    top: -80,
    right: -60,
    opacity: 0.55,
  },
  circleLeft: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#31584A",
    bottom: -20,
    left: -60,
    opacity: 0.65,
  },
  leafShape1: {
    position: "absolute",
    width: 130,
    height: 260,
    borderRadius: 65,
    backgroundColor: "#538876",
    top: -10,
    right: 25,
    transform: [{ rotate: "32deg" }],
    opacity: 0.22,
  },
  leafShape2: {
    position: "absolute",
    width: 110,
    height: 220,
    borderRadius: 55,
    backgroundColor: "#2C5043",
    top: 40,
    right: -20,
    transform: [{ rotate: "18deg" }],
    opacity: 0.3,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    zIndex: 3,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backChevron: {
    fontSize: 34,
    lineHeight: 34,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  backPlaceholder: {
    width: 32,
    height: 32,
  },
  brandLockup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    zIndex: 3,
  },
  logoRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 2,
    backgroundColor: "rgba(141, 248, 189, 0.22)",
    borderWidth: 1,
    borderColor: "rgba(174, 241, 205, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#002112",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  brandLogo: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  brandTextCol: {
    justifyContent: "center",
  },
  brandTitle: {
    fontSize: 20,
    fontFamily: "cindel",
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  brandRe: {
    color: "#71DBA2",
  },
  brandVitalize: {
    color: "#FFFFFF",
  },
  brandTagline: {
    fontSize: 9,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.65)",
    letterSpacing: 1.6,
    marginTop: 1,
  },
  textWrap: {
    zIndex: 3,
  },
  title: {
    fontSize: 31,
    lineHeight: 37,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(255, 255, 255, 0.84)",
    fontWeight: "400",
  },
  svgWaveWrapper: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 76,
    zIndex: 4,
  },
});
