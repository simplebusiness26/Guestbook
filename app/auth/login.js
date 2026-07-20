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


export default function Login(){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [error,setError]=useState("");



async function login(){


const {data,error}=await supabase.auth.signInWithPassword({

email,

password

});



if(error){

setError(error.message);

return;

}



router.replace("/");


}



return(

<View style={styles.container}>


<Text style={styles.title}>
Login
</Text>



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



{error !== "" &&

<Text style={styles.error}>
{error}
</Text>

}



<Pressable

style={styles.button}

onPress={login}

>

<Text style={styles.buttonText}>
Login
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
fontSize:32,
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
},

error:{
color:"red",
marginBottom:10
}

});