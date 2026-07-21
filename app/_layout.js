import React from "react";

import { Stack } from "expo-router";


export default function Layout(){

return(

<Stack

screenOptions={{

headerShown:false

}}

>

<Stack.Screen name="index" />

<Stack.Screen name="map" />

<Stack.Screen name="scan" />

<Stack.Screen name="saved" />

<Stack.Screen name="profile" />


<Stack.Screen name="auth/signup" />

<Stack.Screen name="auth/login" />


<Stack.Screen name="business/dashboard" />

<Stack.Screen name="business/reviews" />

<Stack.Screen name="property/dashboard" />

<Stack.Screen name="property/reviews" />


<Stack.Screen name="admin/claims" />

</Stack>

);

}