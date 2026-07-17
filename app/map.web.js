import React,{useEffect,useState} from "react";
import {
View,
Text,
StyleSheet,
Pressable
} from "react-native";

import {router} from "expo-router";
import {supabase} from "../services/supabase";


export default function MapScreen(){

const [businesses,setBusinesses]=useState([]);
const [properties,setProperties]=useState([]);



useEffect(()=>{

loadPlaces();

},[]);



async function loadPlaces(){

const businessesResult =
await supabase
.from("businesses")
.select("*");


const propertiesResult =
await supabase
.from("properties")
.select("*");


setBusinesses(businessesResult.data || []);

setProperties(propertiesResult.data || []);

}



return(

<View style={styles.container}>


<Text style={styles.title}>
🗺️ Guestbook Map
</Text>


<Text style={styles.section}>
Local Places
</Text>


{businesses.map(place=>(

<Pressable

key={place.id}

style={styles.card}

onPress={()=>
router.push(`/business/${place.id}`)
}

>

<Text>
📍 {place.name}
</Text>

<Text>
{place.category}
</Text>

</Pressable>

))}



<Text style={styles.section}>
Airbnb Stays
</Text>



{properties.map(property=>(

<Pressable

key={property.id}

style={styles.card}

onPress={()=>
router.push(`/property/${property.id}`)
}

>

<Text>
🏠 {property.property_name}
</Text>

<Text>
{property.address}
</Text>

</Pressable>

))}


</View>

);

}



const styles=StyleSheet.create({

container:{
padding:20
},

title:{
fontSize:28,
fontWeight:"bold"
},

section:{
fontSize:22,
marginTop:20,
marginBottom:10
},

card:{
borderWidth:1,
borderRadius:10,
padding:15,
marginBottom:10
}

});