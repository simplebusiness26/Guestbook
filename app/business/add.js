import React,{useState} from "react";

import {
View,
Text,
TextInput,
Pressable,
StyleSheet
} from "react-native";

import {supabase} from "../../services/supabase";

import {router} from "expo-router";


export default function AddBusiness(){


const [name,setName]=useState("");

const [category,setCategory]=useState("");

const [description,setDescription]=useState("");

const [address,setAddress]=useState("");

const [website,setWebsite]=useState("");

const [phone,setPhone]=useState("");

const [openingHours,setOpeningHours]=useState("");

const [latitude,setLatitude]=useState("");

const [longitude,setLongitude]=useState("");



async function addBusiness(){


const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

return;

}



const {error}=await supabase

.from("businesses")

.insert({

name,

category,

description,

address,

website,

phone,

opening_hours:openingHours,

latitude:Number(latitude),

longitude:Number(longitude),

owner_id:user.id,

claimed:true

});



if(error){

console.log(error);

return;

}



router.back();


}



return(

<View style={styles.container}>


<Text style={styles.title}>
Add Business
</Text>



<TextInput
style={styles.input}
placeholder="Business Name"
value={name}
onChangeText={setName}
/>



<TextInput
style={styles.input}
placeholder="Category (Pub, Cafe, Restaurant)"
value={category}
onChangeText={setCategory}
/>



<TextInput
style={styles.input}
placeholder="Description"
value={description}
onChangeText={setDescription}
/>



<TextInput
style={styles.input}
placeholder="Address"
value={address}
onChangeText={setAddress}
/>



<TextInput
style={styles.input}
placeholder="Website"
value={website}
onChangeText={setWebsite}
/>



<TextInput
style={styles.input}
placeholder="Phone"
value={phone}
onChangeText={setPhone}
/>



<TextInput
style={styles.input}
placeholder="Opening Hours"
value={openingHours}
onChangeText={setOpeningHours}
/>



<TextInput
style={styles.input}
placeholder="Latitude"
value={latitude}
onChangeText={setLatitude}
/>



<TextInput
style={styles.input}
placeholder="Longitude"
value={longitude}
onChangeText={setLongitude}
/>



<Pressable

style={styles.button}

onPress={addBusiness}

>

<Text style={styles.buttonText}>
Create Business Listing
</Text>

</Pressable>



</View>

);

}



const styles=StyleSheet.create({

container:{
padding:20
},

title:{
fontSize:30,
fontWeight:"bold",
marginBottom:20
},

input:{
borderWidth:1,
padding:15,
borderRadius:10,
marginBottom:15
},

button:{
backgroundColor:"#222",
padding:15,
borderRadius:10
},

buttonText:{
color:"white",
textAlign:"center"
}

});