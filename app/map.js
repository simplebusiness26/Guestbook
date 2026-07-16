import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MapScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Guestbook Map
      </Text>

      <Text style={styles.text}>
        🏡 Airbnbs
      </Text>

      <Text style={styles.text}>
        ☕ Cafes
      </Text>

      <Text style={styles.text}>
        🍺 Pubs
      </Text>

      <Text style={styles.text}>
        🍽 Restaurants
      </Text>

      <Text style={styles.text}>
        🌳 Parks
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  title:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:30
  },

  text:{
    fontSize:20,
    margin:8
  }

});