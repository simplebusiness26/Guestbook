import React, {useEffect, useState} from "react";

import {
View,
Text,
StyleSheet,
Pressable
} from "react-native";

import {supabase} from "../services/supabase";

import {router} from "expo-router";


export default function Profile(){

const [profile,setProfile]=useState(null);