import React, {useState} from "react";

import {
View,
Text,
TextInput,
Pressable,
StyleSheet,
ScrollView,
ActivityIndicator
} from "react-native";

import {
useLocalSearchParams,
router
} from "expo-router";

import {supabase} from "../../../services/supabase";


export default function Review(){


const {id}=useLocalSearchParams();


const [name,setName]=useState("");

const [comment,setComment]=useState("");

const [rating,setRating]=useState(5);

const [loading,setLoading]=useState(false);





async function submitReview(){


if(!name || !comment){

return;

}



setLoading(true);



const {
data:{
user
},
error:userError

}=await supabase.auth.getUser();




if(userError || !user){

setLoading(false);

return;

}





const {
error

}=await supabase

.from("reviews")

.insert({

business_id:id,

user_id:user.id,

name:name,

rating:rating,

comment:comment

});





if(error){

setLoading(false);

return;

}





setLoading(false);



router.back();


}







return(

<ScrollView

style={styles.container}

contentContainerStyle={styles.content}

>


<Text style={styles.title}>
Leave a Review
</Text>



<Text style={styles.subtitle}>
Share your experience with this business
</Text>





<TextInput

style={styles.input}

placeholder="Your name"

value={name}

onChangeText={setName}

/>





<Text style={styles.label}>
Your rating
</Text>



<View style={styles.stars}>


{

[1,2,3,4,5].map((star)=>(

<Pressable

key={star}

onPress={()=>setRating(star)}

>

<Text style={styles.star}>

{

star <= rating

?

"⭐"

:

"☆"

}

</Text>


</Pressable>

))

}


</View>





<Text style={styles.ratingText}>
Rating: {rating}/5
</Text>





<TextInput

style={styles.textarea}

placeholder="Write your review..."

multiline

value={comment}

onChangeText={setComment}

/>





<Pressable

style={styles.button}

onPress={submitReview}

disabled={loading}

>


{

loading

?

<ActivityIndicator color="white"/>

:

<Text style={styles.buttonText}>
Submit Review
</Text>

}


</Pressable>




</ScrollView>

);

}







const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f7fb"
},


content:{
padding:25,
paddingBottom:60
},


title:{
fontSize:32,
fontWeight:"bold",
marginBottom:10
},


subtitle:{
fontSize:16,
marginBottom:25
},


input:{
backgroundColor:"white",
borderWidth:1,
borderColor:"#ddd",
padding:15,
borderRadius:12,
marginBottom:15
},


label:{
fontSize:18,
fontWeight:"bold"
},


stars:{
flexDirection:"row",
marginVertical:15
},


star:{
fontSize:40
},


ratingText:{
marginBottom:20,
fontWeight:"600"
},


textarea:{
backgroundColor:"white",
borderWidth:1,
borderColor:"#ddd",
padding:15,
height:130,
borderRadius:12,
textAlignVertical:"top"
},


button:{
marginTop:25,
backgroundColor:"#0066ff",
padding:17,
borderRadius:12
},


buttonText:{
color:"white",
textAlign:"center",
fontWeight:"bold",
fontSize:17
}


});