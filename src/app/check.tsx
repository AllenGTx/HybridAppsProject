import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
  Easing,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Animasi transisi halus saat beralih antar langkah
function FadeInView({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}) {
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(12));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 320,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start();
  }, [delay, opacity, translateY]);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}

// Opsi rentang usia pengguna
const AGE_CATEGORIES = [
  "18-24",
  "25-29",
  "30-34",
  "35-39",
  "40-44",
  "45-49",
  "50-54",
  "55-59",
  "60-64",
  "65-69",
  "70-74",
  "75-79",
  "80+",
];

// Opsi riwayat merokok
const SMOKING_OPTIONS = [
  { id: 0, label: "Never Smoked", desc: "Smoke-free lifestyle" },
  { id: 1, label: "Former Smoker", desc: "Quit completely" },
  { id: 2, label: "Occasional", desc: "Smoke only occasionally" },
  { id: 3, label: "Daily Smoker", desc: "Regular daily smoker" },
];

export default function CheckScreen() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // State biometrik dasar
  const [name, setName] = useState("Alex Pratama");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [ageIndex, setAgeIndex] = useState(2);
  const [height, setHeight] = useState("172");
  const [weight, setWeight] = useState("68");

  // State gaya hidup
  const [smoking, setSmoking] = useState(0);
  const [activity, setActivity] = useState<"Yes" | "No">("Yes");
  const [alcohol, setAlcohol] = useState<"Yes" | "No">("No");

  // State riwayat medis klinis
  const [highBp, setHighBp] = useState<"Yes" | "No">("No");
  const [highChol, setHighChol] = useState<"Yes" | "No">("No");
  const [diabetes, setDiabetes] = useState<"Yes" | "No">("No");
  const [stroke, setStroke] = useState<"Yes" | "No">("No");
  const [angina, setAngina] = useState<"Yes" | "No">("No");
  const [diffWalk, setDiffWalk] = useState<"Yes" | "No">("No");
  const [copd, setCopd] = useState<"Yes" | "No">("No");
  const [kidney, setKidney] = useState<"Yes" | "No">("No");

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Perhitungan otomatis BMI
  const heightMeters = parseFloat(height) / 100;
  const weightKg = parseFloat(weight);
  const bmiValue =
    heightMeters > 0 && weightKg > 0
      ? (weightKg / (heightMeters * heightMeters)).toFixed(1)
      : "0.0";

  // Penentuan kategori BMI berdasarkan standar WHO
  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "#d97706" };
    if (bmi < 25) return { label: "Optimal", color: "#006a43" };
    if (bmi < 30) return { label: "Overweight", color: "#ea580c" };
    return { label: "Obese", color: "#dc2626" };
  };

  const bmiStatus = getBmiStatus(parseFloat(bmiValue));

  // Simulasi kalkulasi penilaian risiko
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(4);
    }, 1200);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header Halaman */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Cardio Risk Screening</Text>
        <Text style={styles.headerSubtitle}>
          Answer a few quick questions to evaluate your cardiovascular risk profile.
        </Text>
      </View>

      {/* Indikator Langkah Form */}
      {step < 4 && (
        <View style={styles.stepTabs}>
          {[
            { no: 1, label: "Physical & BMI" },
            { no: 2, label: "Lifestyle" },
            { no: 3, label: "Medical History" },
          ].map((item) => {
            const isActive = step === item.no;
            const isDone = step > item.no;
            return (
              <TouchableOpacity
                key={item.no}
                onPress={() => item.no < step && setStep(item.no as any)}
                activeOpacity={0.8}
                style={[
                  styles.stepTabItem,
                  isActive && styles.stepTabItemActive,
                  isDone && styles.stepTabItemDone,
                ]}
              >
                <View
                  style={[
                    styles.stepBadge,
                    isActive && styles.stepBadgeActive,
                    isDone && styles.stepBadgeDone,
                  ]}
                >
                  {isDone ? (
                    <MaterialIcons name="check" size={13} color="#ffffff" />
                  ) : (
                    <Text
                      style={[
                        styles.stepBadgeNumber,
                        isActive && styles.stepBadgeNumberActive,
                      ]}
                    >
                      {item.no}
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepTabLabel,
                    isActive && styles.stepTabLabelActive,
                    isDone && styles.stepTabLabelDone,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Langkah 1: Biometrik Fisik */}
      {step === 1 && (
        <FadeInView delay={40}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Personal Biometrics</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Biological Sex</Text>
              <View style={styles.toggleRow}>
                {[
                  { key: "Male", label: "Male", icon: "male" },
                  { key: "Female", label: "Female", icon: "female" },
                ].map((g) => (
                  <TouchableOpacity
                    key={g.key}
                    onPress={() => setGender(g.key as any)}
                    style={[
                      styles.toggleBtn,
                      gender === g.key && styles.toggleBtnActive,
                    ]}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons
                      name={g.icon as any}
                      size={18}
                      color={gender === g.key ? "#006a43" : "#64748b"}
                    />
                    <Text
                      style={[
                        styles.toggleBtnText,
                        gender === g.key && styles.toggleBtnTextActive,
                      ]}
                    >
                      {g.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <View style={styles.labelRowBetween}>
                <Text style={styles.fieldLabel}>Age Category</Text>
                <Text style={styles.accentText}>{AGE_CATEGORIES[ageIndex]} years old</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
              >
                {AGE_CATEGORIES.map((cat, idx) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setAgeIndex(idx)}
                    style={[
                      styles.chipItem,
                      ageIndex === idx && styles.chipItemActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        ageIndex === idx && styles.chipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.twoColRow}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.fieldLabel}>Height (cm)</Text>
                <TextInput
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="172"
                />
              </View>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.fieldLabel}>Weight (kg)</Text>
                <TextInput
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="68"
                />
              </View>
            </View>

            {/* Banner BMI Real-time */}
            <View style={styles.bmiCard}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.bmiCardTitle}>Body Mass Index (BMI)</Text>
                <Text style={styles.bmiCardSub}>Calculated automatically for risk weighting</Text>
              </View>
              <View style={{ alignItems: "flex-end", gap: 3 }}>
                <Text style={styles.bmiNumber}>{bmiValue}</Text>
                <View style={[styles.bmiPill, { backgroundColor: bmiStatus.color + "16" }]}>
                  <Text style={[styles.bmiPillText, { color: bmiStatus.color }]}>
                    {bmiStatus.label}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setStep(2)}
              style={styles.btnPrimary}
              activeOpacity={0.85}
            >
              <Text style={styles.btnPrimaryText}>Next: Lifestyle Habits</Text>
              <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </FadeInView>
      )}

      {/* Langkah 2: Gaya Hidup */}
      {step === 2 && (
        <FadeInView delay={40}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Daily Lifestyle Habits</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Smoking Status</Text>
              <View style={{ gap: 8 }}>
                {SMOKING_OPTIONS.map((opt) => {
                  const isSelected = smoking === opt.id;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      onPress={() => setSmoking(opt.id)}
                      style={[styles.radioItem, isSelected && styles.radioItemActive]}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                        {isSelected && <View style={styles.radioDot} />}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.radioTitle, isSelected && styles.radioTitleActive]}>
                          {opt.label}
                        </Text>
                        <Text style={styles.radioSub}>{opt.desc}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Regular Physical Activity?</Text>
              <Text style={styles.helperText}>
                At least 150 minutes of moderate exercise or brisk walking per week
              </Text>
              <View style={styles.toggleRow}>
                {[
                  { key: "Yes", label: "Active", icon: "directions-run" },
                  { key: "No", label: "Mostly Inactive", icon: "weekend" },
                ].map((act) => (
                  <TouchableOpacity
                    key={act.key}
                    onPress={() => setActivity(act.key as any)}
                    style={[
                      styles.toggleBtn,
                      activity === act.key && styles.toggleBtnActive,
                    ]}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons
                      name={act.icon as any}
                      size={18}
                      color={activity === act.key ? "#006a43" : "#64748b"}
                    />
                    <Text
                      style={[
                        styles.toggleBtnText,
                        activity === act.key && styles.toggleBtnTextActive,
                      ]}
                    >
                      {act.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Alcohol Consumption?</Text>
              <View style={styles.toggleRow}>
                {[
                  { key: "No", label: "None / Occasional" },
                  { key: "Yes", label: "Regular" },
                ].map((alc) => (
                  <TouchableOpacity
                    key={alc.key}
                    onPress={() => setAlcohol(alc.key as any)}
                    style={[
                      styles.toggleBtn,
                      alcohol === alc.key && styles.toggleBtnActive,
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.toggleBtnText,
                        alcohol === alc.key && styles.toggleBtnTextActive,
                      ]}
                    >
                      {alc.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.navRow}>
              <TouchableOpacity
                onPress={() => setStep(1)}
                style={styles.btnSecondary}
                activeOpacity={0.8}
              >
                <MaterialIcons name="arrow-back" size={18} color="#006a43" />
                <Text style={styles.btnSecondaryText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setStep(3)}
                style={[styles.btnPrimary, { flex: 1 }]}
                activeOpacity={0.85}
              >
                <Text style={styles.btnPrimaryText}>Next: Medical History</Text>
                <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </FadeInView>
      )}

      {/* Langkah 3: Riwayat Medis */}
      {step === 3 && (
        <FadeInView delay={40}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Medical Background</Text>
            <Text style={styles.helperText}>
              Select any conditions you have been diagnosed with or experience.
            </Text>

            <View style={{ gap: 10 }}>
              {[
                {
                  label: "High Blood Pressure?",
                  sub: "Diagnosed hypertension or prescribed BP medication",
                  val: highBp,
                  set: setHighBp,
                },
                {
                  label: "High Cholesterol?",
                  sub: "Elevated total cholesterol or on statin therapy",
                  val: highChol,
                  set: setHighChol,
                },
                {
                  label: "Diagnosed Diabetes?",
                  sub: "Type 1, Type 2, or high blood glucose management",
                  val: diabetes,
                  set: setDiabetes,
                },
                {
                  label: "Prior Stroke / TIA?",
                  sub: "History of stroke or transient ischemic attack",
                  val: stroke,
                  set: setStroke,
                },
                {
                  label: "Chest Pain / Angina?",
                  sub: "Tightness or chest pressure during physical exertion",
                  val: angina,
                  set: setAngina,
                },
                {
                  label: "Difficulty Walking Stairs?",
                  sub: "Shortness of breath on mild physical exertion",
                  val: diffWalk,
                  set: setDiffWalk,
                },
                {
                  label: "Chronic Lung Condition (COPD)?",
                  sub: "Chronic bronchitis, emphysema, or persistent asthma",
                  val: copd,
                  set: setCopd,
                },
                {
                  label: "Kidney Disease History?",
                  sub: "Reduced renal function or chronic kidney diagnosis",
                  val: kidney,
                  set: setKidney,
                },
              ].map((item, idx) => (
                <View key={idx} style={styles.clinicalRow}>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.clinicalTitle}>{item.label}</Text>
                    <Text style={styles.clinicalSub}>{item.sub}</Text>
                  </View>
                  <View style={styles.switchGroup}>
                    <TouchableOpacity
                      onPress={() => item.set("No")}
                      style={[
                        styles.switchBtn,
                        item.val === "No" && styles.switchBtnNoActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.switchBtnText,
                          item.val === "No" && styles.switchBtnTextNoActive,
                        ]}
                      >
                        No
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => item.set("Yes")}
                      style={[
                        styles.switchBtn,
                        item.val === "Yes" && styles.switchBtnYesActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.switchBtnText,
                          item.val === "Yes" && styles.switchBtnTextYesActive,
                        ]}
                      >
                        Yes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            <View style={[styles.navRow, { marginTop: 16 }]}>
              <TouchableOpacity
                onPress={() => setStep(2)}
                style={styles.btnSecondary}
                activeOpacity={0.8}
              >
                <MaterialIcons name="arrow-back" size={18} color="#006a43" />
                <Text style={styles.btnSecondaryText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAnalyze}
                disabled={isAnalyzing}
                style={[styles.btnPrimary, { flex: 1 }]}
                activeOpacity={0.85}
              >
                {isAnalyzing ? (
                  <>
                    <MaterialIcons name="sync" size={18} color="#ffffff" />
                    <Text style={styles.btnPrimaryText}>Evaluating Profile...</Text>
                  </>
                ) : (
                  <>
                    <MaterialIcons name="health-and-safety" size={18} color="#ffffff" />
                    <Text style={styles.btnPrimaryText}>Calculate Risk Profile</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </FadeInView>
      )}

      {/* Langkah 4: Tampilan Hasil Penilaian */}
      {step === 4 && (
        <FadeInView delay={40}>
          <View style={styles.resultHighlightCard}>
            <View style={styles.resultHeader}>
              <View>
                <Text style={styles.resultTag}>Assessment Result</Text>
                <Text style={styles.resultPatientName}>{name}</Text>
              </View>
              <View style={styles.riskBadge}>
                <View style={styles.riskBadgeDot} />
                <Text style={styles.riskBadgeText}>Low Risk</Text>
              </View>
            </View>

            <View style={styles.scoreBox}>
              <Text style={styles.scoreNumber}>12.4%</Text>
              <Text style={styles.scoreLabel}>Estimated 10-Year Cardiovascular Risk</Text>
              <Text style={styles.scoreDesc}>
                Your risk estimate is within the optimal range. Current biometrics and lifestyle choices indicate strong cardiovascular resilience.
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>BMI</Text>
                <Text style={styles.summaryVal}>{bmiValue}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Smoking</Text>
                <Text style={styles.summaryVal}>{SMOKING_OPTIONS[smoking].label}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Activity</Text>
                <Text style={styles.summaryVal}>{activity === "Yes" ? "Active" : "Sedentary"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <MaterialIcons name="auto-awesome" size={20} color="#006a43" />
              <Text style={styles.cardTitle}>Clinical Insights</Text>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={styles.insightSectionHeader}>Protective Factors</Text>
              <View style={styles.bulletItem}>
                <MaterialIcons name="check-circle" size={16} color="#006a43" style={{ marginTop: 2 }} />
                <Text style={styles.bulletText}>
                  <Text style={{ fontWeight: "700" }}>Healthy Body Weight: </Text>
                  A BMI of {bmiValue} reduces mechanical and metabolic stress on your cardiac muscle.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <MaterialIcons name="check-circle" size={16} color="#006a43" style={{ marginTop: 2 }} />
                <Text style={styles.bulletText}>
                  <Text style={{ fontWeight: "700" }}>Physical Movement: </Text>
                  Consistent weekly activity supports arterial wall elasticity and helps normalize resting blood pressure.
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 14 }}>
              <Text style={styles.insightSectionHeader}>Actionable Guidance</Text>
              <View style={styles.recommendationBox}>
                <Text style={styles.recommendationText}>
                  Maintain sufficient hydration, prioritize dietary fiber from whole vegetables and oats, and complete a routine blood pressure check once a year.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setStep(1)}
              style={[styles.btnSecondary, { marginTop: 16 }]}
              activeOpacity={0.8}
            >
              <MaterialIcons name="refresh" size={18} color="#006a43" />
              <Text style={styles.btnSecondaryText}>Retake Assessment</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimerText}>
              This screening provides an educational risk estimate and does not replace professional medical diagnosis, advice, or treatment from a physician.
            </Text>
          </View>
        </FadeInView>
      )}

      {/* Footer Bersih Sesuai Permintaan */}
      <View style={styles.footerNote}>
        <Text style={styles.footerNoteText}>Powered by Cardio-check engine</Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#effcf5" },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 64 },

  headerSection: {
    paddingHorizontal: 4,
    paddingTop: 4,
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#131e1a",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#475569",
    marginTop: 4,
    lineHeight: 18,
  },

  stepTabs: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(27,94,67,0.08)",
  },
  stepTabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
  },
  stepTabItemActive: { backgroundColor: "#ffffff", elevation: 1 },
  stepTabItemDone: {},
  stepBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  stepBadgeActive: { backgroundColor: "#006a43" },
  stepBadgeDone: { backgroundColor: "#10b981" },
  stepBadgeNumber: { fontSize: 11, fontWeight: "700", color: "#64748b" },
  stepBadgeNumberActive: { color: "#ffffff" },
  stepTabLabel: { fontSize: 11, fontWeight: "500", color: "#64748b" },
  stepTabLabelActive: { fontWeight: "700", color: "#131e1a" },
  stepTabLabelDone: { color: "#006a43" },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(27,94,67,0.07)",
    shadowColor: "#006a43",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 14,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#131e1a", marginBottom: 12 },

  fieldGroup: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, fontWeight: "600", color: "#374151", marginBottom: 6 },
  labelRowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  accentText: { fontSize: 12, fontWeight: "700", color: "#006a43" },
  helperText: { fontSize: 11, color: "#6b7280", marginBottom: 8, lineHeight: 16 },

  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111827",
  },

  toggleRow: { flexDirection: "row", gap: 8 },
  toggleBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  toggleBtnActive: {
    backgroundColor: "#edf9f2",
    borderColor: "#a7f3d0",
  },
  toggleBtnText: { fontSize: 12, fontWeight: "500", color: "#475569" },
  toggleBtnTextActive: { fontWeight: "700", color: "#006a43" },

  chipsRow: { gap: 6, paddingVertical: 4 },
  chipItem: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
  },
  chipItemActive: { backgroundColor: "#006a43" },
  chipText: { fontSize: 11, fontWeight: "600", color: "#475569" },
  chipTextActive: { color: "#ffffff" },

  twoColRow: { flexDirection: "row", gap: 10 },

  bmiCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  bmiCardTitle: { fontSize: 12, fontWeight: "700", color: "#166534" },
  bmiCardSub: { fontSize: 10, color: "#15803d", marginTop: 1 },
  bmiNumber: { fontSize: 20, fontWeight: "800", color: "#166534" },
  bmiPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  bmiPillText: { fontSize: 10, fontWeight: "700" },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },
  radioItemActive: {
    backgroundColor: "#edf9f2",
    borderColor: "#86efac",
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#94a3b8",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleActive: { borderColor: "#006a43" },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#006a43" },
  radioTitle: { fontSize: 12, fontWeight: "600", color: "#1e293b" },
  radioTitleActive: { color: "#006a43" },
  radioSub: { fontSize: 10, color: "#64748b", marginTop: 1 },

  clinicalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  clinicalTitle: { fontSize: 12, fontWeight: "600", color: "#1f2937" },
  clinicalSub: { fontSize: 10, color: "#6b7280", marginTop: 1 },
  switchGroup: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  switchBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  switchBtnNoActive: { backgroundColor: "#ffffff" },
  switchBtnYesActive: { backgroundColor: "#ef4444" },
  switchBtnText: { fontSize: 11, fontWeight: "600", color: "#64748b" },
  switchBtnTextNoActive: { color: "#1e293b" },
  switchBtnTextYesActive: { color: "#ffffff" },

  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#006a43",
    paddingVertical: 13,
    borderRadius: 14,
    shadowColor: "#006a43",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  btnPrimaryText: { fontSize: 13, fontWeight: "700", color: "#ffffff" },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: "#e6f4ed",
  },
  btnSecondaryText: { fontSize: 13, fontWeight: "600", color: "#006a43" },
  navRow: { flexDirection: "row", gap: 10 },

  resultHighlightCard: {
    backgroundColor: "#006a43",
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
    shadowColor: "#00482d",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  resultTag: { fontSize: 11, fontWeight: "600", color: "#aef1cd", letterSpacing: 0.3 },
  resultPatientName: { fontSize: 18, fontWeight: "800", color: "#ffffff", marginTop: 2 },
  riskBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  riskBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#6ee7b7" },
  riskBadgeText: { fontSize: 11, fontWeight: "700", color: "#ffffff" },

  scoreBox: {
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    marginBottom: 16,
  },
  scoreNumber: { fontSize: 44, fontWeight: "800", color: "#ffffff", letterSpacing: -1 },
  scoreLabel: { fontSize: 11, color: "#d1fae5", fontWeight: "600", marginTop: 2 },
  scoreDesc: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 6,
    paddingHorizontal: 8,
  },

  summaryRow: { flexDirection: "row", justifyContent: "space-around" },
  summaryItem: { alignItems: "center" },
  summaryLabel: { fontSize: 10, color: "#aef1cd", fontWeight: "500" },
  summaryVal: { fontSize: 12, color: "#ffffff", fontWeight: "700", marginTop: 2 },

  insightSectionHeader: { fontSize: 12, fontWeight: "700", color: "#006a43" },
  bulletItem: { flexDirection: "row", gap: 6, alignItems: "flex-start" },
  bulletText: { flex: 1, fontSize: 12, color: "#374151", lineHeight: 18 },
  recommendationBox: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#006a43",
  },
  recommendationText: { fontSize: 12, color: "#374151", lineHeight: 18 },
  disclaimerText: {
    fontSize: 10,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 15,
    marginTop: 14,
  },

  footerNote: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  footerNoteText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#839589",
    letterSpacing: 0.2,
  },
});
