import { Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Auth_Context } from '../context/ApiContext';

const width_ = Dimensions.get("screen").width;
const height_ = Dimensions.get("screen").height;
const Loginscreen = ({ navigation }) => {
  const routs = useRoute();
  const { email_id } = routs.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [empty,setEmpty] =useState({email:false,password:false})
  const { login } = useContext(Auth_Context);

  useEffect(() => {
    if (email_id) {
      setEmail(email_id);
    }
    console.log('====================================');
    console.log("Login Screen ", email_id);
    console.log('====================================');
  }, [email_id]);

  const handleLogIn = async () => {

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

      console.log("Inside Handlelog  Before call singin");

      const success = await login(email, password);
      console.log('====================================');
      console.log("Login page password fail");
      console.log('====================================');
      if(success?.isPasswordFail) 
      {
        setPassword('');
        Alert.alert(`Password is Incorrect`);
        return;
      }
      if (success) {
        console.log("Insside Seccess OF LoginScreen", success)
        Alert.alert(`Login Successfully`);
        navigation.navigate('home')
      } else {
        Alert.alert('Login Failed');
      }
    
  };

  return (
    <View style={styles.Parent}>

      <View style={styles.box}>
        <View style={styles.InputBox}>
          <Text style={styles.Heading}>Login</Text>
          <TextInput placeholder='Enter Email Here' style={[styles.Input,{ borderColor:empty.email?"red":"#2E8B57"}]} value={email} onChangeText={(value)=>{setEmail(value),setEmpty((pre)=>({...pre,email:false}))}} keyboardType='email-address' placeholderTextColor={"#F8E9D0"}></TextInput>
          <TextInput placeholder='Password' style={[styles.Input,{ borderColor:empty.password?"red":"#2E8B57"}]} value={password} onChangeText={(value)=>{setPassword(value),setEmpty((pre)=>({...pre,password:false}))}} secureTextEntry placeholderTextColor={"#F8E9D0"}></TextInput>
          <Pressable style={styles.Button} onPress={handleLogIn}>
            <Text>LogIn</Text>
          </Pressable>
        </View>

        <View style={styles.Parent2}>
          <Text style={{ color: "#F8E9D0" }}>If Already Sign In</Text>
          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text style={{ color: "#C99E10" }} >Create New</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  Parent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E2B28",
    color: "#F8E9D0"

  },
  box: {
    width: width_ * 0.7,
    height: height_ * 0.6,
    backgroundColor: "#2E2B28",
    alignItems: "center",
    justifyContent: "center"
    , borderColor: "#2E8B57",
    borderWidth: 2
  },
  Heading: {
    fontSize: 20,
    fontWeight: 600,
    color: "#F8E9D0"
  },
  Input: {
    width: "80%",
    height: "10%",
    borderRadius: 10,
    // borderColor: "#2E8B57",
    borderWidth: 2,
    color: "#F8E9D0"
  },
  InputBox: {
    width: "100%",
    height: "80%",
    flexDirection: 'column',
    gap: 20,
    alignItems: "center",
    justifyContent: "center"
  }
  ,
  Button: {
    width: "80%",
    height: "10%",
    borderRadius: 10,
    borderColor: "#2E8B57",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E8B57",
    color: "#F8E9D0"

  },
  Parent2: {
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center"
  }
});
