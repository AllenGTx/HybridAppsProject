import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Svg, { Defs, LinearGradient, Stop, Path, Line } from "react-native-svg";

const profileImg = require("../../assets/Profile.jpg");

function FadeSlideIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(14));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 420,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, opacity, translateY]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
const Y_LABELS = [200, 150, 100, 50, 0];

const BMI_CATEGORIES = [
  { label: "Underweight", range: "Below 18.5", color: "#38bdf8", domeColor: "#0284c7", bgColor: "#e0f2fe", angle: -68, sampleBmi: "17.2" },
  { label: "Normal", range: "18.5 to 24.9", color: "#10b981", domeColor: "#059669", bgColor: "#ecfdf5", angle: -24, sampleBmi: "23.0" },
  { label: "Overweight", range: "25.0 to 29.9", color: "#f59e0b", domeColor: "#d97706", bgColor: "#fef3c7", angle: 24, sampleBmi: "27.4" },
  { label: "Obesity", range: "30 or greater", color: "#ef4444", domeColor: "#dc2626", bgColor: "#fee2e2", angle: 68, sampleBmi: "31.8" },
];

export default function ProfileScreen({
  onEditBmi,
}: {
  onEditBmi?: () => void;
}) {
  const [cardScale] = useState(() => new Animated.Value(1));
  const [chartWave] = useState(() => new Animated.Value(0));
  const [peakScale] = useState(() => new Animated.Value(0));
  const [selectedBmiIndex, setSelectedBmiIndex] = useState(1);
  const [needleAnim] = useState(() => new Animated.Value(-82));
  const [chartPlayed, setChartPlayed] = useState(false);
  const [bmiPlayed, setBmiPlayed] = useState(false);

  const currentBmi = BMI_CATEGORIES[selectedBmiIndex];

  const handleScroll = (e: any) => {
    const scrollY = e.nativeEvent.contentOffset.y;

    if (scrollY > 110 && !chartPlayed) {
      setChartPlayed(true);
      Animated.sequence([
        Animated.spring(chartWave, {
          toValue: 1,
          friction: 5,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.spring(peakScale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    }

    if (scrollY > 360 && !bmiPlayed) {
      setBmiPlayed(true);
      Animated.sequence([
        Animated.timing(needleAnim, {
          toValue: 35,
          duration: 500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(needleAnim, {
          toValue: BMI_CATEGORIES[selectedBmiIndex].angle,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleSelectBmiCategory = (index: number) => {
    setSelectedBmiIndex(index);
    setBmiPlayed(true);
    Animated.spring(needleAnim, {
      toValue: BMI_CATEGORIES[index].angle,
      friction: 5,
      tension: 45,
      useNativeDriver: true,
    }).start();
  };

  const needleRotate = needleAnim.interpolate({
    inputRange: [-90, 90],
    outputRange: ["-90deg", "90deg"],
  });

  const waveTranslateY = chartWave.interpolate({
    inputRange: [0, 1],
    outputRange: [95, 0],
  });

  const waveScaleY = chartWave.interpolate({
    inputRange: [0, 1],
    outputRange: [0.15, 1],
  });

  const handleCardPressIn = () => {
    Animated.spring(cardScale, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 7,
    }).start();
  };

  const handleCardPressOut = () => {
    Animated.spring(cardScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
    }).start();
  };

  const handleLogout = () => {
    router.replace("/welcome");
  };

  const handleEditBmi = () => {
    if (onEditBmi) {
      onEditBmi();
    } else {
      router.push("/check");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <FadeSlideIn delay={60}>
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
      </FadeSlideIn>

      <FadeSlideIn delay={140}>
        <Animated.View style={{ transform: [{ scale: cardScale }] }}>
          <TouchableOpacity
            style={styles.membershipCard}
            activeOpacity={0.95}
            onPressIn={handleCardPressIn}
            onPressOut={handleCardPressOut}
          >
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
        </Animated.View>
      </FadeSlideIn>

      <FadeSlideIn delay={220}>
        <View style={styles.medicalCard}>
          <View style={styles.medicalHeader}>
            <MaterialIcons name="medical-services" size={18} color="#dc2626" />
            <Text style={styles.medicalTitle}>Medical ID</Text>
          </View>

          <View style={styles.bioStrip}>
            <View style={styles.bioItem}>
              <Text style={styles.bioLabel}>Gender</Text>
              <Text style={styles.bioValue}>Male</Text>
            </View>
            <View style={styles.bioDivider} />
            <View style={styles.bioItem}>
              <Text style={styles.bioLabel}>Age</Text>
              <Text style={styles.bioValue}>
                30-34 <Text style={styles.bioUnit}>yrs</Text>
              </Text>
            </View>
            <View style={styles.bioDivider} />
            <View style={styles.bioItem}>
              <Text style={styles.bioLabel}>Height</Text>
              <Text style={styles.bioValue}>
                172 <Text style={styles.bioUnit}>cm</Text>
              </Text>
            </View>
            <View style={styles.bioDivider} />
            <View style={styles.bioItem}>
              <Text style={styles.bioLabel}>Weight</Text>
              <Text style={styles.bioValue}>
                68 <Text style={styles.bioUnit}>kg</Text>
              </Text>
            </View>
          </View>

          <View style={styles.medicalRow}>
            <Text style={styles.medicalLabel}>Blood Type</Text>
            <Text style={styles.medicalValue}>B</Text>
          </View>
          <View style={styles.medicalRow}>
            <Text style={styles.medicalLabel}>Blood Pressure</Text>
            <Text style={styles.medicalValue}>
              118/76 <Text style={styles.medicalUnit}>mmHg</Text>
            </Text>
          </View>
          <View style={styles.medicalRow}>
            <Text style={styles.medicalLabel}>HDL Cholesterol</Text>
            <Text style={styles.medicalValue}>
              58 <Text style={styles.medicalUnit}>mg/dL</Text>
            </Text>
          </View>
          <View style={styles.medicalRow}>
            <Text style={styles.medicalLabel}>LDL Cholesterol</Text>
            <Text style={styles.medicalValue}>
              94 <Text style={styles.medicalUnit}>mg/dL</Text>
            </Text>
          </View>
          <View style={styles.medicalRow}>
            <Text style={styles.medicalLabel}>Smoking</Text>
            <Text style={styles.medicalValue}>Never Smoked</Text>
          </View>
          <View style={styles.medicalRow}>
            <Text style={styles.medicalLabel}>Conditions</Text>
            <Text style={styles.medicalValue}>None</Text>
          </View>

          <TouchableOpacity style={styles.emergencyRow} activeOpacity={0.6}>
            <View>
              <Text style={styles.medicalLabel}>Emergency Contact</Text>
              <Text style={styles.emergencyNumber}>+62 812-3456-7890</Text>
            </View>
            <View style={styles.emergencyRight}>
              <Text style={styles.emergencyRelation}>Family</Text>
              <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
            </View>
          </TouchableOpacity>
        </View>
      </FadeSlideIn>

      <FadeSlideIn delay={280}>
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
              <Animated.View
                style={[
                  styles.peakTooltip,
                  {
                    opacity: peakScale,
                    transform: [{ scale: peakScale }],
                  },
                ]}
              >
                <Text style={styles.peakTooltipText}>192 min</Text>
              </Animated.View>

              <Animated.View
                style={[
                  styles.peakDot,
                  {
                    opacity: peakScale,
                    transform: [{ scale: peakScale }],
                  },
                ]}
              />

              <View style={styles.svgContainer}>
                <Svg
                  width="100%"
                  height={154}
                  viewBox="0 0 300 154"
                  preserveAspectRatio="none"
                  style={styles.svgGridLayer}
                >
                  <Line
                    x1="0"
                    y1="56"
                    x2="300"
                    y2="56"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </Svg>

                <Animated.View
                  style={{
                    opacity: chartWave,
                    transform: [
                      { translateY: waveTranslateY },
                      { scaleY: waveScaleY },
                    ],
                  }}
                >
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
                </Animated.View>
              </View>

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
      </FadeSlideIn>

      <FadeSlideIn delay={340}>
        <View style={styles.bmiCard}>
        <View style={styles.bmiHeaderRow}>
          <Text style={styles.bmiTitle}>Body Mass Index</Text>
          <Text style={styles.bmiSubtitle}>
            Adult weight classification based on height and weight
          </Text>
        </View>

        <View style={styles.bmiGaugeBox}>
          <View style={styles.bmiGaugeSvgWrap}>
            <Svg width={240} height={126} viewBox="0 0 240 126">
              <Path
                d="M 24 111 A 96 96 0 0 1 45 58"
                fill="none"
                stroke="#38bdf8"
                strokeWidth={selectedBmiIndex === 0 ? "11" : "8"}
                strokeOpacity={selectedBmiIndex === 0 ? 1 : 0.45}
                strokeLinecap="round"
              />
              <Path
                d="M 60 43 A 96 96 0 0 1 110 23"
                fill="none"
                stroke="#10b981"
                strokeWidth={selectedBmiIndex === 1 ? "11" : "8"}
                strokeOpacity={selectedBmiIndex === 1 ? 1 : 0.45}
                strokeLinecap="round"
              />
              <Path
                d="M 130 23 A 96 96 0 0 1 180 43"
                fill="none"
                stroke="#f59e0b"
                strokeWidth={selectedBmiIndex === 2 ? "11" : "8"}
                strokeOpacity={selectedBmiIndex === 2 ? 1 : 0.45}
                strokeLinecap="round"
              />
              <Path
                d="M 195 58 A 96 96 0 0 1 216 111"
                fill="none"
                stroke="#ef4444"
                strokeWidth={selectedBmiIndex === 3 ? "11" : "8"}
                strokeOpacity={selectedBmiIndex === 3 ? 1 : 0.45}
                strokeLinecap="round"
              />
              <Path
                d="M 44 118 A 76 76 0 0 1 196 118 Z"
                fill={currentBmi.domeColor}
              />
            </Svg>

            <Animated.View
              pointerEvents="none"
              style={[
                styles.bmiNeedleWheel,
                { transform: [{ rotate: needleRotate }] },
              ]}
            >
              <View
                style={[
                  styles.bmiPointerBadge,
                  { borderColor: currentBmi.color },
                ]}
              >
                <View
                  style={[
                    styles.bmiPointerDot,
                    { backgroundColor: currentBmi.color },
                  ]}
                />
                <View
                  style={[
                    styles.bmiPointerStem,
                    { backgroundColor: currentBmi.color },
                  ]}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color={currentBmi.color}
                  style={styles.bmiPointerIcon}
                />
              </View>
            </Animated.View>

            <View style={styles.bmiGaugeCenter}>
              <Text style={styles.bmiGaugeValue}>{currentBmi.sampleBmi}</Text>
              <Text style={styles.bmiGaugeLabel}>{currentBmi.label}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bmiDetailBox}>
          <Text style={styles.bmiSummaryText}>
            Based on the information entered, your body mass index (BMI) is{" "}
            <Text style={styles.bmiSummaryBold}>{currentBmi.sampleBmi}</Text>,
            placing your weight in the{" "}
            <Text
              style={[
                styles.bmiSummaryBold,
                { color: currentBmi.domeColor },
              ]}
            >
              {currentBmi.label}
            </Text>{" "}
            category for adults of your height.
          </Text>

          <View style={styles.bmiTable}>
            {BMI_CATEGORIES.map((item, index) => {
              const isActive = index === selectedBmiIndex;
              return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.75}
                  onPress={() => handleSelectBmiCategory(index)}
                  style={[
                    styles.bmiTableRow,
                    isActive && { backgroundColor: item.bgColor },
                    index === BMI_CATEGORIES.length - 1 &&
                      styles.bmiTableRowLast,
                  ]}
                >
                  <Text
                    style={[
                      styles.bmiRowCategory,
                      isActive && {
                        fontWeight: "700",
                        color: item.domeColor,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={[
                      styles.bmiRowRange,
                      isActive && {
                        fontWeight: "700",
                        color: item.domeColor,
                      },
                    ]}
                  >
                    {item.range}
                  </Text>
                  <View
                    style={[
                      styles.bmiColorBar,
                      { backgroundColor: item.color },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          style={styles.bmiEditButton}
          activeOpacity={0.85}
          onPress={handleEditBmi}
        >
          <MaterialIcons name="tune" size={17} color="#ffffff" />
          <Text style={styles.bmiEditButtonText}>Edit Information</Text>
        </TouchableOpacity>
        </View>
      </FadeSlideIn>

      <FadeSlideIn delay={400}>
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={19} color="#be123c" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </FadeSlideIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#effcf5",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 96,
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
    borderColor: "#dcece3",
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
    color: "#64748b",
    marginTop: 4,
  },
  avatarContainer: {
    padding: 3,
    backgroundColor: "#ffffff",
    borderRadius: 42,
    borderWidth: 1,
    borderColor: "#dcece3",
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
  medicalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dcece3",
  },
  medicalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  medicalTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
  },
  bioStrip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3faf6",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginTop: 6,
    marginBottom: 4,
  },
  bioItem: {
    flex: 1,
    alignItems: "center",
  },
  bioLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 2,
  },
  bioValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
  bioUnit: {
    fontSize: 11,
    fontWeight: "500",
    color: "#475569",
  },
  bioDivider: {
    width: 1,
    height: 26,
    backgroundColor: "#dcece3",
  },
  medicalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  medicalLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  medicalValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
  },
  medicalUnit: {
    fontSize: 12,
    color: "#64748b",
  },
  emergencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  emergencyNumber: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    marginTop: 2,
  },
  emergencyRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  emergencyRelation: {
    fontSize: 14,
    color: "#64748b",
  },
  performanceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dcece3",
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
  svgContainer: {
    position: "relative",
    overflow: "hidden",
    height: 154,
  },
  svgGridLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
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
  bmiCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dcece3",
  },
  bmiHeaderRow: {
    marginBottom: 14,
  },
  bmiTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.2,
  },
  bmiSubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  bmiGaugeBox: {
    backgroundColor: "#f3faf6",
    borderRadius: 16,
    paddingTop: 14,
    paddingBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2f2ea",
    marginBottom: 14,
  },
  bmiGaugeSvgWrap: {
    width: 240,
    height: 126,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bmiNeedleWheel: {
    position: "absolute",
    width: 196,
    height: 196,
    top: 20,
    left: 22,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bmiPointerBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 3.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -7,
  },
  bmiPointerDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  bmiPointerStem: {
    position: "absolute",
    bottom: -12,
    width: 3,
    height: 10,
    borderRadius: 1.5,
  },
  bmiPointerIcon: {
    position: "absolute",
    bottom: -24,
  },
  bmiGaugeCenter: {
    position: "absolute",
    bottom: 14,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bmiGaugeValue: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  bmiGaugeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#d1fae5",
    marginTop: 1,
  },
  bmiDetailBox: {
    backgroundColor: "#f3faf6",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2f2ea",
    marginBottom: 14,
  },
  bmiSummaryText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#475569",
    marginBottom: 12,
  },
  bmiSummaryBold: {
    fontWeight: "700",
    color: "#0f172a",
  },
  bmiTable: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
  },
  bmiTableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  bmiTableRowActive: {
    backgroundColor: "#ecfdf5",
  },
  bmiTableRowLast: {
    borderBottomWidth: 0,
  },
  bmiRowCategory: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: "#334155",
  },
  bmiRowRange: {
    width: 102,
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
  },
  bmiRowTextActive: {
    fontWeight: "700",
    color: "#047857",
  },
  bmiColorBar: {
    width: 36,
    height: 12,
    borderRadius: 6,
  },
  bmiEditButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#047857",
    borderRadius: 14,
    paddingVertical: 13,
  },
  bmiEditButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.2,
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
