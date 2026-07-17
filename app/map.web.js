import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { supabase } from "../services/supabase";


export default function MapScreen() {

  const [places, setPlaces] = useState([]);


  useEffect(() => {
    loadPlaces();
  }, []);


  async function loadPlaces() {

    const { data, error } = await supabase
      .from("businesses")
      .select("*");


    if(error){
      console.log(error);
      return;
    }


    setPlaces(data);

  }


  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        🗺️ Guestbook Map Preview
      </Text>


      <Text style={styles.subtitle}>
        Local places
      </Text>


      {places.map((place)=>(

        <Pressable

          key={place.id}

          style={styles.card}

          onPress={() =>
            router.push(`/business/${place.id}`)
          }

        >

          <Text style={styles.name}>
            📍 {place.name}
          </Text>

          <Text>
            {place.category}
          </Text>


        </Pressable>

      ))}


    </View>

  );

}


const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

title:{
fontSize:28,
fontWeight:"bold",
marginBottom:10
},

subtitle:{
fontSize:18,
marginBottom:20
},

card:{
padding:15,
borderWidth:1,
borderRadius:10,
marginBottom:15
},

name:{
fontSize:18,
fontWeight:"bold"
}

});