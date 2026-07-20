import React, {useEffect, useState} from "react";

import {
View,
Text,
StyleSheet
} from "react-native";

import {supabase} from "../services/supabase";


export default function Profile(){

const [profile,setProfile]=useState(null);



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

return;

}



const {data,error}=await supabase

.from("profiles")

.select("*")

.eq("id",user.id)

.single();



if(error){

console.log(error);

return;

}


setProfile(data);


}



if(!profile){

return <Text>Loading profile...</Text>;

}



return(

<View style={styles.container}>


<Text style={styles.title}>
Profile
</Text>


<Text style={styles.name}>
{profile.full_name}
</Text>


<Text>
{profile.email}
</Text>


<Text style={styles.bio}>
{profile.bio || "No bio yet"}
</Text>


<Text>
Account type: {profile.account_type}
</Text>


</View>

);

}



const styles=StyleSheet.create({

container:{
padding:30
},

title:{
fontSize:32,
fontWeight:"bold"
},

name:{
fontSize:24,
marginTop:20
},

bio:{
marginTop:20
}

});