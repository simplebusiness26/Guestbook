import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
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


    if (error) {
      console.log(error);
      return;
    }


    setPlaces(data);

  }


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        🗺️ Guestbook Map
      </Text>


      <FlatList

        data={places}

        keyExtractor={(item)=>item.id}

        renderItem={({item})=>(

          <View style={styles.card}>

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text>
              {item.category}
            </Text>

          </View>

        )}

      />


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
marginBottom:20
},

card:{
padding:15,
borderWidth:1,
borderRadius:10,
marginBottom:10
},

name:{
fontSize:20,
fontWeight:"bold"
}

});