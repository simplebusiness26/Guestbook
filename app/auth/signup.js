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

const [accountType,setAccountType]=useState("");



async function signup(){


if(!accountType){

console.log("Choose account type");

return;

}



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

email:email,

account_type:accountType

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



<Text style={styles.label}>
I am a:
</Text>



<Pressable

style={
accountType==="guest"
?
styles.selected
:
styles.option
}

onPress={()=>
setAccountType("guest")
}

>

<Text>
👤 Guest
</Text>

</Pressable>



<Pressable

style={
accountType==="business"
?
styles.selected
:
styles.option
}

onPress={()=>
setAccountType("business")
}

>

<Text>
🏪 Business Owner
</Text>

</Pressable>



<Pressable

style={
accountType==="host"
?
styles.selected
:
styles.option
}

onPress={()=>
setAccountType("host")
}

>

<Text>
🏠 Property Host
</Text>

</Pressable>



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

label:{
fontSize:18,
marginTop:10,
marginBottom:10
},

option:{
borderWidth:1,
padding:15,
borderRadius:10,
marginBottom:10
},

selected:{
borderWidth:2,
padding:15,
borderRadius:10,
marginBottom:10
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