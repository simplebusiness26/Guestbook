import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
ScrollView
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
data:profile,
error

}=await supabase

.from("profiles")

.select("account_type")

.eq("id",user.id)

.single();



if(error){

console.log(error);

return;

}



if(profile.account_type==="business"){

setCanClaim(true);

}else{

setCanClaim(false);

}


}




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


setReviews(data || []);


}



if(!business){

return <Text>Loading...</Text>;

}



return(

<ScrollView style={styles.container}>


<Text style={styles.title}>
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



{
canClaim && !business.owner_id &&

<ClaimButton

businessId={id}

/>

}



{
business.owner_id &&

<Text style={styles.verified}>
✓ Verified Business
</Text>

}



<Text style={styles.heading}>
Reviews
</Text>



{
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

title:{
fontSize:30,
fontWeight:"bold"
},

description:{
marginVertical:20
},

verified:{
marginTop:20,
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