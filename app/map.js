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


const {data:businessData,error:businessError}=await supabase
.from("businesses")
.select("*");


const {data:propertyData,error:propertyError}=await supabase
.from("properties")
.select("*");


if(businessError){
console.log("Business error:",businessError);
}


if(propertyError){
console.log("Property error:",propertyError);
}


setBusinesses(businessData || []);

setProperties(propertyData || []);


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


{businesses.map(place=>{

if(!place.latitude || !place.longitude){
return null;
}


return(

<Marker

key={`business-${place.id}`}

coordinate={{
latitude:place.latitude,
longitude:place.longitude
}}

title={place.name}

description={place.category || "Local place"}

onCalloutPress={()=>
router.push(`/business/${place.id}`)
}

/>

)

})}




{properties.map(property=>{

if(!property.latitude || !property.longitude){
return null;
}


return(

<Marker

key={`property-${property.id}`}

coordinate={{
latitude:property.latitude,
longitude:property.longitude
}}

title={property.name}

description="Airbnb Stay"

pinColor="blue"

onCalloutPress={()=>
router.push(`/property/${property.id}`)
}

/>

)

})}



</MapView>

);

}



const styles=StyleSheet.create({

map:{
flex:1
}

});