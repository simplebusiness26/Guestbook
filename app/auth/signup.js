import React, {useState} from "react";

import {
View,
Text,
TextInput,
Pressable,
StyleSheet,
ScrollView,
Alert,
ActivityIndicator
} from "react-native";

import {router} from "expo-router";

import {supabase} from "../../services/supabase";


const ACCOUNT_TYPES=[
{
value:"guest",
label:"Guest",
desc:"Explore & review local places"
},
{
value:"business",
label:"Business Owner",
desc:"List and manage your business"
},
{
value:"host",
label:"Property Host",
desc:"List your Airbnb / rental"
}
];


export default function Signup(){


const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [accountType,setAccountType]=useState("");

const [loading,setLoading]=useState(false);



async function signup(){


if(!name || !email || !password){

Alert.alert(
"Missing information",
"Please complete all fields"
);

return;

}



if(!accountType){

Alert.alert(
"Choose account type",
"Please select an account type"
);

return;

}



try{


setLoading(true);


console.log("Starting signup");



const {
data,
error
}=await supabase.auth.signUp({

email:email.trim(),

password

});



console.log("Auth result",data,error);



if(error){

throw error;

}



if(!data.user){

setLoading(false);

Alert.alert(
"Email verification required",
"Please check your email and verify your account before logging in."
);

return;

}



const {
error:profileError
}=await supabase

.from("profiles")

.upsert({

id:data.user.id,

full_name:name,

email:email.trim(),

account_type:accountType

});



console.log("Profile error",profileError);



if(profileError){

throw profileError;

}



setLoading(false);



Alert.alert(
"Account created",
"Welcome to Guestbook"
);



if(accountType==="business"){

router.replace("/business/dashboard");

}
else if(accountType==="host"){

router.replace("/property/dashboard");

}
else{

router.replace("/");

}



}

catch(error){


console.log("Signup failed",error);


setLoading(false);


Alert.alert(
"Signup failed",
error.message || "Something went wrong"
);


}


}



return(

<ScrollView

contentContainerStyle={styles.container}

>


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

autoCapitalize="none"

keyboardType="email-address"

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



{
ACCOUNT_TYPES.map(type=>(


<Pressable

key={type.value}

style={[

styles.option,

accountType===type.value && styles.selected

]}

onPress={()=>setAccountType(type.value)}

>


<Text style={styles.optionTitle}>
{type.label}
</Text>


<Text>
{type.desc}
</Text>


</Pressable>


))
}



<Pressable

style={styles.button}

onPress={signup}

disabled={loading}

>


{
loading

?

<ActivityIndicator color="white"/>

:

<Text style={styles.buttonText}>
Create Account
</Text>

}


</Pressable>


</ScrollView>

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
marginBottom:10
},

option:{
borderWidth:1,
borderRadius:10,
padding:15,
marginBottom:10
},

selected:{
borderWidth:2,
backgroundColor:"#ddd"
},

optionTitle:{
fontWeight:"bold",
fontSize:16
},

button:{
backgroundColor:"#222",
padding:16,
borderRadius:10,
marginTop:20,
alignItems:"center"
},

buttonText:{
color:"white",
fontWeight:"bold"
}

});