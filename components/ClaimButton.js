import React,{useState,useEffect} from "react";

import {
Pressable,
Text,
StyleSheet,
Alert,
ActivityIndicator
} from "react-native";

import {supabase} from "../services/supabase";


export default function ClaimButton({
businessId,
propertyId
}){


const [loading,setLoading]=useState(false);

const [claimed,setClaimed]=useState(false);



useEffect(()=>{

checkClaim();

},[]);



async function checkClaim(){

const {
data:{
user
}

}=await supabase.auth.getUser();


if(!user) return;



let query=supabase

.from("claims")

.select("*")

.eq("user_id",user.id);



if(businessId){

query=query.eq(
"business_id",
businessId
);

}


if(propertyId){

query=query.eq(
"property_id",
propertyId
);

}



const {data,error}=await query;


if(error){

console.log(error);

return;

}



if(data && data.length){

setClaimed(true);

}

}




function handlePress(){

Alert.alert(
"Pressed",
"Claim button is working"
);


submitClaim();

}




async function submitClaim(){


if(loading) return;


if(claimed){

Alert.alert(
"Already Submitted",
"You have already claimed this listing."
);

return;

}



setLoading(true);



const {
data:{
user
},
error:userError

}=await supabase.auth.getUser();



if(userError){

Alert.alert(
"Error",
userError.message
);

setLoading(false);

return;

}



if(!user){

Alert.alert(
"Login required",
"Please login before claiming a listing"
);

setLoading(false);

return;

}



const {error}=await supabase

.from("claims")

.insert({

user_id:user.id,

business_id:businessId || null,

property_id:propertyId || null,

status:"pending"

});



if(error){

Alert.alert(
"Database Error",
error.message
);


setLoading(false);

return;

}



setClaimed(true);

setLoading(false);



Alert.alert(
"Success",
"Claim request submitted"
);


}



return(

<Pressable

style={styles.button}

onPress={handlePress}

>

{

loading ?

<ActivityIndicator color="white"/>

:

<Text style={styles.text}>

{
claimed
?
"Claim Pending"
:
"Test Claim Button"
}

</Text>

}


</Pressable>

);

}



const styles=StyleSheet.create({

button:{
backgroundColor:"#222",
padding:15,
borderRadius:10,
marginTop:20
},

text:{
color:"white",
textAlign:"center",
fontWeight:"bold"
}

});