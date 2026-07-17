import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../services/supabase";


export default function BusinessDetails(){

  const { id } = useLocalSearchParams();

  const [business,setBusiness] = useState(null);
  const [reviews,setReviews] = useState([]);


  useEffect(()=>{
    loadBusiness();
    loadReviews();
  },[]);



  async function loadBusiness(){

    const {data,error}=await supabase
      .from("businesses")
      .select("*")
      .eq("id",id)
      .single();


    if(error){
      console.log(error);
      return;
    }


    setBusiness(data);

  }



  async function loadReviews(){

    const {data,error}=await supabase
      .from("reviews")
      .select("*")
      .eq("business_id",id)
      .order("created_at",{ascending:false});


    if(error){
      console.log(error);
      return;
    }


    setReviews(data || []);

  }



  if(!business){

    return(
      <View style={styles.loading}>
        <ActivityIndicator size="large"/>
      </View>
    );

  }



  return(

    <ScrollView style={styles.container}>


      <Text style={styles.name}>
        {business.name}
      </Text>


      <Text style={styles.category}>
        {business.category}
      </Text>


      <Text style={styles.rating}>
        ⭐ {business.rating || "No rating"}
      </Text>


      <Text style={styles.description}>
        {business.description}
      </Text>


      <Text style={styles.heading}>
        Reviews
      </Text>



      {reviews.length === 0 &&

        <Text>
          No reviews yet. Be the first!
        </Text>

      }



      {reviews.map((review)=>(

        <View 
          key={review.id}
          style={styles.review}
        >

          <Text style={styles.stars}>
            {"⭐".repeat(review.rating || 0)}
          </Text>


          <Text style={styles.comment}>
            {review.comment}
          </Text>


          <Text>
            - {review.name || "Guest"}
          </Text>


        </View>

      ))}



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


category:{
fontSize:20,
marginTop:8
},


rating:{
fontSize:18,
marginTop:15
},


description:{
fontSize:17,
marginTop:20
},


heading:{
fontSize:26,
fontWeight:"bold",
marginTop:30,
marginBottom:15
},


review:{
padding:15,
borderWidth:1,
borderRadius:10,
marginBottom:15
},


stars:{
fontSize:18
},


comment:{
fontSize:16,
marginVertical:10
}


});