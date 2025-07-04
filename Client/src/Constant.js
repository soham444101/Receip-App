import { Dimensions } from "react-native";

const API_URL = 'http://10.0.2.2:5000';
const widtScreen= Dimensions.get("screen").width;
const heighScreen= Dimensions.get("screen").height;
export{
    API_URL,
    heighScreen,
    widtScreen
}