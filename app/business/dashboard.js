import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet
} from "react-native";

import {supabase} from "../../services/supabase";


export default function BusinessDashboard(){


const [business,setBusiness]=useState(null);



useEffect(()=>{

loadBusiness();

},[]);



async function loadBusiness(){


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

.eq("status","pending")

.single();



if(error){

console.log(error);

return;

}



if(claim.business_id){


const {data}=await supabase

.from("businesses")

.select("*")

.eq("id",claim.business_id)

.single();



setBusiness(data);


}


}



if(!business){

return(

<View style={styles.container}>

<Text>
No claimed business yet
</Text>

</View>

);

}



return(

<View style={styles.container}>


<Text style={styles.title}>
Business Dashboard
</Text>


<Text style={styles.name}>
{business.name}
</Text>


<Text>
Category: {business.category}
</Text>


<Text>
Claim status: Pending
</Text>


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