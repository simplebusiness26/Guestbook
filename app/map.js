import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
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

    <MapView

      style={styles.map}

      initialRegion={{
        latitude:50.8225,
        longitude:-0.1372,
        latitudeDelta:0.05,
        longitudeDelta:0.05
      }}

    >

      {places.map((place)=>(

        <Marker

          key={place.id}

          coordinate={{
            latitude:place.latitude,
            longitude:place.longitude
          }}

          title={place.name}

          description={place.category}

          onCalloutPress={() =>
            router.push(`/business/${place.id}`)
          }

        />

      ))}


    </MapView>

  );

}


const styles = StyleSheet.create({

map:{
flex:1
}

});