import React, {useState} from "react";

import {
View,
Text,
TextInput,
Pressable,
StyleSheet
} from "react-native";

import {supabase} from "../../services/supabase";

import {router} from "expo-router";


export default function Signup(){


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [name,setName]=useState("");



async function signup(){


const {data,error}=await supabase.auth.signUp({

email,

password

});



if(error){

console.log(error);

return;

}



await supabase

.from("profiles")

.insert({

id:data.user.id,

full_name:name,

email:email

});



router.replace("/");


}



return(

<View style={styles.container}>


<Text style={styles.title}>
Create Account
</Text>



<TextInput

style={styles.input}

placeholder="Name"

value={name}

onChangeText={setName}

/>



<TextInput

style={styles.input}

placeholder="Email"

value={email}

onChangeText={setEmail}

/>



<TextInput

style={styles.input}

placeholder="Password"

secureTextEntry

value={password}

onChangeText={setPassword}

/>



<Pressable

style={styles.button}

onPress={signup}

>

<Text style={styles.buttonText}>
Sign Up
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
marginBottom:30
},

input:{
borderWidth:1,
borderRadius:10,
padding:15,
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