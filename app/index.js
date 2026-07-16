import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to Guestbook
      </Text>

      <Text style={styles.subtitle}>
        Discover the best places around your stay
      </Text>

      <Text style={styles.map}>
        🗺️ Map coming soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "bold"
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16
  },

  map: {
    marginTop: 40,
    fontSize: 20
  }
});