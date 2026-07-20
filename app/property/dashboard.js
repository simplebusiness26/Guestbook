import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
Pressable
} from "react-native";

import {supabase} from "../../services/supabase";

import {router} from "expo-router";

import QRCodeGenerator from "../../components/QRCodeGenerator";


export default function PropertyDashboard(){


const [properties,setProperties]=useState([]);

const [status,setStatus]=useState("Loading...");



useEffect(()=>{

loadDashboard();

},[]);



async function loadDashboard(){


const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

setStatus("Please login");

return;

}



const {data,error}=await supabase

.from("properties")

.select("*")

.eq("owner_id",user.id);



if(error){

console.log(error);

setStatus("Error loading properties");

return;

}



if(data && data.length > 0){

setProperties(data);

setStatus("Your Properties");

}else{

setStatus("No property listings yet");

}


}



return(

<View style={styles.container}>


<Text style={styles.title}>
Property Dashboard
</Text>



<Text>
Status: {status}
</Text>



{properties.map(property=>(


<View

key={property.id}

style={styles.card}

>


<Text style={styles.name}>
{property.name}
</Text>


<Text>
Host: {property.host}
</Text>



<Text style={styles.heading}>
Guest Review QR Code
</Text>



<QRCodeGenerator

propertyId={property.id}

/>



<Pressable

style={styles.button}

onPress={()=>router.push(`/property/${property.id}`)}

>

<Text style={styles.buttonText}>
View Public Profile
</Text>

</Pressable>



<Pressable

style={styles.button}

onPress={()=>router.push("/property/reviews")}

>

<Text style={styles.buttonText}>
Manage Reviews
</Text>

</Pressable>



</View>


))}



<Pressable

style={styles.button}

onPress={()=>router.push("/property/add")}

>

<Text style={styles.buttonText}>
➕ Add Property Listing
</Text>

</Pressable>



</View>

);

}



const styles=StyleSheet.create({

container:{
padding:30
},

title:{
fontSize:30,
fontWeight:"bold"
},

card:{
borderWidth:1,
borderRadius:10,
padding:15,
marginTop:20
},

name:{
fontSize:25,
fontWeight:"bold",
marginTop:10
},

heading:{
fontSize:20,
fontWeight:"bold",
marginTop:20,
marginBottom:15
},

button:{
backgroundColor:"#222",
padding:15,
borderRadius:10,
marginTop:20
},

buttonText:{
color:"white",
textAlign:"center"
}

});