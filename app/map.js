import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../services/supabase";


export default function MapScreen(){

const [places,setPlaces] = useState([]);


useEffect(()=>{

loadPlaces();

},[]);



async function loadPlaces(){

const {data,error}=await supabase
.from("businesses")
.select("*");


if(error){

console.log(error);
return;

}


setPlaces(data);

}



return(

<View style={styles.container}>


<MapView

style={styles.map}

initialRegion={{

latitude:50.8225,

longitude:-0.1372,

latitudeDelta:0.03,

longitudeDelta:0.03

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


</View>

);

}



const styles=StyleSheet.create({

container:{
flex:1
},

map:{
flex:1
}

});