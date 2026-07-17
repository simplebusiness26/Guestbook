import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../services/supabase";


export default function BusinessDetails() {

  const { id } = useLocalSearchParams();

  const [business, setBusiness] = useState(null);


  useEffect(() => {
    loadBusiness();
  }, []);


  async function loadBusiness() {

    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();


    if(error){
      console.log(error);
      return;
    }


    setBusiness(data);

  }


  if(!business){

    return (

      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>

    );

  }


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        {business.name}
      </Text>


      <Text style={styles.category}>
        {business.category}
      </Text>


      <Text style={styles.description}>
        {business.description}
      </Text>


      <Text style={styles.address}>
        📍 {business.address}
      </Text>


    </View>

  );

}



const styles = StyleSheet.create({

container:{
flex:1,
padding:25
},

title:{
fontSize:30,
fontWeight:"bold"
},

category:{
fontSize:20,
marginTop:10
},

description:{
fontSize:18,
marginTop:20
},

address:{
fontSize:16,
marginTop:20
}

});