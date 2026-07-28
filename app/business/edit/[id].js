import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import { supabase } from "../../../services/supabase";


export default function EditBusiness() {


const { id } = useLocalSearchParams();


const [loading,setLoading] = useState(true);

const [business,setBusiness] = useState(null);

const [name,setName] = useState("");
const [description,setDescription] = useState("");
const [phone,setPhone] = useState("");
const [website,setWebsite] = useState("");
const [address,setAddress] = useState("");
const [category,setCategory] = useState("");




useEffect(()=>{

loadBusiness();

},[]);






async function loadBusiness(){


if(!id){

Alert.alert(
"Error",
"No business ID found"
);

router.back();

return;

}




const {
data:{
user
}

}=await supabase.auth.getUser();




if(!user){

Alert.alert(
"Login required",
"Please login first"
);

router.back();

return;

}






const {
data,
error

}=await supabase

.from("businesses")

.select("*")

.eq("id",id)

.eq("owner_id",user.id)

.single();






if(error || !data){


Alert.alert(
"Access denied",
"You do not own this business"
);


router.back();

return;


}





setBusiness(data);

setName(data.name || "");
setDescription(data.description || "");
setPhone(data.phone || "");
setWebsite(data.website || "");
setAddress(data.address || "");
setCategory(data.category || "");


setLoading(false);


}







async function save(){


if(!business){

return;

}




const {
error
}=await supabase

.from("businesses")

.update({

name,
description,
phone,
website,
address,
category

})

.eq("id",business.id);





if(error){

Alert.alert(
"Save error",
error.message
);

return;

}




Alert.alert(
"Saved",
"Business updated successfully"
);


router.back();


}








async function deleteBusiness(){



Alert.alert(

"Delete Business",

"Are you sure you want to delete this listing?",

[

{
text:"Cancel",
style:"cancel"
},

{

text:"Delete",

style:"destructive",

onPress:async()=>{


const {
error
}=await supabase

.from("businesses")

.delete()

.eq("id",business.id);




if(error){

Alert.alert(
"Delete error",
error.message
);

return;

}



router.back();


}

}

]

);


}







if(loading){

return(

<View style={styles.loading}>

<ActivityIndicator size="large"/>

</View>

);

}






return(

<View style={styles.container}>


<Text style={styles.title}>
Edit Business
</Text>





<TextInput

style={styles.input}

value={name}

onChangeText={setName}

placeholder="Business name"

/>




<TextInput

style={styles.input}

value={category}

onChangeText={setCategory}

placeholder="Category"

/>




<TextInput

style={styles.input}

value={description}

onChangeText={setDescription}

placeholder="Description"

/>




<TextInput

style={styles.input}

value={address}

onChangeText={setAddress}

placeholder="Address"

/>




<TextInput

style={styles.input}

value={phone}

onChangeText={setPhone}

placeholder="Phone"

/>




<TextInput

style={styles.input}

value={website}

onChangeText={setWebsite}

placeholder="Website"

/>





<Pressable

style={styles.button}

onPress={save}

>

<Text style={styles.buttonText}>
Save Changes
</Text>

</Pressable>





<Pressable

style={styles.deleteButton}

onPress={deleteBusiness}

>

<Text style={styles.buttonText}>
Delete Business
</Text>

</Pressable>




</View>

);

}







const styles = StyleSheet.create({

container:{
padding:20
},

loading:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

title:{
fontSize:30,
fontWeight:"bold",
marginBottom:20
},

input:{
borderWidth:1,
padding:15,
borderRadius:10,
marginBottom:15
},

button:{
backgroundColor:"#222",
padding:15,
borderRadius:10,
marginTop:10
},

deleteButton:{
backgroundColor:"red",
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