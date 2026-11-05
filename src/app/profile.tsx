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

const profileImg = require("../../assets/Profile.jpg");

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Tombol navigasi atas */}
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

      {/* Info profil utama: nama, email, dan foto */}
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

      {/* Banner membership VitalizePlus+ */}
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
});
