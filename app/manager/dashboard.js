import React from "react";

import {
View,
Text,
StyleSheet,
ScrollView,
Pressable
} from "react-native";

import {router} from "expo-router";

export default function ManagerDashboard(){

return(

<ScrollView style={styles.container}>

<Text style={styles.title}>
Manager Dashboard
</Text>

<Text style={styles.subtitle}>
Manage everything from one place.
</Text>

<Pressable
style={styles.card}
onPress={()=>router.push("/business/dashboard")}
>

<Text style={styles.cardTitle}>
🏪 Businesses
</Text>

<Text style={styles.cardText}>
Manage your businesses
</Text>

</Pressable>

<Pressable
style={styles.card}
onPress={()=>router.push("/property/dashboard")}
>

<Text style={styles.cardTitle}>
🏠 Properties
</Text>

<Text style={styles.cardText}>
Manage your properties
</Text>

</Pressable>

<View style={styles.upgradeCard}>

<Text style={styles.cardTitle}>
🎯 Activities
</Text>

<Text style={styles.cardText}>
Upgrade to unlock Activities.
</Text>

<Pressable style={styles.upgradeButton}>

<Text style={styles.upgradeText}>
Upgrade
</Text>

</Pressable>

</View>

<View style={styles.upgradeCard}>

<Text style={styles.cardTitle}>
🎉 Events
</Text>

<Text style={styles.cardText}>
Upgrade to unlock Events.
</Text>

<Pressable style={styles.upgradeButton}>

<Text style={styles.upgradeText}>
Upgrade
</Text>

</Pressable>

</View>

<View style={styles.upgradeCard}>

<Text style={styles.cardTitle}>
📈 Analytics
</Text>

<Text style={styles.cardText}>
Upgrade to unlock Analytics.
</Text>

<Pressable style={styles.upgradeButton}>

<Text style={styles.upgradeText}>
Upgrade
</Text>

</Pressable>

</View>

<Pressable
style={styles.card}
onPress={()=>router.push("/manager/subscription")}
>

<Text style={styles.cardTitle}>
💳 Subscription
</Text>

<Text style={styles.cardText}>
Manage your memberships
</Text>

</Pressable>

<Pressable
style={styles.card}
onPress={()=>router.push("/manager/settings")}
>

<Text style={styles.cardTitle}>
⚙️ Settings
</Text>

<Text style={styles.cardText}>
Manage your account
</Text>

</Pressable>

<View style={{height:40}}/>

</ScrollView>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f7fb",
padding:20
},

title:{
fontSize:32,
fontWeight:"bold",
marginTop:10
},

subtitle:{
fontSize:16,
color:"#666",
marginTop:5,
marginBottom:25
},

card:{
backgroundColor:"white",
padding:20,
borderRadius:15,
marginBottom:15,
elevation:2
},

upgradeCard:{
backgroundColor:"#fff8e7",
padding:20,
borderRadius:15,
marginBottom:15,
borderWidth:1,
borderColor:"#f0d78c"
},

cardTitle:{
fontSize:22,
fontWeight:"bold"
},

cardText:{
fontSize:15,
color:"#666",
marginTop:8
},

upgradeButton:{
marginTop:18,
backgroundColor:"#222",
padding:14,
borderRadius:10
},

upgradeText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
}

});