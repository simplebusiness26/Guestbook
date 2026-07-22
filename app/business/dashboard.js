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



// Find businesses connected through approved claims

const {
data:claims,
error:claimError

}=await supabase

.from("claims")

.select("business_id")

.eq("user_id",user.id)

.eq("status","approved");



if(claimError){

console.log(claimError);

setStatus("Error loading claims");

return;

}



if(!claims || claims.length===0){

setStatus("No business listings yet");

return;

}



const ids=claims.map(item=>item.business_id);



const {
data,
error

}=await supabase

.from("businesses")

.select("*")

.in("id",ids);



if(error){

console.log(error);

setStatus("Error loading businesses");

return;

}



setBusinesses(data || []);



if(data.length){

setStatus("Your Businesses");

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

onPress={()=>router.push(`/business/edit/${business.id}`)}

>

<Text style={styles.buttonText}>
Edit Business
</Text>

</Pressable>



</View>


))}



<Pressable

style={styles.addButton}

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

addButton:{
backgroundColor:"#0066ff",
padding:15,
borderRadius:10,
marginTop:25
},

buttonText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
}

});