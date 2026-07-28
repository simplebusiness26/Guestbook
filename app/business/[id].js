import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
ScrollView,
Image,
Pressable
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

const [averageRating,setAverageRating]=useState(0);



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



const reviewData=data || [];


setReviews(reviewData);



if(reviewData.length){


const total=reviewData.reduce(

(sum,review)=>{

return sum + Number(review.rating || 0);

},

0

);


setAverageRating(

(total / reviewData.length).toFixed(1)

);


}


}





if(!business){

return <Text>Loading...</Text>;

}



const businessImage =
business.image ||
(
business.photos &&
business.photos.length > 0
?
business.photos[0]
:
null
);





return(

<ScrollView style={styles.container}>


{
businessImage &&

<Image

source={{
uri:businessImage
}}

style={styles.image}

/>

}





<Text style={styles.title}>
{business.name}
</Text>



{
business.owner_id &&

<Text style={styles.verified}>
✓ Verified Business
</Text>

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




<Text style={styles.rating}>

⭐ {
averageRating
?
averageRating
:
"No rating"
}

</Text>



<Text>
Reviews: {reviews.length}
</Text>





{
canClaim &&
!business.owner_id &&

<ClaimButton

businessId={id}

/>

}





<Text style={styles.heading}>
Reviews
</Text>





{
reviews.length === 0 ?

<Text>
No reviews yet
</Text>


:


reviews.map(review=>(


<View

key={review.id}

style={styles.review}

>


<Text>
⭐ {review.rating}
</Text>


<Text>
{review.comment}
</Text>


<Text>
- {review.name}
</Text>



</View>


))


}




</ScrollView>

);

}






const styles=StyleSheet.create({

container:{
padding:20
},


image:{
width:"100%",
height:220,
borderRadius:15,
marginBottom:20
},


title:{
fontSize:30,
fontWeight:"bold"
},


verified:{
marginTop:10,
fontWeight:"bold",
fontSize:16
},


category:{
marginTop:10,
fontSize:18
},


description:{
marginVertical:20
},


rating:{
fontSize:18,
marginTop:15,
fontWeight:"bold"
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