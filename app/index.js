import React from "react";
import {
View,
Text,
Pressable,
StyleSheet
} from "react-native";

import {router} from "expo-router";


export default function Home(){

return(

<View style={styles.container}>


<Text style={styles.title}>
Guestbook
</Text>


<Pressable

style={styles.button}

onPress={()=>router.push("/auth/signup")}

>

<Text style={styles.text}>
Create Account
</Text>

</Pressable>



<Pressable

style={styles.button}

onPress={()=>router.push("/map")}

>

<Text style={styles.text}>
Open Map
</Text>

</Pressable>



</View>

);

}



const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

title:{
fontSize:35,
fontWeight:"bold",
marginBottom:40
},

button:{
backgroundColor:"#222",
padding:15,
borderRadius:10,
margin:10,
width:200
},

text:{
color:"white",
textAlign:"center"
}

});