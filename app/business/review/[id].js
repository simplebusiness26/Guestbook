import React, {useState} from "react";
import {
View,
Text,
TextInput,
Pressable,
StyleSheet,
Alert
} from "react-native";

import {useLocalSearchParams, router} from "expo-router";
import {supabase} from "../../../services/supabase";


export default function Review(){

const {id}=useLocalSearchParams();

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


const {data,error}=await supabase
.from("reviews")
.insert({

business_id:id,
name:name,
rating:rating,
comment:comment

})
.select();



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
Leave a Review
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

placeholder="Write your review..."

multiline

value={comment}

onChangeText={setComment}

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
fontSize:30,
fontWeight:"bold",
marginBottom:25
},

input:{
borderWidth:1,
padding:15,
borderRadius:10,
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
padding:15,
height:120,
borderRadius:10
},

button:{
marginTop:20,
padding:16,
backgroundColor:"#222",
borderRadius:10
},

buttonText:{
color:"white",
textAlign:"center",
fontSize:18
}

});