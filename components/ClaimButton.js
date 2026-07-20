import React from "react";

import {
Pressable,
Text
} from "react-native";

import {supabase} from "../services/supabase";


export default function ClaimButton({
businessId,
propertyId
}){


async function claim(){


const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

alert("Please login first");

return;

}



const {error}=await supabase

.from("claims")

.insert({

user_id:user.id,

business_id:businessId || null,

property_id:propertyId || null

});



if(error){

console.log(error);

alert(error.message);

return;

}


alert("Claim request submitted");


}



return(

<Pressable

onPress={claim}

style={{
backgroundColor:"#222",
padding:15,
borderRadius:10
}}

>

<Text style={{
color:"white",
textAlign:"center"
}}>
Claim this listing
</Text>


</Pressable>

);

}