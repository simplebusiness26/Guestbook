import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { useColors } from '@/hooks/useColors';
import { supabase } from '@/services/supabase';


interface Claim {

  id:string;
  user_id:string;
  business_id:string | null;
  property_id:string | null;
  status:string;
  created_at:string;
  note:string | null;

  profile?:{
    full_name?:string;
    email?:string;
    phone?:string;
    account_type?:string;
  };

  listing_name?:string;

}



export default function AdminClaimsScreen(){


const [claims,setClaims]=useState<Claim[]>([]);

const [loading,setLoading]=useState(true);

const colors=useColors();

const insets=useSafeAreaInsets();





useEffect(()=>{

loadClaims();

},[]);






async function loadClaims(){


setLoading(true);



const {
data,
error
}=await supabase

.from("claims")

.select("*")

.eq("status","pending")

.order("created_at",{ascending:false});



if(error){

Alert.alert(
"Claims error",
error.message
);

setLoading(false);

return;

}




const updatedClaims:Claim[]=[];



for(const claim of data || []){


let profile:any=null;

let listing_name="Unknown listing";




// Profile lookup

const {
data:profileData
}=await supabase

.from("profiles")

.select(
"full_name,email,phone,account_type"
)

.eq("id",claim.user_id)

.maybeSingle();



profile=profileData;





// Business lookup

if(claim.business_id){


const {
data:business
}=await supabase

.from("businesses")

.select("name")

.eq("id",claim.business_id)

.maybeSingle();



if(business){

listing_name=business.name;

}


}





// Property lookup

if(claim.property_id){


const {
data:property
}=await supabase

.from("properties")

.select("name")

.eq("id",claim.property_id)

.maybeSingle();



if(property){

listing_name=property.name;

}


}





updatedClaims.push({

...claim,

profile:{

full_name:
profile?.full_name || "Unknown user",

email:
profile?.email || claim.user_id,

phone:
profile?.phone || "No phone",

account_type:
profile?.account_type || "Unknown"

},

listing_name

});


}




Alert.alert(
"Debug",
`Loaded ${updatedClaims.length} claims`
);



setClaims(updatedClaims);

setLoading(false);


}







async function updateClaim(
id:string,
status:"approved"|"rejected"
){


const {
data:claim,
error
}=await supabase

.from("claims")

.select("*")

.eq("id",id)

.single();



if(error || !claim){

Alert.alert(
"Error",
"Claim not found"
);

return;

}



await supabase

.from("claims")

.update({
status
})

.eq("id",id);





if(status==="approved"){


if(claim.business_id){


await supabase

.from("businesses")

.update({

owner_id:claim.user_id,

claimed:true

})

.eq("id",claim.business_id);


}



if(claim.property_id){


await supabase

.from("properties")

.update({

owner_id:claim.user_id

})

.eq("id",claim.property_id);


}


}





Alert.alert(
"Updated",
`Claim ${status}`
);



loadClaims();


}








return (

<ScrollView

style={{
flex:1,
backgroundColor:colors.background
}}

contentContainerStyle={{
padding:20,
paddingBottom:
(Platform.OS==="web"
?34
:insets.bottom)+24
}}

>



{
loading ?


<ActivityIndicator

style={{
marginTop:40
}}

color={colors.primary}

/>


:


claims.length===0 ?


<View

style={[
styles.empty,
{
backgroundColor:colors.card,
borderColor:colors.border
}
]}

>

<Text

style={{
color:colors.foreground,
fontSize:20
}}

>
No pending claims
</Text>


</View>



:



claims.map((c)=>(


<View

key={c.id}

style={[
styles.card,
{
backgroundColor:colors.card,
borderColor:colors.border
}
]}

>


<Text

style={[
styles.title,
{
color:colors.foreground
}
]}

>

{
c.business_id
?
"🏢 Business Claim"
:
"🏠 Property Claim"
}

</Text>




<Text style={styles.label}>
Listing
</Text>

<Text style={styles.value}>
{c.listing_name}
</Text>




<Text style={styles.label}>
Claimed By
</Text>

<Text style={styles.value}>
{c.profile?.full_name}
</Text>




<Text style={styles.label}>
Email
</Text>

<Text style={styles.value}>
{c.profile?.email}
</Text>




<Text style={styles.label}>
Phone
</Text>

<Text style={styles.value}>
{c.profile?.phone}
</Text>




<Text style={styles.label}>
Account Type
</Text>

<Text style={styles.value}>
{c.profile?.account_type}
</Text>




<Text style={styles.label}>
Note
</Text>

<Text style={styles.value}>
{c.note || "No note"}
</Text>





<View style={styles.buttons}>


<Pressable

style={styles.approve}

onPress={()=>updateClaim(c.id,"approved")}

>

<Text style={styles.buttonText}>
Approve
</Text>

</Pressable>




<Pressable

style={styles.reject}

onPress={()=>updateClaim(c.id,"rejected")}

>

<Text style={styles.buttonText}>
Reject
</Text>

</Pressable>


</View>



</View>


))



}



</ScrollView>

);

}






const styles=StyleSheet.create({

empty:{
padding:40,
borderRadius:15,
borderWidth:1,
alignItems:"center"
},

card:{
padding:18,
borderRadius:14,
borderWidth:1,
marginBottom:15
},

title:{
fontSize:18,
fontWeight:"bold",
marginBottom:15
},

label:{
fontSize:12,
color:"#777",
marginTop:10
},

value:{
fontSize:15
},

buttons:{
flexDirection:"row",
gap:10,
marginTop:20
},

approve:{
flex:1,
backgroundColor:"green",
padding:12,
borderRadius:10
},

reject:{
flex:1,
backgroundColor:"red",
padding:12,
borderRadius:10
},

buttonText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
}

});