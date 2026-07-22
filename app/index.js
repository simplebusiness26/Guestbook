import React,{useEffect,useState} from "react";

import {
View,
Text,
Pressable,
StyleSheet,
ActivityIndicator
} from "react-native";

import {router} from "expo-router";

import {supabase} from "../services/supabase";


export default function Home(){


const [userType,setUserType]=useState(null);

const [loggedIn,setLoggedIn]=useState(false);

const [loading,setLoading]=useState(true);



useEffect(()=>{


loadUserType();



const {
data:{
subscription
}

}=supabase.auth.onAuthStateChange(()=>{

loadUserType();

});



return()=>{

subscription.unsubscribe();

};


},[]);



async function loadUserType(){


setLoading(true);



const {
data:{
user
}

}=await supabase.auth.getUser();



if(!user){

setLoggedIn(false);

setUserType(null);

setLoading(false);

return;

}



setLoggedIn(true);



const {
data,
error
}=await supabase

.from("profiles")

.select("account_type,is_admin")

.eq("id",user.id)

.single();



if(error){

console.log(error);

setLoading(false);

return;

}



if(data){


if(data.is_admin){

setUserType("admin");

}

else{

setUserType(data.account_type);

}


}



setLoading(false);


}



async function logout(){


await supabase.auth.signOut();


setUserType(null);

setLoggedIn(false);


}



if(loading){

return(

<View style={styles.container}>

<ActivityIndicator size="large"/>

</View>

);

}



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



{!loggedIn &&

<>


<Pressable

style={styles.button}

onPress={()=>router.push("/auth/login")}

>

<Text style={styles.text}>
Login
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


</>

}



{loggedIn &&

<>


<Pressable

style={styles.button}

onPress={()=>router.push("/profile")}

>

<Text style={styles.text}>
My Profile
</Text>

</Pressable>



{userType==="business" &&

<Pressable

style={styles.button}

onPress={()=>router.push("/business/dashboard")}

>

<Text style={styles.text}>
🏪 Business Dashboard
</Text>

</Pressable>

}



{userType==="host" &&

<Pressable

style={styles.button}

onPress={()=>router.push("/property/dashboard")}

>

<Text style={styles.text}>
🏠 Property Dashboard
</Text>

</Pressable>

}



{userType==="admin" &&

<Pressable

style={styles.button}

onPress={()=>router.push("/admin/claims")}

>

<Text style={styles.text}>
⚙️ Admin Claims
</Text>

</Pressable>

}



<Pressable

style={styles.logout}

onPress={logout}

>

<Text style={styles.logoutText}>
Logout
</Text>

</Pressable>


</>

}



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
},

logout:{
marginTop:20,
padding:12
},

logoutText:{
color:"red",
fontWeight:"bold"
}

});