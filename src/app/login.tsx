import React, { useState } from "react";
const googleIcon = require("../../assets/google_icon.png");
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import BrandName from "../components/BrandName";

function GoogleIcon() {
  return <Image source={googleIcon} style={styles.googleIconImage} resizeMode="contain" />;
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [buttonScale] = useState(() => new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(buttonScale, { toValue: 0.97, useNativeDriver: true, friction: 8 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true, friction: 8 }).start();
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/home");
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.outerWrapper}>
          <View style={styles.innerCard}>

            {/* ── Brand Header (Re:Vitalize) ── */}
            <BrandName />

            {/* ── Card ── */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.welcomeTitle}>Welcome Back</Text>
                  <Text style={styles.welcomeSubtitle}>Sign in to continue</Text>
                </View>
                <View style={styles.shieldIcon}>
                  <MaterialIcons name="verified-user" size={18} color="#006a43" />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputWrapper}>
                <MaterialIcons name="mail-outline" size={18} color="#296a4e" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email address"
                  placeholderTextColor="#6e7a71"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password */}
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock-outline" size={18} color="#296a4e" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, styles.passwordInput]}
                  placeholder="Password"
                  placeholderTextColor="#6e7a71"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                  <MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={18} color="#6e7a71" />
                </TouchableOpacity>
              </View>

              {/* Remember / Forgot */}
              <View style={styles.rememberRow}>
                <TouchableOpacity style={styles.rememberLabel} onPress={() => setRememberMe(!rememberMe)} activeOpacity={0.7}>
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <MaterialIcons name="check" size={12} color="#ffffff" />}
                  </View>
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              {/* Sign In button */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleLogin}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  activeOpacity={1}
                >
                  <Text style={styles.signInButtonText}>{isLoading ? "Signing in..." : "Sign In"}</Text>
                  {!isLoading && <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />}
                </TouchableOpacity>
              </Animated.View>

              {/* Separator */}
              <View style={styles.separatorRow}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>OR</Text>
                <View style={styles.separatorLine} />
              </View>

              {/* Google button */}
              <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
                <GoogleIcon />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>

            {/* ── Footer ── */}
            <View style={styles.footer}>
              <View style={styles.encryptionNote}>
                <MaterialIcons name="health-and-safety" size={14} color="#006a43" />
                <Text style={styles.encryptionText}>End-to-end encrypted & secure</Text>
              </View>
              <View style={styles.signUpRow}>
                <Text style={styles.signUpPrompt}>{"Don't have an account?"}</Text>
                <TouchableOpacity>
                  <Text style={styles.signUpLink}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#effcf5",
  },
  keyboardView: {
    flex: 1,
  },
  outerWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  innerCard: {
    width: "100%",
    maxWidth: 420,
  },

  // ── Card ──
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    gap: 10,
    shadowColor: "#006a43",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  welcomeTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1b3a2a",
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: "#6e7a71",
    marginTop: 1,
  },
  shieldIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e4f1ea",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Inputs ──
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e4f1ea",
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#1b3a2a",
  },
  passwordInput: {
    letterSpacing: 1,
  },
  eyeButton: {
    padding: 4,
  },

  // ── Remember / Forgot ──
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: "#c4dfd2",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#006a43",
  },
  rememberText: {
    fontSize: 12,
    color: "#3e4941",
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: "600",
    color: "#006a43",
  },

  // ── Sign In Button ──
  signInButton: {
    height: 46,
    backgroundColor: "#006a43",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#006a43",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  signInButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.2,
  },

  // ── Separator ──
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 2,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#deebe4",
  },
  separatorText: {
    fontSize: 10,
    color: "#6e7a71",
    letterSpacing: 2,
    fontWeight: "600",
  },

  // ── Google Button ──
  googleButton: {
    height: 44,
    backgroundColor: "#f8fcfa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#deebe4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3e4941",
  },
  googleIconImage: {
    width: 22,
    height: 22,
  },

  // ── Footer ──
  footer: {
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  encryptionNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  encryptionText: {
    fontSize: 11,
    color: "#6e7a71",
  },
  signUpRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpPrompt: {
    fontSize: 13,
    color: "#3e4941",
  },
  signUpLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#006a43",
  },
});