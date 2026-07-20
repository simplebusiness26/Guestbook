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


loadClaims();


}



return(

<ScrollView style={styles.container}>


<Text style={styles.title}>
Claim Requests
</Text>



{claims.map(claim=>(

<View

key={claim.id}

style={styles.card}

>


<Text>
Claim ID:
{claim.id}
</Text>


<Text>
Business:
{claim.business_id}
</Text>


<Text>
Property:
{claim.property_id}
</Text>



<Pressable

style={styles.approve}

onPress={()=>
updateClaim(
claim.id,
"approved"
)
}

>

<Text style={styles.text}>
Approve
</Text>

</Pressable>



<Pressable

style={styles.reject}

onPress={()=>
updateClaim(
claim.id,
"rejected"
)
}

>

<Text style={styles.text}>
Reject
</Text>

</Pressable>



</View>

))}



</ScrollView>

);

}



const styles=StyleSheet.create({

container:{
padding:20
},

title:{
fontSize:30,
fontWeight:"bold"
},

card:{
borderWidth:1,
borderRadius:10,
padding:15,
marginTop:15
},

approve:{
backgroundColor:"green",
padding:12,
marginTop:10
},

reject:{
backgroundColor:"red",
padding:12,
marginTop:10
},

text:{
color:"white",
textAlign:"center"
}

});