import React, { useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { healthTipsData, HealthTip } from "../data/healthTipsData";

const dokter1Img = require("../../assets/images/Dokter 1.webp");
const dokter2Img = require("../../assets/images/Dokter 2.webp");
const dokter3Img = require("../../assets/images/Dokter 3.webp");

export default function DetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const tipId = params.id || "mindful-breathing";

  const tip: HealthTip =
    healthTipsData.find((item) => item.id === tipId) || healthTipsData[0];

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPracticed, setIsPracticed] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showSourceModal, setShowSourceModal] = useState(false);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const handleOpenBrowser = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(url);
      }
    } catch {
      await Linking.openURL(url);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/home");
    }
  };

  const doctorPhoto =
    tip.doctorNote.imageKey === "dokter3"
      ? dokter3Img
      : tip.doctorNote.imageKey === "dokter2"
      ? dokter2Img
      : dokter1Img;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <MaterialIcons name="chevron-left" size={32} color="#131E1A" />
        </TouchableOpacity>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{tip.category}</Text>
        </View>

        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => setIsBookmarked(!isBookmarked)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={isBookmarked ? "bookmark" : "bookmark-border"}
            size={24}
            color={isBookmarked ? "#006A43" : "#6E747C"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={[styles.heroIconBox, { backgroundColor: tip.iconBg }]}>
            <Text style={styles.heroIcon}>{tip.icon}</Text>
          </View>
          <Text style={styles.heroTitle}>{tip.title}</Text>
          <View style={styles.heroMetaRow}>
            <View style={styles.readTimeBadge}>
              <MaterialIcons name="schedule" size={14} color="#006A43" />
              <Text style={styles.readTimeText}>{tip.readTime}</Text>
            </View>
            <Text style={styles.heroSubtitle}>{tip.subtitle}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>{tip.summary}</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <MaterialIcons name="favorite" size={20} color="#006A43" />
            <Text style={styles.sectionTitle}>Why It Works for Heart Health</Text>
          </View>
          <Text style={styles.mechanismText}>{tip.whyItWorks.mechanism}</Text>

          <View style={styles.cardioImpactBox}>
            <Text style={styles.cardioImpactTitle}>Cardiovascular Impact:</Text>
            <Text style={styles.cardioImpactText}>{tip.whyItWorks.cardioImpact}</Text>
          </View>

          <View style={styles.metricPill}>
            <MaterialIcons name="check-circle" size={16} color="#006A43" />
            <Text style={styles.metricPillText}>{tip.whyItWorks.clinicalMetric}</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <MaterialIcons name="format-list-numbered" size={20} color="#006A43" />
            <Text style={styles.sectionTitle}>Actionable Steps</Text>
          </View>
          <Text style={styles.stepsIntro}>
            Tap each step once completed to track your progress today:
          </Text>

          {tip.steps.map((step) => {
            const isDone = completedSteps.includes(step.stepNumber);
            return (
              <TouchableOpacity
                key={step.stepNumber}
                style={[styles.stepItem, isDone && styles.stepItemDone]}
                activeOpacity={0.8}
                onPress={() => toggleStep(step.stepNumber)}
              >
                <View style={[styles.stepCheckCircle, isDone && styles.stepCheckCircleDone]}>
                  {isDone ? (
                    <MaterialIcons name="check" size={16} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
                  )}
                </View>
                <View style={styles.stepTextContent}>
                  <Text style={[styles.stepTitle, isDone && styles.stepTitleDone]}>
                    {step.title}
                  </Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.doctorCard}>
          <View style={styles.doctorHeader}>
            <Image source={doctorPhoto} style={styles.doctorAvatar} resizeMode="cover" />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{tip.doctorNote.doctorName}</Text>
              <Text style={styles.doctorSpecialty}>{tip.doctorNote.specialty}</Text>
              <Text style={styles.doctorHospital}>{tip.doctorNote.hospital}</Text>
            </View>
          </View>
          <View style={styles.doctorQuoteBox}>
            <MaterialIcons name="format-quote" size={20} color="#006A43" style={styles.quoteIcon} />
            <Text style={styles.doctorQuoteText}>{tip.doctorNote.quote}</Text>
          </View>
        </View>

        <View style={styles.sourceBannerCard}>
          <View style={styles.sourceBannerHeader}>
            <MaterialIcons name="verified" size={22} color="#006A43" />
            <Text style={styles.sourceBannerTitle}>Verified Clinical Reference</Text>
          </View>
          <Text style={styles.sourceBannerPublisher}>
            Source: {tip.officialSource.publisher} ({tip.officialSource.year})
          </Text>
          <Text style={styles.sourceBannerDesc} numberOfLines={2}>
            {tip.officialSource.title}
          </Text>
          <TouchableOpacity
            style={styles.openSourceBtn}
            activeOpacity={0.85}
            onPress={() => setShowSourceModal(true)}
          >
            <MaterialIcons name="article" size={18} color="#FFFFFF" />
            <Text style={styles.openSourceBtnText}>Read Official Article & Source</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.practicedButton, isPracticed && styles.practicedButtonActive]}
          activeOpacity={0.85}
          onPress={() => setIsPracticed(!isPracticed)}
        >
          <MaterialIcons
            name={isPracticed ? "check-circle" : "check"}
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.practicedButtonText}>
            {isPracticed ? "Practiced Today ✓" : "Mark as Practiced"}
          </Text>
        </TouchableOpacity>
      </View>

      {showSourceModal && (
        <View style={styles.inFrameModalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            activeOpacity={1}
            onPress={() => setShowSourceModal(false)}
          />
          <View style={styles.inFrameModalCard}>
            <View style={styles.modalNotch} />

            <View style={styles.modalHeader}>
              <View style={styles.modalSourceBadge}>
                <MaterialIcons name="verified" size={15} color="#006A43" />
                <Text style={styles.modalSourceBadgeText}>Official Scientific Literature</Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setShowSourceModal(false)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialIcons name="close" size={20} color="#6E747C" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.modalArticleTitle}>{tip.officialSource.title}</Text>

              <View style={styles.modalMetaCard}>
                <View style={styles.modalMetaRow}>
                  <Text style={styles.modalMetaLabel}>Publisher / Journal:</Text>
                  <Text style={styles.modalMetaVal}>{tip.officialSource.publisher}</Text>
                </View>
                <View style={styles.modalMetaRow}>
                  <Text style={styles.modalMetaLabel}>Publication Year:</Text>
                  <Text style={styles.modalMetaVal}>{tip.officialSource.year}</Text>
                </View>
                <View style={styles.modalMetaRow}>
                  <Text style={styles.modalMetaLabel}>Citation / Reference:</Text>
                  <Text style={styles.modalMetaVal}>{tip.officialSource.citation}</Text>
                </View>
              </View>

              <Text style={styles.modalSectionHeading}>Summary of Scientific Findings</Text>
              <Text style={styles.modalSummaryBody}>{tip.officialSource.summary}</Text>

              <View style={styles.modalUrlBox}>
                <Text style={styles.modalUrlLabel}>Direct Source URL:</Text>
                <Text style={styles.modalUrlText} numberOfLines={2}>
                  {tip.officialSource.url}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalExternalLinkBtn}
                activeOpacity={0.85}
                onPress={() => handleOpenBrowser(tip.officialSource.url)}
              >
                <MaterialIcons name="open-in-browser" size={18} color="#FFFFFF" />
                <Text style={styles.modalExternalLinkBtnText}>
                  Open Official Article in Browser
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFCF5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "#EFFCF5",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 106, 67, 0.08)",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#D9F5E6",
    borderRadius: 14,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#006A43",
  },
  bookmarkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  heroIconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#006A43",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  heroIcon: {
    fontSize: 34,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#131E1A",
    textAlign: "center",
    marginBottom: 6,
  },
  heroMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  readTimeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  readTimeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#006A43",
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#6E747C",
  },
  summaryCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#006A43",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#2C333A",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#131E1A",
  },
  mechanismText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#4A5568",
    marginBottom: 12,
  },
  cardioImpactBox: {
    backgroundColor: "#F7FAFC",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EDF2F7",
    marginBottom: 12,
  },
  cardioImpactTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 4,
  },
  cardioImpactText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#4A5568",
  },
  metricPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E4F7ED",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  metricPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#006A43",
  },
  stepsIntro: {
    fontSize: 13,
    color: "#718096",
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F5",
  },
  stepItemDone: {
    opacity: 0.65,
  },
  stepCheckCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  stepCheckCircleDone: {
    backgroundColor: "#006A43",
  },
  stepNumberText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4A5568",
  },
  stepTextContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#131E1A",
    marginBottom: 2,
  },
  stepTitleDone: {
    textDecorationLine: "line-through",
    color: "#718096",
  },
  stepDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: "#4A5568",
  },
  doctorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  doctorHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#131E1A",
  },
  doctorSpecialty: {
    fontSize: 12,
    color: "#006A43",
    fontWeight: "600",
    marginTop: 1,
  },
  doctorHospital: {
    fontSize: 11,
    color: "#718096",
    marginTop: 1,
  },
  doctorQuoteBox: {
    flexDirection: "row",
    backgroundColor: "#F4FAF6",
    padding: 12,
    borderRadius: 12,
    gap: 6,
  },
  quoteIcon: {
    marginTop: -2,
  },
  doctorQuoteText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: "#2C333A",
    fontStyle: "italic",
  },
  sourceBannerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D9F5E6",
    marginBottom: 20,
  },
  sourceBannerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  sourceBannerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#006A43",
  },
  sourceBannerPublisher: {
    fontSize: 12,
    fontWeight: "600",
    color: "#718096",
    marginBottom: 4,
  },
  sourceBannerDesc: {
    fontSize: 13,
    color: "#2C333A",
    marginBottom: 12,
  },
  openSourceBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#006A43",
    height: 44,
    borderRadius: 22,
  },
  openSourceBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  practicedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#E59572",
    height: 50,
    borderRadius: 25,
  },
  practicedButtonActive: {
    backgroundColor: "#006A43",
  },
  practicedButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  inFrameModalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(19, 30, 26, 0.65)",
    justifyContent: "flex-end",
    zIndex: 999,
  },
  modalBackdropDismiss: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inFrameModalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: "88%",
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 20,
    zIndex: 1000,
  },
  modalNotch: {
    width: 44,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalSourceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E4F7ED",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  modalSourceBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#006A43",
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {
    paddingBottom: 24,
  },
  modalArticleTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#131E1A",
    lineHeight: 24,
    marginBottom: 12,
  },
  modalMetaCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    gap: 6,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  modalMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  modalMetaLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    width: 110,
  },
  modalMetaVal: {
    flex: 1,
    fontSize: 11,
    color: "#1E293B",
    fontWeight: "700",
    textAlign: "right",
  },
  modalSectionHeading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#131E1A",
    marginBottom: 6,
  },
  modalSummaryBody: {
    fontSize: 13,
    lineHeight: 20,
    color: "#334155",
    marginBottom: 14,
  },
  modalUrlBox: {
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 18,
  },
  modalUrlLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 2,
  },
  modalUrlText: {
    fontSize: 12,
    color: "#006A43",
    fontWeight: "600",
  },
  modalExternalLinkBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#006A43",
    height: 48,
    borderRadius: 24,
  },
  modalExternalLinkBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
