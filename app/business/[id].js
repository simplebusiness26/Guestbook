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

return(

<View style={styles.loading}>

<ActivityIndicator size="large"/>

</View>

);

}



return(

<ScrollView style={styles.container}>


<Text style={styles.name}>
{business.name}
</Text>


<Text style={styles.category}>
{business.category}
</Text>


<Text style={styles.rating}>
⭐ {business.rating || "No rating"}
</Text>


<Text style={styles.description}>
{business.description}
</Text>


<Text style={styles.address}>
📍 {business.address}
</Text>



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


<Text style={styles.comment}>
{review.comment}
</Text>


<Text>
- {review.name || "Guest"}
</Text>


</View>

))}



{reviews.length===0 &&

<Text>
No reviews yet
</Text>

}




<Pressable

style={styles.button}

onPress={()=>router.push(`/business/review/${id}`)}

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

category:{
fontSize:18,
marginTop:8
},

rating:{
fontSize:20,
marginTop:15
},

description:{
fontSize:16,
marginTop:20
},

address:{
marginTop:15
},

heading:{
fontSize:25,
fontWeight:"bold",
marginTop:30,
marginBottom:15
},

review:{
borderWidth:1,
borderRadius:10,
padding:15,
marginBottom:15
},

comment:{
marginVertical:10
},

button:{
backgroundColor:"#222",
padding:16,
borderRadius:10,
marginTop:20
},

buttonText:{
color:"white",
textAlign:"center",
fontSize:18
}

});