import React,{useEffect,useState} from "react";

import {
View,
Text,
Pressable,
StyleSheet,
ScrollView
} from "react-native";

import {supabase} from "../../services/supabase";


export default function ClaimsAdmin(){


const [claims,setClaims]=useState([]);



useEffect(()=>{

loadClaims();

},[]);



async function loadClaims(){


const {data,error}=await supabase

.from("claims")

.select("*")

.eq("status","pending");



if(error){

console.log(error);

return;

}


setClaims(data || []);

}



async function updateClaim(id,status){


const {data:claim,error:claimError}=await supabase

.from("claims")

.select("*")

.eq("id",id)

.single();



if(claimError){

console.log(claimError);

return;

}



// Update claim status

const {error}=await supabase

.from("claims")

.update({

status:status

})

.eq("id",id);



if(error){

console.log(error);

return;

}



// If approved link owner to listing

if(status==="approved"){



// Business claim

if(claim.business_id){


const {error:businessError}=await supabase

.from("businesses")

.update({

owner_id:claim.user_id

})

.eq("id",claim.business_id);



if(businessError){

console.log(businessError);

}

}



// Property claim

if(claim.property_id){


const {error:propertyError}=await supabase

.from("properties")

.update({

owner_id:claim.user_id

})

.eq("id",claim.property_id);



if(propertyError){

console.log(propertyError);

}

}



}



load