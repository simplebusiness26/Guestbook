import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
Pressable
} from "react-native";

import {supabase} from "../services/supabase";

import {router} from "expo-router";


export default function Profile(){


const [profile,setProfile]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{

loadProfile();

},[]);



async function loadProfile(){


const {
data:{
user
}

}=await supabase.auth.getUser();



if(!user){

setLoading(false);

return;

}



const {
data,
error

}=await supabase

.from("profiles")

.select("*")

.eq("id",user.id)

.single();



if(error){

console.log(error);

setLoading(false);

return;

}



setProfile(data);

setLoading(false);


}



async function logout(){


await supabase.auth.signOut();


router.replace("/");


}



if(loading){

return(

<View style={styles.container}>

<Text>
Loading profile...
</Text>

</View>

);

}



if(!profile){

return(

<View style={styles.container}>

<Text style={styles.title}>
No profile found
</Text>


<Pressable

style={styles.button}

onPress={()=>router.push("/auth/login")}

>

<Text style={styles.buttonText}>
Login
</Text>

</Pressable>


</View>

);

}



return(

<View style={styles.container}>


<Text style={styles.title}>
My Profile
</Text>



<View style={styles.card}>


<Text style={styles.label}>
Name
</Text>

<Text style={styles.value}>
{profile.full_name || "No name"}
</Text>



<Text style={styles.label}>
Email
</Text>

<Text style={styles.value}>
{profile.email}
</Text>



<Text style={styles.label}>
Account Type
</Text>

<Text style={styles.value}>
{
profile.account_type === "business"
?
"🏪 Business Owner"
:
profile.account_type === "host"
?
"🏠 Property Host"
:
"👤 Guest"
}
</Text>



<Text style={styles.label}>
Bio
</Text>

<Text style={styles.value}>
{profile.bio || "No bio added yet"}
</Text>



</View>



<Pressable

style={styles.button}

onPress={()=>{

if(profile.account_type==="business"){

router.push("/business/dashboard");

}

else if(profile.account_type==="host"){

router.push("/property/dashboard");

}

else{

router.push("/map");

}

}}

>

<Text style={styles.buttonText}>
Open Dashboard
</Text>

</Pressable>



<Pressable

style={styles.logout}

onPress={logout}

>

<Text style={styles.logoutText}>
Logout
</Text>

</Pressable>



</View>

);

}



const styles=StyleSheet.create({

container:{
flex:1,
padding:30
},


title:{
fontSize:32,
fontWeight:"bold",
marginBottom:25
},


card:{
borderWidth:1,
borderRadius:12,
padding:20
},


label:{
fontSize:14,
color:"#777",
marginTop:15
},


value:{
fontSize:18,
marginTop:5
},


button:{
backgroundColor:"#222",
padding:16,
borderRadius:10,
marginTop:25
},


buttonText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
},


logout:{
backgroundColor:"#cc0000",
padding:16,
borderRadius:10,
marginTop:15
},


logoutText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
}


});