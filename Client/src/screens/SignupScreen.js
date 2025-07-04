import { Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Auth_Context } from '../context/ApiContext';
const width_= Dimensions.get("screen").width;
const height_= Dimensions.get("screen").height;

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [empty,setEmpty] =useState({email:false,password:false})
  const { signUp } = useContext(Auth_Context);
  const handleSignIn = async () => {
    haserror=false;
      if (!email.trim()) {
        setEmpty((pre)=>({...pre ,email:true}));
        haserror=true;
      }
      if (!password.trim()) {
        setEmpty((pre)=>({...pre,password:true}));
        haserror=true; 
      }
       

     if(haserror) return;

      const success = await signUp(email, password);
      if(success.isExist)
      {
        Alert.alert("User Already Exist");
        navigation.navigate('login', { email_id: email })
        return;
      }
      if (success) {
        // console.log('====================================');
        // console.log("Handlelogin",success.email);
        // console.log('====================================');
        Alert.alert('User Register Successfuly , Login The User');

        navigation.navigate('login', { email_id: success.email });
      } else {
        Alert.alert("Sign In Failed , Try Again")
      }
    
    // else {
    //   Alert.alert('Enter the Credential Properly');
    // }
  }
  return (
    <View style={styles.Parent}>

      <View style={styles.box}>
       <View style={styles.InputBox}>
       <Text style={styles.Heading}>Sign Up</Text>
        <TextInput placeholder='Enter Email Here' style={[styles.Input,{ borderColor:empty.email?"red":"#E5B80B"}]} value={email} onChangeText={(value)=>{setEmail (value), setEmpty((pre)=>({...pre,email:false}))}} keyboardType='email-address' placeholderTextColor={"#F8E9D0"}></TextInput>
        <TextInput placeholder='Password' style={[styles.Input,{ borderColor:empty.password?"red":"#E5B80B"}]} value={password} onChangeText={(value)=>{setPassword(value), setEmpty((pre)=>({...pre,password:false}))}} secureTextEntry placeholderTextColor={"#F8E9D0"}></TextInput>
        <Pressable style={styles.Button} onPress={ handleSignIn}>
          <Text style={{color:"#F8E9D0"}}>Sign Up</Text>
        </Pressable>
       </View>
        <View style={styles.Parent2}>
          <Text style={{color:"#F8E9D0"}}>If Already Sign In</Text>
          <Pressable onPress={() => navigation.navigate('login')}>
            <Text style={{color:"#2E8B57"}}>LogIn</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  Parent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center" ,
    backgroundColor:"#2E2B28",
    color:"#F8E9D0"
 
  },
  box:{
    width:width_*0.7,
    height:height_*0.6,
    backgroundColor:"#2E2B28",
    alignItems:"center",
    justifyContent:"center"
    ,borderColor:"#E5B80B",
    borderWidth:2
  },
  Heading: {
  fontSize:20,
  fontWeight:600,
  color:"#F8E9D0"
  },
  Input: {
    width:"80%",
    height:"10%",
    borderRadius:10,
    borderWidth:2,
    backgroundColor:"#2E2B28",
    color:"#F8E9D0"
  },
  InputBox:{
    width:"100%",
    height:"80%",
    flexDirection:'column',
    gap:20,
     alignItems:"center",
    justifyContent:"center"
  }
  ,
  Button: {
    width:"80%",
    height:"10%",
    borderRadius:10,
    borderColor:"#FF9F45",
    backgroundColor:"#C99E10",
    borderWidth:2,
    alignItems: "center",
    justifyContent: "center",
    color:"#F8E9D0"    
  },
  Parent2: {
    width:"80%",
    height:"10%", 
    alignItems: "center",
    justifyContent: "flex-start",
   
  }
})