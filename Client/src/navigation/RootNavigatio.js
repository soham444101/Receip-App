import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Loginscreen from "../screens/Loginscreen";
import SignupScreen from "../screens/SignupScreen";
import Homescreen from "../screens/Homescreen";
import ReceipScreen from "../screens/ReceipScreen";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Auth_Context } from "../context/ApiContext";


// export const  RootStackParamsList ={
//     login:undefined,
//     signup:undefined,
//     home:undefined,
//     receipedetails:{recepiId : String},
// }
const Stack = createNativeStackNavigator();




const Rootnavigation = () => {
    // const navigation = useNavigation();
    // const [screens, setScreen] = useState("login" | "home");
    const navigate = useNavigation(); // Only work inside the Screen not inside the ro
    const { Authenticate, loading } = useContext(Auth_Context);

    useEffect(() => {
        if (loading) return;


        // used this is only screen component
        navigate.reset(
            {
              index:0,
              routes:[{name: Authenticate?'home':'login'}]  
            }
        )
     
    }, [Authenticate,loading])

    return (
        <Stack.Navigator initialRouteName={Authenticate ? "home" : "login"}>
            
            <Stack.Screen name="login" component={Loginscreen} options={{headerShown: false }}/>
            <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="home" component={Homescreen} options={{ headerShown: false }}/>
            <Stack.Screen name="receipe" component={ReceipScreen} options={{ headerShown: false}}/>

        </Stack.Navigator>
    )
}

export default Rootnavigation;