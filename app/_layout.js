import React from "react";
import { Tabs } from "expo-router";

export default function Layout() {

  return (

    <Tabs
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:"#000000"
      }}

    >

      <Tabs.Screen
        name="index"
        options={{
          title:"Home"
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title:"Map"
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title:"Scan"
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title:"Saved"
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title:"Profile"
        }}
      />

    </Tabs>

  );

}