import React from "react";
import QRCode from "react-native-qrcode-svg";


export default function QRCodeGenerator({propertyId}){


const url = 
`https://guestbook.app/guest/${propertyId}`;


return(

<QRCode

value={url}

size={200}

/>

);

}