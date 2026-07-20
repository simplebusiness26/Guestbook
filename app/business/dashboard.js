import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
Pressable
} from "react-native";

import {supabase} from "../../services/supabase";

import {router} from "expo-router";

import QRCodeGenerator from "../../components/QRCodeGenerator";


export default function BusinessDashboard(){


const [business,setBusiness]=useState(null);

const [status,setStatus]=useState("Loading...");



useEffect(()=>{

loadDashboard();

},[]);



async function loadDashboard(){


const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

setStatus("Please login");

return;

}



const {data:claim,error}=await supabase

.from("claims")

.select("*")

.eq("user_id",user.id)

.eq("status","approved")

.single();



if(error || !claim){

setStatus("No approved business claim");

return;

}



setStatus("Approved");



if(claim.business_id){


const {data,error}=await supabase

.from("businesses")

.select("*")

.eq("id",claim.business_id)

.single();



if(error){

console.log(error);

return;

}



setBusiness(data);


}


}



return(

<View style={styles.container}>


<Text style={styles.title}>
Business Dashboard
</Text>



<Text>
Status: {status}
</Text>



{business &&

<>


<Text style={styles.name}>
{business.name}
</Text>


<Text>
Category: {business.category}
</Text>


<Text style={styles.info}>
Manage your business listing below
</Text>



<Text style={styles.heading}>
Customer Review QR Code
</Text>


<QRCodeGenerator

businessId={business.id}

/>



<Pressable

style={styles.button}

onPress={()=>router.push("/business/edit")}

>

<Text style={styles.buttonText}>
Edit Business
</Text>

</Pressable>



<Pressable

style={styles.button}

onPress={()=>router.push(`/business/${business.id}`)}

>

<Text style={styles.buttonText}>
View Public Profile
</Text>

</Pressable>



<Pressable

style={styles.button}

onPress={()=>router.push("/business/reviews")}

>

<Text style={styles.button