import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet
} from "react-native";

import {supabase} from "../../services/supabase";


export default function BusinessDashboard(){


const [business,setBusiness]=useState(null);

const [status,setStatus]=useState("");



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

return;

}



const {data:claim,error}=await supabase

.from("claims")

.select("*")

.eq("user_id",user.id)

.eq("status","approved")

.single();



if(error){

setStatus("No approved business claim");

return;

}



setStatus("Approved");



if(claim.business_id){


const {data}=await supabase

.from("businesses")

.select("*")

.eq("id",claim.business_id)

.single();



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
{business.category}
</Text>


<Text>
Manage your business here
</Text>

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
marginTop:20
}

});