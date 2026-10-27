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
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
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
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#C7C7CC"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••••••"
                placeholderTextColor="#C7C7CC"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Repeat password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••••••"
                placeholderTextColor="#C7C7CC"
                secureTextEntry
                value={repeatPassword}
                onChangeText={setRepeatPassword}
              />
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
    marginBottom: 22,
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
    marginVertical: 16,
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
    marginTop: 26,
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
