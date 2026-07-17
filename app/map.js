import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";
import { supabase } from "../services/supabase";


export default function MapScreen(){

const [businesses,setBusinesses]=useState([]);
const [properties,setProperties]=useState([]);


useEffect(()=>{

loadPlaces();

},[]);



async function loadPlaces(){

const businessesResult = await supabase
.from("businesses")
.select("*");


const propertiesResult = await supabase
.from("properties")
.select("*");


setBusinesses(businessesResult.data || []);

setProperties(propertiesResult.data || []);

}



return(

<MapView

style={styles.map}

initialRegion={{
latitude:50.8225,
longitude:-0.1372,
latitudeDelta:0.05,
longitudeDelta:0.05
}}

>


{businesses.map(place=>(

<Marker

key={`business-${place.id}`}

coordinate={{
latitude:place.latitude,
longitude:place.longitude
}}

title={place.name}

description={place.category}

onCalloutPress={()=>
router.push(`/business/${place.id}`)
}

/>

))}



{properties.map(property=>(

<Marker

key={`property-${property.id}`}

coordinate={{
latitude:property.latitude,
longitude:property.longitude
}}

title={property.property_name}

description="Airbnb Stay"

pinColor="blue"

onCalloutPress={()=>
router.push(`/property/${property.id}`)
}

/>

))}


</MapView>

);

}



const styles=StyleSheet.create({

map:{
flex:1
}

});