import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function Profile(){

return(

<View style={styles.container}>

<Text style={styles.title}>
👤 Profile
</Text>

<Text>
Login and account coming soon
</Text>

</View>

);

}


const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

title:{
fontSize:28,
fontWeight:"bold"
}

});