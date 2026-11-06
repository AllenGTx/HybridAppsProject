import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Svg, { Defs, LinearGradient, Stop, Path, Line } from "react-native-svg";

const profileImg = require("../../assets/Profile.jpg");

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
const Y_LABELS = [200, 150, 100, 50, 0];

export default function ProfileScreen() {
  const handleLogout = () => {
    router.replace("/welcome");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <View style={styles.topBarActions}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <MaterialIcons name="mail-outline" size={20} color="#1e293b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <MaterialIcons name="settings" size={20} color="#1e293b" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.userTextInfo}>
          <Text style={styles.userName}>Alex Pratama</Text>
          <Text style={styles.userEmail}>alex.pratama@gmail.com</Text>
          <Text style={styles.joinText}>Joined Re:Vitalize for 12 days</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={profileImg} style={styles.avatar} resizeMode="cover" />
        </View>
      </View>

      <TouchableOpacity style={styles.membershipCard} activeOpacity={0.9}>
        <View style={styles.glossHighlightTop} />
        <View style={styles.glossCurveRight} />
        <View style={styles.membershipContent}>
          <View>
            <Text style={styles.membershipTitle}>
              Vitalize<Text style={styles.membershipPlus}>Plus+</Text>
            </Text>
            <Text style={styles.membershipSub}>Active Member • Free Tier</Text>
          </View>
          <View style={styles.membershipBadge}>
            <MaterialIcons name="auto-awesome" size={16} color="#aef1cd" />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.performanceCard}>
        <View style={styles.performanceHeader}>
          <Text style={styles.performanceTitle}>Healthy Living Score</Text>
          <Text style={styles.performanceSubtitle}>
            Weekly active exercise vs 150 min cardio target
          </Text>
        </View>

        <View style={styles.metricsRow}>
          <Text style={styles.metricLabel}>
            Average <Text style={styles.metricValueGreen}>157/week</Text>
          </Text>
          <Text style={styles.metricLabel}>
            Target Reach <Text style={styles.metricValueWarm}>67%</Text>
          </Text>
        </View>

        <View style={styles.chartRow}>
          <View style={styles.yAxisColumn}>
            {Y_LABELS.map((val) => (
              <Text key={val} style={styles.yAxisLabel}>
                {val}
              </Text>
            ))}
          </View>

          <View style={styles.plotArea}>
            <View style={styles.peakTooltip}>
              <Text style={styles.peakTooltipText}>192 min</Text>
            </View>

            <View style={styles.peakDot} />

            <Svg
              width="100%"
              height={154}
              viewBox="0 0 300 154"
              preserveAspectRatio="none"
            >
              <Defs>
                <LinearGradient id="singleWave" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#059669" stopOpacity="0.46" />
                  <Stop offset="72%" stopColor="#34d399" stopOpacity="0.14" />
                  <Stop offset="100%" stopColor="#ecfdf5" stopOpacity="0.0" />
                </LinearGradient>
              </Defs>

              <Line
                x1="0"
                y1="56"
                x2="300"
                y2="56"
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              <Path
                d="M 0 66 C 30 66, 30 76, 60 76 C 90 76, 90 49, 120 49 C 150 49, 150 29, 180 29 C 210 29, 210 54, 240 54 C 270 54, 270 38, 300 38 L 300 154 L 0 154 Z"
                fill="url(#singleWave)"
              />
              <Path
                d="M 0 66 C 30 66, 30 76, 60 76 C 90 76, 90 49, 120 49 C 150 49, 150 29, 180 29 C 210 29, 210 54, 240 54 C 270 54, 270 38, 300 38"
                fill="none"
                stroke="#047857"
                strokeWidth="2.5"
              />
            </Svg>

            <View style={styles.xAxisRow}>
              {MONTHS.map((month) => (
                <Text
                  key={month}
                  style={[
                    styles.xAxisLabel,
                    month === "APR" && styles.xAxisLabelActive,
                  ]}
                >
                  {month}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.8}
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={19} color="#be123c" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  topBarActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  userTextInfo: {
    flex: 1,
    paddingRight: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.3,
  },
  userEmail: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  joinText: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },
  avatarContainer: {
    padding: 3,
    backgroundColor: "#ffffff",
    borderRadius: 42,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  membershipCard: {
    backgroundColor: "#044e35",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#0d7a54",
    shadowColor: "#004d31",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 4,
  },
  glossHighlightTop: {
    position: "absolute",
    top: -35,
    left: -20,
    width: "80%",
    height: 70,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  glossCurveRight: {
    position: "absolute",
    right: -30,
    bottom: -40,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(110, 231, 183, 0.14)",
  },
  membershipContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  membershipTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.2,
  },
  membershipPlus: {
    color: "#86efac",
    fontWeight: "600",
    fontStyle: "italic",
  },
  membershipSub: {
    fontSize: 12,
    color: "#bbf7d0",
    marginTop: 4,
  },
  membershipBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  performanceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  performanceHeader: {
    marginBottom: 10,
  },
  performanceTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.2,
  },
  performanceSubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginBottom: 22,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#475569",
  },
  metricValueGreen: {
    fontWeight: "700",
    color: "#047857",
  },
  metricValueWarm: {
    fontWeight: "700",
    color: "#c2410c",
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  yAxisColumn: {
    width: 26,
    height: 154,
    justifyContent: "space-between",
    paddingTop: 18,
    paddingBottom: 2,
    marginRight: 6,
  },
  yAxisLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
  },
  plotArea: {
    flex: 1,
    position: "relative",
  },
  peakTooltip: {
    position: "absolute",
    left: "60%",
    top: -3,
    width: 68,
    marginLeft: -34,
    alignItems: "center",
    backgroundColor: "#044e35",
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },
  peakTooltipText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  peakDot: {
    position: "absolute",
    left: "60%",
    top: 23,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: -6,
    backgroundColor: "#facc15",
    borderWidth: 2,
    borderColor: "#ffffff",
    zIndex: 10,
  },
  xAxisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  xAxisLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748b",
    letterSpacing: 0.3,
  },
  xAxisLabelActive: {
    color: "#047857",
    fontWeight: "700",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff1f2",
    borderWidth: 1,
    borderColor: "#fecdd3",
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#be123c",
    letterSpacing: 0.2,
  },
});
