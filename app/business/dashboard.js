import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
Pressable
} from "react-native";

import {supabase} from "../../services/supabase";

import {router} from "expo-router";


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



<Text style={styles.status}>
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

<Text style={styles.buttonText}>
Manage Reviews
</Text>

</Pressable>

</>

}



</View>

);

}



const styles=StyleSheet.create({

container:{
padding:30
},

title:{
fontSize:30,
fontWeight:"bold"
},

status:{
marginTop:20
},

name:{
fontSize:25,
fontWeight:"bold",
marginTop:25
},

info:{
marginTop:15
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