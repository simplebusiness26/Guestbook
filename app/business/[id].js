import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
ScrollView,
Pressable,
Linking
} from "react-native";

import {
useLocalSearchParams
} from "expo-router";

import {supabase} from "../../services/supabase";

import ClaimButton from "../../components/ClaimButton";


export default function BusinessPage(){

const {id}=useLocalSearchParams();

const [business,setBusiness]=useState(null);
const [reviews,setReviews]=useState([]);
const [canClaim,setCanClaim]=useState(false);



useEffect(()=>{

loadBusiness();
loadReviews();
checkUser();

},[]);



async function checkUser(){

const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

setCanClaim(false);
return;

}



const {
data:profile
}=await supabase

.from("profiles")

.select("account_type")

.eq("id",user.id)

.single();



if(profile?.account_type==="business"){

setCanClaim(true);

}else{

setCanClaim(false);

}

}





async function loadBusiness(){

const {
data,
error
}=await supabase

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

const {
data,
error
}=await supabase

.from("reviews")

.select("*")

.eq("business_id",id)

.order(
"created_at",
{
ascending:false
}
);



if(error){

console.log(error);
return;

}



const reviewData = data || [];


setReviews(reviewData);



// Calculate rating from reviews

if(reviewData.length > 0){


const total = reviewData.reduce(

(sum,review)=>
sum + Number(review.rating || 0),

0

);


const average = total / reviewData.length;



setBusiness(prev=>({

...prev,

rating: average.toFixed(1),

review_count: reviewData.length

}));


}


}





if(!business){

return(

<View>

<Text>
Loading...
</Text>

</View>

);

}





return(

<ScrollView style={styles.container}>


<View>


<Text style={styles.title}>
{business.name}
</Text>




{
business.claimed === true ? (

<Text style={styles.verified}>
✓ Verified Business
</Text>

) : null
}





<Text style={styles.category}>
{business.category}
</Text>





<Text style={styles.description}>
{business.description}
</Text>





<Text>
📍 {business.address}
</Text>





{
business.phone ? (

<Pressable

style={styles.button}

onPress={()=>
Linking.openURL(
`tel:${business.phone}`
)
}

>

<Text style={styles.buttonText}>
Call Business
</Text>

</Pressable>

) : null
}





{
business.website ? (

<Pressable

style={styles.button}

onPress={()=>
Linking.openURL(
business.website
)
}

>

<Text style={styles.buttonText}>
Visit Website
</Text>

</Pressable>

) : null
}





{
canClaim && business.claimed !== true ? (

<ClaimButton

businessId={id}

/>

) : null
}







<View style={styles.stats}>


<Text>
⭐ {business.rating ? business.rating : "No rating"}
</Text>



<Text>
Reviews: {business.review_count || reviews.length}
</Text>



</View>





<Text style={styles.heading}>
Reviews
</Text>





{
reviews.map((review)=>(


<View

key={review.id}

style={styles.review}

>


<Text>
⭐ {review.rating || "No rating"}
</Text>



<Text>
{review.comment || "No comment"}
</Text>




<Text>
{review.name ? `- ${review.name}` : ""}
</Text>



</View>


))

}





</View>


</ScrollView>

);

}





const styles=StyleSheet.create({

container:{
padding:20
},


title:{
fontSize:32,
fontWeight:"bold"
},


verified:{
marginTop:10,
fontWeight:"bold"
},


category:{
fontSize:18,
marginTop:10
},


description:{
marginVertical:20
},


button:{
backgroundColor:"#222",
padding:15,
borderRadius:10,
marginTop:10
},


buttonText:{
color:"white",
textAlign:"center"
},


stats:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:20
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
marginTop:10
}

});