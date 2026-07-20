import React, {useEffect, useState} from "react";

import {
View,
Text,
StyleSheet,
ScrollView
} from "react-native";

import {useLocalSearchParams, router} from "expo-router";

import {supabase} from "../../services/supabase";

import ClaimButton from "../../components/ClaimButton";


export default function BusinessDetails(){


const {id}=useLocalSearchParams();


const [business,setBusiness]=useState(null);

const [reviews,setReviews]=useState([]);



useEffect(()=>{

loadBusiness();
loadReviews();

},[]);



async function loadBusiness(){


const {data,error}=await supabase

.from("businesses")

.select("*")

.eq("id",id)

.single();



if(error){

console.log(error);

return;

}


setBusiness(data);

}



async function loadReviews(){


const {data,error}=await supabase

.from("reviews")

.select("*")

.eq("business_id",id)

.order("created_at",{ascending:false});



if(error){

console.log(error);

return;

}


setReviews(data || []);

}



if(!business){

return <Text>Loading...</Text>;

}



return(

<ScrollView style={styles.container}>


<Text style={styles.name}>
{business.name}
</Text>


<Text>
{business.category}
</Text>


<Text style={styles.description}>
{business.description}
</Text>


<Text>
{business.address}
</Text>



<ClaimButton businessId={id}/>



<Text style={styles.heading}>
Reviews ({reviews.length})
</Text>



{reviews.map(review=>(

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



</ScrollView>

);

}



const styles=StyleSheet.create({

container:{
padding:20
},

name:{
fontSize:30,
fontWeight:"bold"
},

description:{
marginTop:15
},

heading:{
fontSize:24,
fontWeight:"bold",
marginTop:30
},

review:{
borderWidth:1,
padding:15,
borderRadius:10,
marginTop:10
}

});