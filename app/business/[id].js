import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  Pressable,
  Linking
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../services/supabase";


export default function BusinessDetails(){

const { id } = useLocalSearchParams();

const [business,setBusiness] = useState(null);



useEffect(()=>{

loadBusiness();

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



if(!business){

return(

<View style={styles.loading}>

<ActivityIndicator size="large"/>

</View>

);

}



return(

<View style={styles.container}>


<Text style={styles.name}>
{business.name}
</Text>


<Text style={styles.category}>
{business.category}
</Text>


<Text style={styles.rating}>
⭐ {business.rating || "No rating"} 
({business.review_count || 0} reviews)
</Text>



<Text style={styles.description}>
{business.description}
</Text>



<Text style={styles.info}>
📍 {business.address}
</Text>


{business.opening_hours &&

<Text style={styles.info}>
🕒 {business.opening_hours}
</Text>

}



{business.phone &&

<Pressable
onPress={()=>Linking.openURL(`tel:${business.phone}`)}
>

<Text style={styles.link}>
📞 {business.phone}
</Text>

</Pressable>

}



{business.website &&

<Pressable
onPress={()=>Linking.openURL(business.website)}
>

<Text style={styles.link}>
🌐 Visit Website
</Text>

</Pressable>

}



<Pressable style={styles.button}>

<Text style={styles.buttonText}>
✍️ Leave Review
</Text>

</Pressable>



</View>

);

}



const styles=StyleSheet.create({

loading:{
flex:1,
justifyContent:"center",
alignItems:"center"
},


container:{
flex:1,
padding:25
},


name:{
fontSize:32,
fontWeight:"bold"
},


category:{
fontSize:20,
marginTop:8
},


rating:{
fontSize:18,
marginTop:15
},


description:{
fontSize:17,
marginTop:20,
lineHeight:24
},


info:{
fontSize:16,
marginTop:15
},


link:{
fontSize:17,
marginTop:15
},


button:{
marginTop:30,
padding:16,
borderRadius:10,
backgroundColor:"#222"
},


buttonText:{
color:"white",
textAlign:"center",
fontSize:18
}


});