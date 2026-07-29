import React,{useEffect,useState} from "react";

import {
View,
Text,
StyleSheet,
ScrollView,
Image,
ActivityIndicator,
Pressable
} from "react-native";

import {
useLocalSearchParams,
router
} from "expo-router";

import {supabase} from "../../services/supabase";



export default function ProfilePage(){


const {id}=useLocalSearchParams();


const [profile,setProfile]=useState(null);

const [reviews,setReviews]=useState([]);

const [businesses,setBusinesses]=useState([]);

const [loading,setLoading]=useState(true);





useEffect(()=>{

loadProfile();

loadReviews();

loadBusinesses();

},[]);







async function loadProfile(){


const {
data,
error
}=await supabase

.from("profiles")

.select("*")

.eq("id",id)

.single();



if(error){

console.log(error);

return;

}



setProfile(data);

setLoading(false);

}







async function loadReviews(){


const {
data,
error
}=await supabase

.from("reviews")

.select(`
*,
businesses(
name
)
`)

.eq("user_id",id)

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







async function loadBusinesses(){


const {
data,
error
}=await supabase

.from("businesses")

.select("*")

.eq("owner_id",id);



if(error){

console.log(error);

return;

}



setBusinesses(data || []);

}








if(loading){

return(

<View style={styles.loading}>

<ActivityIndicator size="large"/>

</View>

);

}







if(!profile){

return(

<View style={styles.loading}>

<Text>
Profile not found
</Text>

</View>

);

}








return(

<ScrollView style={styles.container}>


<View style={styles.header}>


{

profile.profile_photo

?

<Image

source={{
uri:profile.profile_photo
}}

style={styles.avatar}

/>

:

<View style={styles.avatarPlaceholder}>

<Text style={styles.avatarText}>
?
</Text>

</View>

}



<Text style={styles.name}>
{profile.full_name || "Guest User"}
</Text>



<Text style={styles.type}>
{profile.account_type || "Guest"}
</Text>



</View>





<View style={styles.card}>


<Text style={styles.heading}>
About
</Text>


<Text>
{profile.bio || "No bio added yet"}
</Text>



</View>







<View style={styles.stats}>


<View style={styles.statCard}>

<Text style={styles.number}>
{reviews.length}
</Text>

<Text>
Reviews
</Text>

</View>



<View style={styles.statCard}>

<Text style={styles.number}>
{businesses.length}
</Text>

<Text>
Businesses
</Text>

</View>



</View>








<View style={styles.card}>


<Text style={styles.heading}>
Reviews
</Text>



{

reviews.length===0

?

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
⭐ {review.rating}/5
</Text>


<Text>
{review.comment}
</Text>



<Text style={styles.small}>
at {review.businesses?.name || "Business"}
</Text>


</View>


))

}


</View>







<View style={styles.card}>


<Text style={styles.heading}>
Businesses
</Text>



{

businesses.length===0

?

<Text>
No businesses yet
</Text>


:

businesses.map(business=>(

<Pressable

key={business.id}

onPress={()=>router.push(`/business/${business.id}`)}

>

<Text style={styles.business}>
{business.name}
</Text>


</Pressable>

))

}



</View>





</ScrollView>

);

}







const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f7fb",
padding:20
},


loading:{
flex:1,
justifyContent:"center",
alignItems:"center"
},


header:{
alignItems:"center",
marginBottom:20
},


avatar:{
width:120,
height:120,
borderRadius:60
},


avatarPlaceholder:{
width:120,
height:120,
borderRadius:60,
justifyContent:"center",
alignItems:"center"
},


avatarText:{
fontSize:40
},


name:{
fontSize:30,
fontWeight:"bold",
marginTop:15
},


type:{
marginTop:5,
fontSize:16
},


card:{
backgroundColor:"white",
padding:20,
borderRadius:15,
marginBottom:15
},


heading:{
fontSize:22,
fontWeight:"bold",
marginBottom:15
},


stats:{
flexDirection:"row",
gap:15,
marginBottom:15
},


statCard:{
flex:1,
backgroundColor:"white",
padding:20,
borderRadius:15,
alignItems:"center"
},


number:{
fontSize:25,
fontWeight:"bold"
},


review:{
borderTopWidth:1,
borderColor:"#eee",
paddingTop:15,
marginTop:15
},


small:{
marginTop:8
},


business:{
fontSize:18,
paddingVertical:10
}

});