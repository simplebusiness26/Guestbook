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


const [businesses,setBusinesses]=useState([]);

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



const {data,error}=await supabase

.from("businesses")

.select("*")

.eq("owner_id",user.id);



if(error){

console.log(error);

setStatus("Error loading businesses");

return;

}



if(data && data.length > 0){

setBusinesses(data);

setStatus("Your Businesses");

}else{

setStatus("No business listings yet");

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



{businesses.map(business=>(


<View

key={business.id}

style={styles.card}

>


<Text style={styles.name}>
{business.name}
</Text>


<Text>
Category: {business.category}
</Text>



<Text style={styles.heading}>
Customer QR Code
</Text>


<QRCodeGenerator

businessId={business.id}

/>



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



</View>


))}



<Pressable

style={styles.button}

onPress={()=>router.push("/business/add")}

>

<Text style={styles.buttonText}>
➕ Add Business Listing
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
fontWeight:"bold"
},

card:{
borderWidth:1,
borderRadius:10,
padding:15,
marginTop:20
},

name:{
fontSize:25,
fontWeight:"bold"
},

heading:{
fontSize:18,
fontWeight:"bold",
marginTop:15,
marginBottom:10
},

button:{
backgroundColor:"#222",
padding:15,
borderRadius:10,
marginTop:15
},

buttonText:{
color:"white",
textAlign:"center"
}

});