import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
ScrollView,
Pressable
} from "react-native";

import {supabase} from "../../services/supabase";


export default function BusinessReviews(){


const [reviews,setReviews]=useState([]);



useEffect(()=>{

loadReviews();

},[]);



async function loadReviews(){


const {
data:{
user
}
}=await supabase.auth.getUser();



const {data:claim}=await supabase

.from("claims")

.select("*")

.eq("user_id",user.id)

.eq("status","approved")

.single();



if(!claim){

return;

}



const {data}=await supabase

.from("reviews")

.select("*")

.eq("business_id",claim.business_id)

.order(
"created_at",
{
ascending:false
}
);



setReviews(data || []);


}



return(

<ScrollView style={styles.container}>


<Text style={styles.title}>
Customer Reviews
</Text>



{reviews.map(review=>(

<View

key={review.id}

style={styles.card}

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



{review.business_response &&

<Text>
Response:
{review.business_response}
</Text>

}



<Pressable

style={styles.button}

>

<Text style={styles.buttonText}>
Challenge Review
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
padding:15,
borderRadius:10,
marginTop:15
},

button:{
backgroundColor:"#222",
padding:10,
marginTop:15
},

buttonText:{
color:"white",
textAlign:"center"
}

});