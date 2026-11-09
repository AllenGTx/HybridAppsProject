import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthHeader } from "../components/auth/AuthHeader";

const googleIcon = require("../../assets/google_icon.png");

export default function LoginScreen() {
  const [emailOrName, setEmailOrName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ emailOrName?: string; password?: string }>({});
  const [showForgotModal, setShowForgotModal] = useState(false);

  const validate = () => {
    const newErrors: { emailOrName?: string; password?: string } = {};
    const trimmed = emailOrName.trim();

    if (!trimmed) {
      newErrors.emailOrName = "Name or email is required";
    } else if (trimmed.includes("@")) {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
      if (!gmailRegex.test(trimmed)) {
        newErrors.emailOrName = "Email must end with @gmail.com";
      }
    } else if (trimmed.length < 3) {
      newErrors.emailOrName = "Name must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/\d/.test(password)) {
      newErrors.password = "Password must contain at least 1 number";
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
      newErrors.password = "Password must contain at least 1 special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = () => {
    const trimmed = emailOrName.trim();
    if (!trimmed) {
      setErrors((prev) => ({
        ...prev,
        emailOrName: "Please enter your name or email first to reset password",
      }));
      return;
    }

    if (trimmed.includes("@")) {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
      if (!gmailRegex.test(trimmed)) {
        setErrors((prev) => ({
          ...prev,
          emailOrName: "Email must end with @gmail.com",
        }));
        return;
      }
    } else if (trimmed.length < 3) {
      setErrors((prev) => ({
        ...prev,
        emailOrName: "Name must be at least 3 characters",
      }));
      return;
    }

    setShowForgotModal(true);
  };

  const handleLogin = () => {
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/home");
    }, 600);
  };

  const handleGoogleLogin = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader
            title={"Login to your\naccount"}
            subtitle={"Welcome back to your\ndaily wellness journey!"}
          />

          <View style={styles.formContainer}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Name / Email</Text>
              <TextInput
                style={[styles.input, errors.emailOrName ? styles.inputError : null]}
                placeholder="John Doe or john@gmail.com"
                placeholderTextColor="#C7C7CC"
                value={emailOrName}
                onChangeText={(text) => {
                  setEmailOrName(text);
                  if (errors.emailOrName) {
                    setErrors((prev) => ({ ...prev, emailOrName: undefined }));
                  }
                }}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.emailOrName && (
                <Text style={styles.errorText}>{errors.emailOrName}</Text>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleForgotPassword}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.forgotText}>Forgot?</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={[styles.input, errors.password ? styles.inputError : null]}
                placeholder="••••••••••••••••"
                placeholderTextColor="#C7C7CC"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.85}
              onPress={handleLogin}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? "Logging in..." : "Log in"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or use</Text>

            <TouchableOpacity
              style={styles.googleButton}
              activeOpacity={0.85}
              onPress={handleGoogleLogin}
            >
              <View style={styles.googleIconWrap}>
                <Image
                  source={googleIcon}
                  style={styles.googleIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.googleButtonText}>Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don&apos;t have an account? </Text>
              <Link href="/register" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={showForgotModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowForgotModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <MaterialIcons name="mark-email-read" size={32} color="#006a43" />
            </View>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <Text style={styles.modalDesc}>
              A password reset link has been sent to your email.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              activeOpacity={0.85}
              onPress={() => setShowForgotModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 32,
    paddingTop: 22,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6E747C",
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 12,
    color: "#B0B5BC",
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 42,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF0",
    fontSize: 15,
    color: "#2C333A",
    paddingVertical: 8,
  },
  inputError: {
    borderBottomColor: "#EF4444",
  },
  errorText: {
    fontSize: 11,
    color: "#EF4444",
    marginTop: 4,
    fontWeight: "500",
  },
  submitButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E59572",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#E59572",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  orText: {
    textAlign: "center",
    color: "#B0B5BC",
    fontSize: 12,
    fontWeight: "500",
    marginVertical: 18,
  },
  googleButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#B5ADC2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  googleIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  googleIconImage: {
    width: 22,
    height: 22,
  },
  googleButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  footerText: {
    fontSize: 12,
    color: "#A6ACB4",
  },
  footerLink: {
    fontSize: 12,
    color: "#8D949E",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(19, 30, 26, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E4F7ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#131E1A",
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 14,
    color: "#5B636E",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 22,
  },
  modalButton: {
    width: "100%",
    height: 46,
    backgroundColor: "#006A43",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
