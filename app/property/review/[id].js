import React, {useState} from "react";
import {
View,
Text,
TextInput,
StyleSheet,
Pressable,
Alert
} from "react-native";

import {useLocalSearchParams, router} from "expo-router";
import {supabase} from "../../../services/supabase";


export default function PropertyReview(){

const params = useLocalSearchParams();

const propertyId = params.id;


const [name,setName]=useState("");
const [comment,setComment]=useState("");
const [rating,setRating]=useState(5);



async function submitReview(){


if(!name || !comment){

Alert.alert(
"Missing information",
"Please add your name and review"
);

return;

}



const {error}=await supabase

.from("reviews")

.insert({

name:name,

property_id:propertyId,

rating:rating,

comment:comment

});



if(error){

console.log(error);

Alert.alert(
"Error",
error.message
);

return;

}



Alert.alert(
"Success",
"Review submitted"
);


router.back();


}



return(

<View style={styles.container}>


<Text style={styles.title}>
Leave a Property Review
</Text>



<TextInput

style={styles.input}

placeholder="Your name"

value={name}

onChangeText={setName}

/>



<Text style={styles.label}>
Rating
</Text>



<View style={styles.stars}>

{[1,2,3,4,5].map((star)=>(

<Pressable

key={star}

onPress={()=>setRating(star)}

>

<Text style={styles.star}>
{star <= rating ? "⭐":"☆"}
</Text>

</Pressable>

))}

</View>



<TextInput

style={styles.textarea}

placeholder="Write your review"

value={comment}

onChangeText={setComment}

multiline

/>



<Pressable

style={styles.button}

onPress={submitReview}

>

<Text style={styles.buttonText}>
Submit Review
</Text>


</Pressable>



</View>

);

}



const styles=StyleSheet.create({

container:{
padding:25
},

title:{
fontSize:28,
fontWeight:"bold",
marginBottom:25
},

input:{
borderWidth:1,
borderRadius:10,
padding:15,
marginBottom:15
},

label:{
fontSize:18
},

stars:{
flexDirection:"row",
marginVertical:15
},

star:{
fontSize:35
},

textarea:{
borderWidth:1,
borderRadius:10,
padding:15,
height:120
},

button:{
marginTop:20,
backgroundColor:"#222",
padding:16,
borderRadius:10
},

buttonText:{
color:"white",
textAlign:"center"
}

});