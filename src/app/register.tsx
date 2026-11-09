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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
  }>({});

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      repeatPassword?: string;
    } = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      newErrors.name = "Name is required";
    } else if (trimmedName.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
      if (!gmailRegex.test(trimmedEmail)) {
        newErrors.email = "Email must end with @gmail.com";
      }
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

    if (!repeatPassword) {
      newErrors.repeatPassword = "Please confirm your password";
    } else if (repeatPassword !== password) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    setOtp("");
    setOtpError("");
    setShowOtpModal(true);
  };

  const handleVerifyOtp = () => {
    if (otp.trim().length !== 6) {
      setOtpError("Please enter the 6-character code");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowOtpModal(false);
      router.replace("/home");
    }, 600);
  };

  const handleGoogleRegister = () => {
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
            title={"Create your\naccount"}
            subtitle={"Join Re: Vitalize and start\nyour healthy living today!"}
            compact
          />

          <View style={styles.formContainer}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.input, errors.name ? styles.inputError : null]}
                placeholder="John Doe"
                placeholderTextColor="#C7C7CC"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                autoCorrect={false}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="john@gmail.com"
                placeholderTextColor="#C7C7CC"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.passwordInputContainer,
                  errors.password ? styles.inputError : null,
                ]}
              >
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••••••••••"
                  placeholderTextColor="#C7C7CC"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  activeOpacity={0.7}
                  style={styles.eyeIconBtn}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Repeat password</Text>
              <View
                style={[
                  styles.passwordInputContainer,
                  errors.repeatPassword ? styles.inputError : null,
                ]}
              >
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••••••••••"
                  placeholderTextColor="#C7C7CC"
                  secureTextEntry={!showRepeatPassword}
                  value={repeatPassword}
                  onChangeText={(text) => {
                    setRepeatPassword(text);
                    if (errors.repeatPassword) {
                      setErrors((prev) => ({ ...prev, repeatPassword: undefined }));
                    }
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  activeOpacity={0.7}
                  style={styles.eyeIconBtn}
                >
                  <MaterialIcons
                    name={showRepeatPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
              {errors.repeatPassword && (
                <Text style={styles.errorText}>{errors.repeatPassword}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.85}
              onPress={handleRegister}
            >
              <Text style={styles.submitButtonText}>Sign up</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or use</Text>

            <TouchableOpacity
              style={styles.googleButton}
              activeOpacity={0.85}
              onPress={handleGoogleRegister}
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
              <Text style={styles.footerText}>Already have an account? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.footerLink}>Sign in</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={showOtpModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOtpModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <MaterialIcons name="mark-email-read" size={32} color="#006A43" />
            </View>
            <Text style={styles.modalTitle}>Enter OTP Code</Text>
            <Text style={styles.modalDesc}>
              An OTP code has been sent to your email. Please enter the 6-character code below to continue.
            </Text>

            <View style={styles.otpInputWrapper}>
              <TextInput
                style={[styles.otpInput, otpError ? styles.inputError : null]}
                placeholder="123456"
                placeholderTextColor="#C7C7CC"
                value={otp}
                onChangeText={(text) => {
                  setOtp(text);
                  if (otpError) setOtpError("");
                }}
                maxLength={6}
                autoCapitalize="characters"
                autoCorrect={false}
              />
              {otpError ? <Text style={styles.errorTextCenter}>{otpError}</Text> : null}
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              activeOpacity={0.85}
              onPress={handleVerifyOtp}
            >
              <Text style={styles.modalButtonText}>
                {isVerifying ? "Verifying..." : "Verify & Continue"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowOtpModal(false)}
              style={styles.cancelModalBtn}
            >
              <Text style={styles.cancelModalText}>Cancel</Text>
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
    paddingTop: 18,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6E747C",
    marginBottom: 6,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF0",
    fontSize: 15,
    color: "#2C333A",
    paddingVertical: 6,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF0",
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#2C333A",
    paddingVertical: 6,
  },
  eyeIconBtn: {
    paddingLeft: 8,
    paddingRight: 4,
    justifyContent: "center",
    alignItems: "center",
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
  errorTextCenter: {
    fontSize: 11,
    color: "#EF4444",
    marginTop: 6,
    fontWeight: "500",
    textAlign: "center",
  },
  submitButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E59572",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
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
    marginVertical: 14,
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
    marginTop: 22,
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
    paddingVertical: 26,
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
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#131E1A",
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 13,
    color: "#5B636E",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 16,
  },
  otpInputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  otpInput: {
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: "#006A43",
    fontSize: 22,
    fontWeight: "700",
    color: "#131E1A",
    letterSpacing: 6,
    textAlign: "center",
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
  cancelModalBtn: {
    marginTop: 14,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  cancelModalText: {
    fontSize: 13,
    color: "#8D949E",
    fontWeight: "600",
  },
});
