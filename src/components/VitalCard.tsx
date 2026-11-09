import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface VitalCardProps {
  icon: string;
  iconBg: string;
  title: string;
  value: string;
  unit?: string;
  tag?: string;
  tagColor?: string;
  note?: string;
  progress?: number;
  goal?: string;
  onAdd?: () => void;
}

export function VitalCard({
  icon,
  iconBg,
  title,
  value,
  unit,
  tag,
  tagColor = "#296a4e",
  note,
  progress,
  goal,
  onAdd,
}: VitalCardProps) {
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const [progressAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (progress !== undefined) {
      Animated.timing(progressAnim, {
        toValue: progress / 100,
        duration: 900,
        delay: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [progress, progressAnim]);

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, friction: 7 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 7 }).start();

  return (
    <Animated.View style={[styles.vitalCard, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={styles.vitalCardInner}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.vitalCardTop}>
          <View style={[styles.vitalIconBox, { backgroundColor: iconBg }]}>
            <Text style={styles.vitalIcon}>{icon}</Text>
          </View>
          {onAdd ? (
            <TouchableOpacity style={styles.addButton} onPress={onAdd}>
              <MaterialIcons name="add" size={16} color="#006a43" />
            </TouchableOpacity>
          ) : tag ? (
            <View style={[styles.vitalTag, { borderColor: tagColor + "40" }]}>
              <Text style={[styles.vitalTagText, { color: tagColor }]}>{tag}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.vitalCardBody}>
          <Text style={styles.vitalLabel}>{title}</Text>
          <View style={styles.vitalValueRow}>
            <Text style={styles.vitalValue}>{value}</Text>
            {unit && <Text style={styles.vitalUnit}>{unit}</Text>}
          </View>
          {progress !== undefined && (
            <View style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressFill,
                  { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) },
                ]}
              />
            </View>
          )}
          {goal && <Text style={styles.vitalNote}>{goal}</Text>}
          {note && <Text style={styles.vitalNote}>✓ {note}</Text>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  vitalCard: {
    flexBasis: "48%",
    flexGrow: 1,
    minWidth: 140,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#006a43",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  vitalCardInner: {
    padding: 14,
    gap: 8,
  },
  vitalCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vitalIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  vitalIcon: {
    fontSize: 20,
  },
  vitalTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "#eaf7f0",
    borderWidth: 1,
  },
  vitalTagText: {
    fontSize: 11,
    fontWeight: "600",
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e4f1ea",
    alignItems: "center",
    justifyContent: "center",
  },
  vitalCardBody: {
    gap: 3,
  },
  vitalLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#3e4941",
    letterSpacing: 0.3,
  },
  vitalValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 3,
  },
  vitalValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#131e1a",
    lineHeight: 32,
  },
  vitalUnit: {
    fontSize: 11,
    fontWeight: "500",
    color: "#3e4941",
  },
  progressTrack: {
    width: "100%",
    height: 5,
    backgroundColor: "#e4f1ea",
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#006a43",
    borderRadius: 3,
  },
  vitalNote: {
    fontSize: 11,
    color: "#3e4941",
    marginTop: 2,
  },
});
