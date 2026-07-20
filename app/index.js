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


<Text style={styles.subtitle}>
Discover local businesses and stays
</Text>



<Pressable

style={styles.button}

onPress={()=>router.push("/map")}

>

<Text style={styles.text}>
🗺 Open Map
</Text>

</Pressable>



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

onPress={()=>router.push("/profile")}

>

<Text style={styles.text}
>
My Profile
</Text>

</Pressable>



<Pressable

style={styles.button}

onPress={()=>router.push("/business/dashboard")}

>

<Text style={styles.text}>
Business Dashboard
</Text>

</Pressable>

<Pressable

style={styles.button}

onPress={()=>router.push("/admin/claims")}

>

<Text style={styles.text}>
Admin Claims
</Text>

</Pressable>


</View>

);

}



const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center",
padding:20
},

title:{
fontSize:40,
fontWeight:"bold",
marginBottom:10
},

subtitle:{
marginBottom:40
},

button:{
backgroundColor:"#222",
width:"90%",
padding:16,
borderRadius:10,
marginTop:15
},

text:{
color:"white",
textAlign:"center",
fontWeight:"bold"
}

});