import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ReceipContext } from "../context/ReceipContext";
import { heighScreen, widtScreen } from "../Constant";

export const CreateRecipes = ({ onCancle, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('Easy');
    const [empty, setEmpty] = useState({ title: false, description: false });

    // const {  } = useContext(ReceipContext);
    const handleSubmit = async () => {
        console.log("Inside HandlerSubmit In Create Recipes");
        
        if (!title && !description) {
            console.log("Inside HandlerSubmit In Create Recipes");

            setEmpty((pre)=>({description:true,title:true}));
            Alert.alert("Fill The Receip");
            return;            
        }
        if (!description) {
            console.log("Inside HandlerSubmit In Create Recipes");

            setEmpty((pre)=>({...pre,description:true}));
            Alert.alert("Fill The Description");
            return;   
        }
        if (!title) {
            console.log("Inside HandlerSubmit In Create Recipes");

            setEmpty((pre)=>({...pre,title:true}));
            Alert.alert("Fill The Title");
            return;   
        }
    
       const success= await onSubmit({ title, description, difficulty });
       if(success.isExist)
       {
           setTitle('');
           setDescription('');
           Alert.alert("This Receip Exist")
       }

    }

    return (
        <View style={styles.parent}>
            <Text style={styles.title}>Creat Receip Here</Text>
            <TextInput style={[styles.input, { borderColor: empty.title ? "red" : "#E5B80B" }]} placeholder="Enter Title" value={title} onChangeText={(value) => { setTitle(value), setEmpty((pre) => ({ ...pre, title: false })) }} multiline={true} maxLength={100} numberOfLines={2} placeholderTextColor={"#F8E9D0"} />
            <TextInput style={[styles.input, { borderColor: empty.description ? "red" : "#E5B80B" }]} placeholder="Enter Description" value={description} onChangeText={(value) => { setDescription(value), setEmpty((pre) => ({ ...pre, description: false })) }} multiline={true} maxLength={2000} numberOfLines={5} placeholderTextColor={"#F8E9D0"} />
            <View style={styles.difficulty}>
                <Text style={[styles.diffcolour]}>Difficulty</Text>
                <Picker selectedValue={difficulty} onValueChange={(e) => setDifficulty(e)} style={styles.diffcolour} >
                    <Picker.Item label="Easy" value={'Easy'} style={styles.diffcolour} />
                    <Picker.Item label="Medium" value={'Medium'} style={styles.diffcolour} />
                    <Picker.Item label="Hard" value={'Hard'} style={styles.diffcolour} />
                </Picker>
            </View>
            <View style={styles.buttons}>
                <Pressable onPress={onCancle} style={[styles.buttonIndivisal, styles.canclebuttoncolours]}>
                    <Text style={{ color: "#F8E9D0" }}>Cancle</Text>
                </Pressable>
                <Pressable onPress={ handleSubmit} style={[styles.buttonIndivisal, styles.createbuttoncolours]}>
                    <Text style={{ color: "#9E2A2B" }}>Creat Receipes</Text>
                </Pressable>
            </View>
        </View>
    )



}

const styles = StyleSheet.create(
    {
        parent: {
            flex: 1,
            paddingTop: "5%",
            paddingLeft: "2%",
            flexDirection: "column",
            backgroundColor: "#2E2B28",
            color: "#F8E9D0"
        },
        title: {
            fontSize: 20,
            fontWeight: 500,
            marginBottom: "5%",
            color: "#F8E9D0"
        },
        input: {
            marginBottom: "4%",
            // borderColor:"#E5B80B",
            borderWidth: 2,
            borderRadius: 10,
            marginRight: "2%",
            color: "#F8E9D0"
        },
        difficulty: {
            fontSize: 10,
            color: "#F8E9D0",

        },
        diffcolour: {
            color: "#F8E9D0",
            backgroundColor: "#2E2B28",
        },
        buttons: {
            flexDirection: "row",
            gap: "5%"
        },
        buttonIndivisal: {
            width: widtScreen * 0.4,
            height: heighScreen * 0.04,
            borderWidth: 2,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
        }
        , canclebuttoncolours: {
            borderColor: "#E5B80B",
            backgroundColor: "#9E2A2B",
        },
        createbuttoncolours: {
            borderColor: "#9E2A2B",
            backgroundColor: "#E5B80B",
        }
    }
)