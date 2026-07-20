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


const [property,setProperty]=useState(null);

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



const {data:claim,error}=await supabase

.from("claims")

.select("*")

.eq("user_id",user.id)

.eq("status","approved")

.single();



if(error || !claim){

setStatus("No approved property claim");

return;

}



setStatus("Approved");



const {data,error:propertyError}=await supabase

.from("properties")

.select("*")

.eq("id",claim.property_id)

.single();



if(propertyError){

console.log(propertyError);

return;

}



setProperty(data);


}



return(

<View style={styles.container}>


<Text style={styles.title}>
Property Dashboard
</Text>



<Text>
Status: {status}
</Text>



{property &&

<>


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

onPress={()=>router.push("/property/edit")}

>

<Text style={styles.buttonText}>
Edit Property
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

<Pressable

style={styles.button}

onPress={()=>router.push("/property/add")}

>

<Text style={styles.buttonText}>
➕ Add Property Listing
</Text>

</Pressable>

</>

}



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

name:{
fontSize:25,
fontWeight:"bold",
marginTop:20
},

heading:{
fontSize:20,
fontWeight:"bold",
marginTop:30,
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