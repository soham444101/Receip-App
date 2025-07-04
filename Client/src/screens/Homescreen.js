  import { Alert, Modal, Pressable, StyleSheet, FlatList, Text, View, TextInput, ScrollView } from 'react-native'
  import React, { useContext, useEffect, useState } from 'react'
  import { Auth_Context } from '../context/ApiContext'
  import { ReceipContext } from '../context/ReceipContext';
  import { CreateRecipes } from '../component/CreateRecipes';
  import { heighScreen, widtScreen } from '../Constant';
  import { ReceipList } from '../component/ReceipList';
  import { Colors } from 'react-native/Libraries/NewAppScreen';



  const Homescreen = ({ navigation }) => {
    const [visibal, setvisiabal] = useState(false);
    const [searchQue, setSearchQue] = useState('');
    const [newReceip, setnewReceip] = useState(false);
    const { logOut, userid } = useContext(Auth_Context);
    const { allreceipdatafetch, deletreceipdata, createRecipesFunction } = useContext(ReceipContext);
    const [receipe, setReceip] = useState([]);
    const handleLogout = async () => {

      try {
        Alert.alert('Logout', 'Are you want to sure logout?', [
          {
            text: 'Cancel', style: 'cancel'
          },
          {
            text: 'Logout', onPress: async () => {
              const success = await logOut();
              if (success) {

                navigation.replace("login");
              } else {
                Alert.alert("Logout Fail")
              }

            }
          }
        ])
      } catch (error) {
        console.error("Catch in Home  Logout");

      }
    }

    useEffect(
      () => {
        const Receip = async () => {
          // All Receip Data Here
          console.log("Home USeEfect Call");
          console.log("Home USeEfect Call");

          try {
            const success = await allreceipdatafetch();
            if (success.success) {
              setReceip(success.data);
              // Alert.alert("Data Get In Home OF ALL Receip")
              console.log('====================================');
              console.log("Home", success);
              console.log('====================================');
            }
          } catch (error) {
            console.log("Error in Home Screen All Receip Function", error)
          }

        }
        Receip();
      }, [newReceip])
    // Alert.alert("Home newReceip",newReceip);

    const handleReceipScreen = (item) => {
      navigation.navigate('receipe', { receip: item });
    }
    const handleReceipDelete = async (id) => {
      try {
        console.log("Id In Home", id);
        Alert.alert('Deleat Receip', 'Are you want to sure ?', [
          {
            text: 'Cancel', style: 'cancel'
          },
          {
            text: 'Deleat', onPress: async () => {
              const success = await deletreceipdata(id);
              if (success) {
                console.log("Success oF Deleat in Home");
                setnewReceip(pre => !pre)
              } else {
                console.log("Fail oF Deleat in Home");

              }

            }
          }
        ])
      } catch (error) {
        console.log("Error Or Catch in Home Deleat Function page",error);
      }

    }
    const handleCeateReceip = async ({ title, description, difficulty }) => {
      // try {
      if (title && description) {
        const e = {
          title: title,
          description: description,
          difficulty: difficulty
        }
        //             // Alert.alert("Submit in Create submit")
        //             const Submit = await onSubnit(e);
        //             return;   
        //         } 
        // } catch (error) {
        //     console.log("Error in The CreateReceipes Catch")
        // } 


        try {
          const success = await createRecipesFunction(e);
          // console.log("Success in Home");
          console.log("Success in Home", success);
          
        if(success.isExist) return {isExist:true}
            Alert.alert("Receipe Created Succefully")
            setvisiabal(false)
            setnewReceip(pre => !pre)
        
          setvisiabal(false);
          return true;
        } catch (error) {
          
          console.log('====================================');
          console.log("Error in Success In trycatch Home", error);
          console.log('====================================');
          
          Alert.alert("Try Again Error Occure",)
          
          return false;
        }
      }
    }
    return (
      <View style={styles.body}>
        <View style={styles.navbar}>
          <TextInput value={searchQue} onChangeText={setSearchQue} style={styles.searchInput} placeholder='Search Here' placeholderTextColor={"#F8E9D0"} />
          <Pressable onPress={() => setvisiabal(true)} style={styles.modelSign}>
            <Text style={{ color: "#6D4C41" }}>+</Text>
          </Pressable>
          <Pressable onPress={handleLogout} style={styles.logOut}>
            <Text style={{ color: "#6D4C41", fontSize: 15, fontWeight: 800 }}>Logout</Text>
          </Pressable>
        </View>
        <View>
          {/* Componenet here */}
          
          {receipe && <FlatList
            data={receipe.filter((item) =>
              item.title.toLowerCase().includes(searchQue.toLowerCase())
            )}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (

              <Pressable style={[styles.parent]} onPress={() => handleReceipScreen(item)} >
                <View style={styles.parent2}>
                  <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                  <Text numberOfLines={3} style={styles.description}>Description:  {item.description}</Text>
                  <Text style={[styles.difficulty,{color:item.difficulty==='Easy'? "#2E8B57": item.difficulty==='Medium'? "#E5B80B":"#C99E10"} ]} >{item.difficulty}</Text>
                </View>
                {item.user == userid &&
                  <Pressable style={styles.deleteButton} onPress={() => handleReceipDelete(item._id)}>
                    <Text style={{ color: '#D72638', fontSize: 15, fontWeight: 800 }}>Delete</Text>
                  </Pressable>}

              </Pressable>

            )}
     
          />
          }
          {/* Model */}
          <Modal
            visible={visibal}
            animationType='slide'
            onRequestClose={() => setvisiabal(false)}
            style={styles.modelstyle}

          >
            <CreateRecipes onCancle={() => setvisiabal(false)} onSubmit={(e) => handleCeateReceip(e)} />
          </Modal>
        </View>
      </View >
    )
  }

  export default Homescreen

  const styles = StyleSheet.create({
    body: {
      backgroundColor: "#2E2B28",
      color: "#F8E9D0",
      height:heighScreen
    },
    modelstyle: {
      flex: 1,
      backgroundColor: "#2E2B28"
    }
    , navbar: {
      display: "flex",

      width: widtScreen,
      height: heighScreen * 0.08,
      flexDirection: "row",
      gap: 10,
      alignItems: "center"
    },
    searchInput: {
      width: "60%",
      height: "60%",
      marginLeft: "5%",
      borderRadius: 10,
      borderColor: "#E5B80B",
      borderWidth: 2,
      color:"#F8E9D0"

    },
    modelSign: {
      width: widtScreen * 0.08,
      height: widtScreen * 0.08,
      borderRadius: 20
      ,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E5B80B"
    },
    logOut: {
      width: "21%",
      padding: "10",
      borderRadius: 20
      , backgroundColor: "#E5B80B",
      alignItems: "center",
      justifyContent: "center"

    },
    parent: {
      width: widtScreen * 0.9,
      height: 'auto',
      marginHorizontal: "auto",
      marginTop: '5%',
      paddingVertical: '2%',
      paddingHorizontal: '5%',
      borderWidth: 2,
      borderColor: "#E5B80B",
      display: "flex",
      flexDirection: "row",
      justifyContent:"space-between",
      backgroundColor: "#2E2B28",
      // backgroundColor:"yellow",

      color: "#F8E9D0"

    },
    parent2: {
      position: "relative",
      width: "70%",
      margin:0,
      // backgroundColor:"red"
    },
    deleteButton: {
      borderColor: "#D72638",
      // backgroundColor: "#D72638",
      borderWidth: 2,
      width: widtScreen * 0.15,
      height: heighScreen * 0.03,
      alignItems: "center",
      justifyContent: "center",
      //  color:"#F8E9D0",
      marginTop: '5%'
    },
    title: {
      fontSize: 18,
      fontWeight: 600,
      color: "#F8E9D0"
    },
    difficulty: {
      fontSize: 14,
      fontWeight: 800,
      marginVertical: "2%",
      
    },
    description: {
      fontSize: 15,
      color: "#F8E9D0"
    }

  })