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
            <MaterialIcons name="settings" size={20} color="#1e293b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info profil utama: nama, email, dan foto */}
      <View style={styles.profileHeader}>
        <View style={styles.userTextInfo}>
          <Text style={styles.userName}>Alex Pratama</Text>
          <Text style={styles.userEmail}>alex.pratama@email.com</Text>
          <Text style={styles.joinText}>Joined Re:Vitalize for 12 days</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={profileImg} style={styles.avatar} resizeMode="cover" />
        </View>
      </View>
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
});
