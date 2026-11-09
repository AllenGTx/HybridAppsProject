import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface TipCardProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  cardWidth?: number;
  onPress?: () => void;
}

export function TipCard({
  icon,
  iconBg,
  title,
  subtitle,
  body,
  cta,
  cardWidth,
  onPress,
}: TipCardProps) {
  const [scaleAnim] = useState(() => new Animated.Value(1));

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, friction: 8 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 8 }).start();

  return (
    <Animated.View
      style={[
        styles.tipCard,
        cardWidth ? { width: cardWidth } : {},
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <View style={styles.tipCardHeader}>
          <View style={[styles.tipIconBox, { backgroundColor: iconBg }]}>
            <Text style={styles.tipIconText}>{icon}</Text>
          </View>
          <View style={styles.tipCardHeaderText}>
            <Text style={styles.tipTitle}>{title}</Text>
            <Text style={styles.tipSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <Text style={styles.tipBody}>{body}</Text>
        <View style={styles.tipCta}>
          <Text style={styles.tipCtaText}>{cta}</Text>
          <MaterialIcons name="arrow-forward" size={14} color="#006a43" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tipCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#006a43",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  tipCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  tipIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tipIconText: {
    fontSize: 18,
  },
  tipCardHeaderText: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#131e1a",
  },
  tipSubtitle: {
    fontSize: 11,
    color: "#296a4e",
    marginTop: 1,
  },
  tipBody: {
    fontSize: 13,
    color: "#3e4941",
    lineHeight: 20,
    marginBottom: 8,
  },
  tipCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#eaf7f0",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  tipCtaText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#006a43",
  },
});
