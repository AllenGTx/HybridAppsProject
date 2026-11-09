import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
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
import { AuthHeader } from "../components/auth/AuthHeader";

const googleIcon = require("../../assets/google_icon.png");

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
  }>({});

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
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
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

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Repeat password</Text>
              <TextInput
                style={[styles.input, errors.repeatPassword ? styles.inputError : null]}
                placeholder="••••••••••••••••"
                placeholderTextColor="#C7C7CC"
                secureTextEntry
                value={repeatPassword}
                onChangeText={(text) => {
                  setRepeatPassword(text);
                  if (errors.repeatPassword) {
                    setErrors((prev) => ({ ...prev, repeatPassword: undefined }));
                  }
                }}
              />
              {errors.repeatPassword && (
                <Text style={styles.errorText}>{errors.repeatPassword}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.85}
              onPress={handleRegister}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? "Creating account..." : "Sign up"}
              </Text>
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
});
