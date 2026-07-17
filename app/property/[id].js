import React, {useEffect, useState} from "react";
import {
View,
Text,
StyleSheet,
ActivityIndicator,
ScrollView,
Pressable,
Linking
} from "react-native";

import {useLocalSearchParams} from "expo-router";
import {supabase} from "../../services/supabase";


export default function PropertyDetails(){

const {id}=useLocalSearchParams();

const [property,setProperty]=useState(null);



useEffect(()=>{

loadProperty();

},[]);



async function loadProperty(){


const {data,error}=await supabase

.from("properties")

.select("*")

.eq("id",id)

.single();



if(error){

console.log(error);

return;

}


setProperty(data);


}



if(!property){

return(

<View style={styles.loading}>

<ActivityIndicator size="large"/>

</View>

);

}



return(

<ScrollView style={styles.container}>


<Text style={styles.name}>
{property.property_name}
</Text>



<Text style={styles.rating}>
⭐ {property.rating || "No rating"}
</Text>



<Text style={styles.description}>
{property.description}
</Text>



<Text style={styles.info}>
📍 {property.address}
</Text>



<Pressable

style={styles.button}

onPress={()=>
Linking.openURL(property.booking_url)
}

>

<Text style={styles.buttonText}>
🔗 Book This Stay
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
padding:25
},

name:{
fontSize:32,
fontWeight:"bold"
},

rating:{
fontSize:20,
marginTop:15
},

description:{
fontSize:17,
marginTop:20
},

info:{
marginTop:20,
fontSize:16
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