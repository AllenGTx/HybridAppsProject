import React from "react";
import { Platform, StyleSheet, View, useWindowDimensions } from "react-native";

interface MobileFrameProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export function MobileFrame({
  children,
  backgroundColor = "#effcf5",
}: MobileFrameProps) {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === "web" && width >= 500;

  if (!isDesktop) {
    return <View style={[styles.mobileFull, { backgroundColor }]}>{children}</View>;
  }

  return (
    <View style={styles.desktopBackdrop}>
      <View style={[styles.phoneContainer, { backgroundColor }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mobileFull: {
    flex: 1,
    width: "100%",
  },
  desktopBackdrop: {
    flex: 1,
    backgroundColor: "#DDE7E1",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  phoneContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 420,
    maxHeight: 880,
    borderRadius: 36,
    overflow: "hidden",
    shadowColor: "#0F291E",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
    shadowRadius: 32,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
});
