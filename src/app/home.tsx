import React, { useState, useEffect } from "react";
const logoLocal = require("../../assets/Logo.png");
const profileLocal = require("../../assets/Profile.jpg");
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// FadeSlideIn
function FadeSlideIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}) {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(24));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}

// Header (Diperbarui dengan Re: Vitalize)
function Header() {
  const [opacity] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1, duration: 400, useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.header, { opacity }]}>
      <View style={styles.headerInner}>
        <Image source={logoLocal} style={styles.headerLogo} resizeMode="cover" />
        <Text style={styles.headerTitle}>
          <Text style={styles.headerRe}>Re: </Text>
          <Text style={styles.headerVitalize}>Vitalize</Text>
        </Text>
      </View>
    </Animated.View>
  );
}

// VitalCard
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

function VitalCard({
  icon, iconBg, title, value, unit, tag,
  tagColor = "#296a4e", note, progress, goal, onAdd,
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
  }, [progress]);

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

// TipCard
interface TipCardProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  cardWidth?: number;
}

function TipCard({ icon, iconBg, title, subtitle, body, cta, cardWidth }: TipCardProps) {
  const [scaleAnim] = useState(() => new Animated.Value(1));
  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, friction: 8 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 8 }).start();

  return (
    <Animated.View style={[styles.tipCard, cardWidth ? { width: cardWidth } : {}, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={1}>
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

// Heart Icon
function PulsingHeart() {
  const [pulse] = useState(() => new Animated.Value(1));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.3, duration: 500, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 500, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View style={{ transform: [{ scale: pulse }] }}>
      <MaterialIcons name="favorite" size={22} color="#ff4b4b" />
    </Animated.View>
  );
}

// HomeScreen
type TabName = "home" | "check" | "history" | "profile";

export default function HomeScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const containerWidth = Math.min(screenWidth, 420);
  const TIP_CARD_WIDTH = containerWidth - 48;
  const [activeTab, setActiveTab] = useState<TabName>("home");
  const [waterValue, setWaterValue] = useState(1.5);
  const [checkState, setCheckState] = useState<"idle" | "calibrating" | "ready">("idle");
  const tabs: { name: TabName; icon: string; label: string }[] = [
    { name: "home", icon: "home", label: "Home" },
    { name: "check", icon: "bar-chart", label: "Check" },
    { name: "history", icon: "calendar-today", label: "History" },
    { name: "profile", icon: "person-outline", label: "Profile" },
  ];

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);
  };

  const handleAddWater = () => {
    setWaterValue((v) => Math.min(parseFloat((v + 0.25).toFixed(2)), 3.5));
  };

  const handleCheckNow = () => {
    if (checkState !== "idle") return;
    setCheckState("calibrating");
    setTimeout(() => {
      setCheckState("ready");
      setTimeout(() => setCheckState("idle"), 1800);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>

          {/* Greeting */}
          <FadeSlideIn delay={100}>
            <View style={styles.greetingRow}>
              <View style={styles.greetingText}>
                <Text style={styles.greetingTitle}>Hello, Alex 👋</Text>
                <Text style={styles.greetingSubtitle}>How are you feeling today?</Text>
              </View>
              <View style={styles.avatarWrapper}>
                <Image source={profileLocal} style={styles.avatar} resizeMode="cover" />
                <View style={styles.avatarStatus} />
              </View>
            </View>
          </FadeSlideIn>

          {/* Heart check card */}
          <FadeSlideIn delay={200}>
            <View style={styles.highlightCard}>
              <View style={styles.pulseRing1} pointerEvents="none" />
              <View style={styles.pulseRing2} pointerEvents="none" />

              <View style={styles.highlightInner}>
                <View style={styles.highlightRow}>
                  <View style={styles.vitalsHubBadge}>
                    <MaterialIcons name="local-hospital" size={11} color="#aef1cd" />
                    <Text style={styles.vitalsHubText}> Vitals Hub</Text>
                  </View>
                  <View style={styles.lastCheckBadge}>
                    <View style={styles.lastCheckDot} />
                    <Text style={styles.lastCheckText}>Last check: Normal</Text>
                  </View>
                </View>

                <View style={styles.highlightTitleRow}>
                  <PulsingHeart />
                  <Text style={styles.highlightTitle}>Heart Health Check</Text>
                </View>
                <Text style={styles.highlightBody}>
                  Comprehensive vascular check ready. Capture blood flow dynamics &amp; HRV in 45 seconds.
                </Text>

                <TouchableOpacity style={styles.checkButton} onPress={handleCheckNow} activeOpacity={0.85}>
                  {checkState === "idle" && (
                    <>
                      <Text style={styles.checkButtonText}>Check Now</Text>
                      <MaterialIcons name="arrow-forward" size={18} color="#006a43" style={{ marginLeft: 4 }} />
                    </>
                  )}
                  {checkState === "calibrating" && (
                    <>
                      <MaterialIcons name="settings" size={16} color="#006a43" />
                      <Text style={styles.checkButtonText}>Calibrating Sensor...</Text>
                    </>
                  )}
                  {checkState === "ready" && (
                    <>
                      <MaterialIcons name="check-circle" size={16} color="#006a43" />
                      <Text style={styles.checkButtonText}>Ready &amp; Calibrated</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </FadeSlideIn>

          {/* Overview */}
          <FadeSlideIn delay={320}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{"Today's Overview"}</Text>
              <TouchableOpacity style={styles.seeAllBtn}>
                <Text style={styles.seeAllText}>See details ›</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.vitalsGrid}>
              <VitalCard icon="❤️" iconBg="#ffe5e5" title="Heart Rate" value="72" unit="bpm" tag="Live" note="Resting normal" />
              <VitalCard icon="🚶" iconBg="#e5f0ff" title="Daily Steps" value="5,430" tag="68%" tagColor="#2563eb" progress={68} goal="Goal: 8,000" />
              <VitalCard icon="💧" iconBg="#e5f6ff" title="Water Intake" value={waterValue.toFixed(1)} unit="L" goal="Target 2.5 L" onAdd={handleAddWater} />
              <VitalCard icon="🌙" iconBg="#ede5ff" title="Sleep Cycle" value="7h 20m" tag="Good" tagColor="#006a43" note="Deep: 1h 45m" />
            </View>
          </FadeSlideIn>

          {/* Health Tips */}
          <FadeSlideIn delay={440}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Health Tips</Text>
                <Text style={styles.sectionSubtitle}>Curated for your circulatory balance</Text>
              </View>
              <View style={styles.tipDots}>
                <View style={[styles.tipDot, styles.tipDotActive]} />
                <View style={styles.tipDot} />
                <View style={styles.tipDot} />
              </View>
            </View>
          </FadeSlideIn>

          <FadeSlideIn delay={520}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.tipsScroll}
              snapToInterval={TIP_CARD_WIDTH + 12}
              decelerationRate="fast"
            >
              <TipCard icon="🌬️" iconBg="#a0f3d9" iconColor="#006955" title="Mindful Breathing" subtitle="5 min exercise" body="5 minutes of rhythmic 4-7-8 breathing can lower your resting heart rate and measurably decrease morning cortisol." cta="Try Quick Guided Session" cardWidth={TIP_CARD_WIDTH} />
              <TipCard icon="☀️" iconBg="#fff3c4" iconColor="#b45309" title="Circadian Reset" subtitle="Morning habit" body="Ten minutes of natural indirect sunlight within 30 minutes of waking anchors your melatonin curve for restorative sleep." cta="Log Light Exposure" cardWidth={TIP_CARD_WIDTH} />
              <TipCard icon="🥗" iconBg="#d9e5df" iconColor="#006a43" title="Gut-Heart Link" subtitle="Nutrition tip" body="Adding 25g of soluble fiber daily has been shown to reduce LDL cholesterol by up to 10% within 6 weeks of consistent intake." cta="View Meal Suggestions" cardWidth={TIP_CARD_WIDTH} />
            </ScrollView>
          </FadeSlideIn>

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContainer}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tabItem}
                onPress={() => handleTabPress(tab.name)}
                activeOpacity={0.7}
              >
                <View style={[styles.tabActivePill, isActive && styles.tabActivePillVisible]} />
                <MaterialIcons
                  name={tab.icon as any}
                  size={24}
                  color={isActive ? "#006a43" : "#8c9b91"}
                />
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#effcf5" },

  // Header
  header: {
    height: 56,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgba(239,252,245,0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(27,94,67,0.06)",
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 1024,
    gap: 8,
  },
  headerLogo: { width: 28, height: 28, borderRadius: 14 },
  headerTitle: {
    fontSize: 18,
    fontFamily: "cindel",
    fontWeight: "700",
  },
  headerRe: {
    color: "#006a43",
  },
  headerVitalize: {
    color: "#131e1a",
  },

  // Scroll
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 80 },
  contentContainer: { width: "100%", maxWidth: 1024, alignSelf: "center" },

  // Greeting
  greetingRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", marginBottom: 16,
  },
  greetingText: { flex: 1 },
  greetingTitle: { fontSize: 22, fontWeight: "700", color: "#131e1a", letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 13, color: "#3e4941", marginTop: 2 },
  avatarWrapper: { position: "relative" },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  avatarStatus: {
    position: "absolute", bottom: 0, right: 0,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: "#008655", borderWidth: 2, borderColor: "#effcf5",
  },

  // Heart check card
  highlightCard: {
    borderRadius: 20, overflow: "hidden",
    backgroundColor: "#006a43", marginBottom: 20, position: "relative",
  },
  pulseRing1: {
    position: "absolute", right: -40, top: -40,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  pulseRing2: {
    position: "absolute", right: -10, top: -10,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  highlightInner: { padding: 20, gap: 10 },
  highlightRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  vitalsHubBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 999,
  },
  vitalsHubText: { fontSize: 11, fontWeight: "600", color: "#aef1cd", letterSpacing: 0.5 },
  lastCheckBadge: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
  },
  lastCheckDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#aef1cd" },
  lastCheckText: { fontSize: 11, color: "#aef1cd" },
  highlightTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  highlightTitle: { fontSize: 18, fontWeight: "700", color: "#ffffff" },
  highlightBody: { fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 19 },
  checkButton: {
    backgroundColor: "#ffffff", borderRadius: 14,
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 13, gap: 6, marginTop: 4,
  },
  checkButtonText: { fontSize: 14, fontWeight: "600", color: "#006a43" },

  // Section header
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#131e1a" },
  sectionSubtitle: { fontSize: 12, color: "#3e4941", marginTop: 2 },
  seeAllBtn: { flexDirection: "row", alignItems: "center" },
  seeAllText: { fontSize: 12, fontWeight: "600", color: "#006a43" },

  // Vitals grid
  vitalsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 },
  vitalCard: {
    flexBasis: "48%", flexGrow: 1, minWidth: 140,
    backgroundColor: "#ffffff", borderRadius: 16,
    shadowColor: "#006a43", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  vitalCardInner: { padding: 14, gap: 8 },
  vitalCardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  vitalIconBox: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  vitalIcon: { fontSize: 20 },
  vitalTag: {
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 999, backgroundColor: "#eaf7f0", borderWidth: 1,
  },
  vitalTagText: { fontSize: 11, fontWeight: "600" },
  addButton: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "#e4f1ea", alignItems: "center", justifyContent: "center",
  },
  vitalCardBody: { gap: 3 },
  vitalLabel: { fontSize: 11, fontWeight: "500", color: "#3e4941", letterSpacing: 0.3 },
  vitalValueRow: { flexDirection: "row", alignItems: "baseline", gap: 3 },
  vitalValue: { fontSize: 26, fontWeight: "700", color: "#131e1a", lineHeight: 32 },
  vitalUnit: { fontSize: 11, fontWeight: "500", color: "#3e4941" },
  progressTrack: {
    width: "100%", height: 5, backgroundColor: "#e4f1ea",
    borderRadius: 3, overflow: "hidden", marginTop: 4,
  },
  progressFill: { height: "100%", backgroundColor: "#006a43", borderRadius: 3 },
  vitalNote: { fontSize: 11, color: "#3e4941", marginTop: 2 },

  // Tips
  tipDots: { flexDirection: "row", alignItems: "center", gap: 4 },
  tipDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#d0ddd6" },
  tipDotActive: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#006a43" },
  tipsScroll: { gap: 12, paddingRight: 20, marginBottom: 4 },
  tipCard: {
    width: Math.min(width - 48, 1024),
    backgroundColor: "#ffffff", borderRadius: 16, padding: 18,
    shadowColor: "#006a43", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
  },
  tipCardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  tipIconBox: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  tipIconText: { fontSize: 18 },
  tipCardHeaderText: { flex: 1 },
  tipTitle: { fontSize: 14, fontWeight: "700", color: "#131e1a" },
  tipSubtitle: { fontSize: 11, color: "#296a4e", marginTop: 1 },
  tipBody: { fontSize: 13, color: "#3e4941", lineHeight: 20, marginBottom: 8 },
  tipCta: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "#eaf7f0", paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 10,
  },
  tipCtaText: { fontSize: 11, fontWeight: "600", color: "#006a43" },

  // Bottom nav
  bottomNav: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: 64,
    backgroundColor: "rgba(239,252,245,0.97)",
    alignItems: "center", justifyContent: "center",
    borderTopWidth: 1, borderTopColor: "rgba(27,94,67,0.06)",
    shadowColor: "#006a43", shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06, shadowRadius: 16, elevation: 8,
  },
  tabActivePill: {
    height: 3,
    width: 28,
    borderRadius: 2,
    backgroundColor: "transparent",
    marginBottom: 2,
  },
  tabActivePillVisible: {
    backgroundColor: "#006a43",
  },
  bottomNavContainer: {
    flexDirection: "row", width: "100%", maxWidth: 1024,
    alignItems: "center", justifyContent: "space-around",
  },
  tabItem: {
    flex: 1, alignItems: "center", justifyContent: "center",
    paddingTop: 8, paddingBottom: 4, gap: 2,
  },
  tabLabel: { fontSize: 11, fontWeight: "500", color: "#8c9b91", letterSpacing: 0.2 },
  tabLabelActive: { color: "#006a43", fontWeight: "700" },
});