import React, {useEffect, useState} from "react";
import {
View,
Text,
StyleSheet,
ScrollView,
Pressable,
ActivityIndicator
} from "react-native";

import {useLocalSearchParams, router} from "expo-router";
import {supabase} from "../../services/supabase";
import QRCodeGenerator from "../../components/QRCodeGenerator";


export default function PropertyDetails(){

const params = useLocalSearchParams();

const propertyId = params.id;


const [property,setProperty]=useState(null);
const [reviews,setReviews]=useState([]);



useEffect(()=>{

if(propertyId){

loadProperty();
loadReviews();

}

},[propertyId]);



async function loadProperty(){

const {data,error}=await supabase

.from("properties")

.select("*")

.eq("id",propertyId)

.single();



if(error){

console.log("Property error:",error);

return;

}


setProperty(data);

}



async function loadReviews(){

const {data,error}=await supabase

.from("reviews")

.select("*")

.eq("property_id",propertyId)

.order("created_at",{ascending:false});



if(error){

console.log("Review error:",error);

return;

}


setReviews(data || []);

}



if(!property){

return(

<View style={styles.loading}>

<ActivityIndicator size="large"/>

</View>

);

}



return(

<ScrollView style={styles.container}>


<Text style={styles.name}>
{property.name}
</Text>


<Text style={styles.host}>
Hosted by {property.host}
</Text>


<Text style={styles.description}>
{property.description}
</Text>


<Text style={styles.booking}>
Booking:
</Text>


<Text>
{property.booking_url}
</Text>



<Text style={styles.qrTitle}>
Scan for Guestbook
</Text>


<QRCodeGenerator propertyId={propertyId}/>



<Text style={styles.heading}>
Reviews ({reviews.length})
</Text>



{reviews.map((review)=>(

<View
key={review.id}
style={styles.review}
>

<Text>
{"⭐".repeat(review.rating)}
</Text>


<Text>
{review.comment}
</Text>


<Text>
- {review.name || "Guest"}
</Text>


</View>

))}



<Pressable

style={styles.button}

onPress={()=>
router.push(`/property/review/${propertyId}`)
}

>

<Text style={styles.buttonText}>
✍️ Leave Review
</Text>

</Pressable>



</ScrollView>

);

}



const styles=StyleSheet.create({

loading:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

container:{
padding:20
},

name:{
fontSize:32,
fontWeight:"bold"
},

host:{
marginTop:10
},

description:{
marginTop:20
},

booking:{
fontWeight:"bold",
marginTop:20
},

qrTitle:{
fontSize:22,
fontWeight:"bold",
marginTop:30,
marginBottom:15
},

heading:{
fontSize:25,
fontWeight:"bold",
marginTop:30
},

review:{
borderWidth:1,
borderRadius:10,
padding:15,
marginTop:15
},

button:{
marginTop:25,
backgroundColor:"#222",
padding:16,
borderRadius:10
},

buttonText:{
color:"white",
textAlign:"center"
}

});