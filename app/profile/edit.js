import React,{useEffect,useState} from "react";

import {
View,
Text,
TextInput,
Pressable,
StyleSheet
} from "react-native";

import {supabase} from "../../services/supabase";

import {router} from "expo-router";


export default function EditProfile(){


const [name,setName]=useState("");

const [bio,setBio]=useState("");



useEffect(()=>{

loadProfile();

},[]);



async function loadProfile(){


const {
data:{
user
}
}=await supabase.auth.getUser();



const {data}=await supabase

.from("profiles")

.select("*")

.eq("id",user.id)

.single();



if(data){

setName(data.full_name || "");

setBio(data.bio || "");

}


}



async function saveProfile(){


const {
data:{
user
}
}=await supabase.auth.getUser();



const {error}=await supabase

.from("profiles")

.update({

full_name:name,

bio:bio

})

.eq("id",user.id);



if(error){

console.log(error);

return;

}


router.back();


}



return(

<View style={styles.container}>


<Text style={styles.title}>
Edit Profile
</Text>



<TextInput

style={styles.input}

placeholder="Name"

value={name}

onChangeText={setName}

/>



<TextInput

style={styles.input}

placeholder="Bio about you"

value={bio}

onChangeText={setBio}

/>



<Pressable

style={styles.button}

onPress={saveProfile}

>

<Text style={styles.text}>
Save Profile
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

text:{
color:"white",
textAlign:"center"
}

});