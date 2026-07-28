
import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
ScrollView,
Image,
Pressable,
Linking
} from "react-native";

import {
useLocalSearchParams,
router
} from "expo-router";

import {supabase} from "../../services/supabase";

import ClaimButton from "../../components/ClaimButton";


export default function BusinessPage(){


const {id}=useLocalSearchParams();


const [business,setBusiness]=useState(null);

const [reviews,setReviews]=useState([]);

const [averageRating,setAverageRating]=useState(0);

const [canClaim,setCanClaim]=useState(false);

const [isOwner,setIsOwner]=useState(false);





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

return;

}




const {
data:profile
}=await supabase

.from("profiles")

.select("account_type")

.eq("id",user.id)

.maybeSingle();




if(profile?.account_type==="business"){

setCanClaim(true);

}




const {
data:owned
}=await supabase

.from("businesses")

.select("id")

.eq("id",id)

.eq("owner_id",user.id)

.maybeSingle();



if(owned){

setIsOwner(true);

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



const list=data || [];

setReviews(list);



if(list.length>0){


const total=list.reduce(

(sum,item)=>{

return sum + Number(item.rating || 0);

},

0

);


setAverageRating(

(total/list.length).toFixed(1)

);


}


}








function callBusiness(){


if(business.phone){

Linking.openURL(
`tel:${business.phone}`
);

}


}






function openWebsite(){


if(business.website){


let url=business.website;


if(!url.startsWith("http")){

url="https://"+url;

}


Linking.openURL(url);


}


}








if(!business){

return(

<Text>
Loading...
</Text>

);

}







const photos=[

business.image,

...(business.photos || [])

].filter(Boolean);







return(

<ScrollView style={styles.container}>



{
photos.length > 0 ? (

<View>

<Text style={styles.heading}>
Photos
</Text>


<ScrollView
horizontal
showsHorizontalScrollIndicator={false}
>


{
photos.map((photo,index)=>(

<Image

key={index}

source={{
uri:photo
}}

style={styles.photo}

/>

))

}


</ScrollView>


</View>

) : null
}






<Text style={styles.title}>
{business.name}
</Text>





{
Boolean(business.owner_id) ? (

<Text style={styles.verified}>
✓ Verified Business
</Text>

) : null
}






{
Boolean(isOwner) ? (

<Pressable

style={styles.editButton}

onPress={()=>router.push(`/business/edit/${id}`)}

>

<Text style={styles.buttonText}>
Edit Business
</Text>

</Pressable>

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
Boolean(business.opening_hours) ? (

<Text style={styles.info}>
🕒 {business.opening_hours}
</Text>

) : null
}







{
Boolean(business.phone) ? (

<Pressable

style={styles.actionButton}

onPress={callBusiness}

>

<Text style={styles.buttonText}>
📞 Call Business
</Text>

</Pressable>

) : null
}







{
Boolean(business.website) ? (

<Pressable

style={styles.actionButton}

onPress={openWebsite}

>

<Text style={styles.buttonText}>
🌐 Visit Website
</Text>

</Pressable>

) : null
}







<Text style={styles.rating}>
⭐ {averageRating ? averageRating : "No rating"}
</Text>





<Text>
Reviews: {reviews.length}
</Text>






{
Boolean(canClaim && !business.owner_id) ? (

<ClaimButton

businessId={id}

/>

) : null
}






<Text style={styles.heading}>
Reviews
</Text>







{
reviews.length===0 ? (

<Text>
No reviews yet
</Text>

) : (

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

)

}




</ScrollView>

);

}









const styles=StyleSheet.create({

container:{
padding:20
},


photo:{
width:250,
height:180,
borderRadius:15,
marginRight:10,
marginBottom:20
},


title:{
fontSize:30,
fontWeight:"bold",
marginTop:15
},


verified:{
fontSize:16,
fontWeight:"bold",
marginTop:10
},


category:{
fontSize:18,
marginTop:10
},


description:{
marginVertical:20
},


info:{
marginTop:10
},


rating:{
fontSize:18,
fontWeight:"bold",
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
marginTop:10
},


actionButton:{
backgroundColor:"#222",
padding:15,
borderRadius:10,
marginTop:15
},


editButton:{
backgroundColor:"#0066ff",
padding:15,
borderRadius:10,
marginTop:15
},


buttonText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
}


});