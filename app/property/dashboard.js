import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
Pressable
} from "react-native";

import {supabase} from "../../services/supabase";

import {router} from "expo-router";


export default function PropertyDashboard(){


const [property,setProperty]=useState(null);

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

setStatus("No approved property claim");

return;

}



setStatus("Approved");



if(claim.property_id){


const {data,error}=await supabase

.from("properties")

.select("*")

.eq("id",claim.property_id)

.single();



if(error){

console.log(error);

return;

}



setProperty(data);


}


}



return(

<View style={styles.container}>


<Text style={styles.title}>
Property Dashboard
</Text>



<Text>
Status: {status}
</Text>



{property &&

<>


<Text style={styles.name}>
{property.name}
</Text>


<Text>
Host: {property.host}
</Text>


<Text>
Manage your property below
</Text>



<Pressable

style={styles.button}

onPress={()=>router.push("/property/edit")}

>

<Text style={styles.buttonText}>
Edit Property
</Text>

</Pressable>



<Pressable

style={styles.button}

onPress={()=>router.push(`/property/${property.id}`)}

>

<Text style={styles.buttonText}>
View Public Profile
</Text>

</Pressable>



<Pressable

style={styles.button}

onPress={()=>router.push("/property/reviews")}

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

name:{
fontSize:25,
fontWeight:"bold",
marginTop:20
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