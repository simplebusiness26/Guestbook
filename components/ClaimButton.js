import React from "react";

import {
Pressable,
Text,
StyleSheet,
Alert
} from "react-native";

import {supabase} from "../services/supabase";


export default function ClaimButton({
businessId,
propertyId
}){


async function submitClaim(){


const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

Alert.alert(
"Login required",
"Please login before claiming a listing"
);

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

Alert.alert(
"Error",
error.message
);

return;

}



Alert.alert(
"Success",
"Claim request submitted"
);


}



return(

<Pressable

style={styles.button}

onPress={submitClaim}

>

<Text style={styles.text}>
Claim this listing
</Text>


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