import { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from "react-native";
import { API_URL } from "../Constant";





export const Auth_Context = createContext();

export const AuthProvider = ({ children }) => {



    const [token, setToken] = useState("")
    const [userid, setUserid] = useState("");
    const [loading, setLoading] = useState(true);
    const [Authenticate, setAuthenticate] = useState(false);
    useEffect(
        () => {
            checkAuth();
        }, [])


    const checkAuth = async () => {
        try {
            const gettoken = await AsyncStorage.getItem('token');
            const getuser = await AsyncStorage.getItem('user');
            console.log("ASync Token ", gettoken);

            if (gettoken && getuser) {
                const tokenVerify = await axios.get(`${API_URL}/api/auth/verify-token`, {
                    headers: {
                        Authorization: `Bearer ${gettoken}`,
                    }
                })


                if (tokenVerify.data.success && getuser) {
                    setAuthenticate(true);
                    setToken(gettoken);
                    setUserid(getuser);
                    return true;
                }


            }
            //   console.log('====================================');
            //   console.log("Token Verify ",tokenVerify);
            //   console.log("Token Verify ",tokenVerify.data);
            //   console.log("Token Verify ",tokenVerify.data.success);
            //   console.log('====================================');

            logOut();
            return false;

        } catch (error) {
            console.log("Error Due To checkAuth ", error);
            return false;
        } finally {
            setLoading(false);

        }
    }
    const login = async (email, password) => {

        try {
            console.log("Before Axios Call ");
            // console.log("Email",email);
            // console.log("Password",password);

            const sendRequest = await axios.post(`${API_URL}/api/auth/login`, { email, password });

            const { token, user_id, success } = sendRequest.data;
            // console.log("Successs",success);
            console.log("Successs", sendRequest);
            if (success) {
                await AsyncStorage.setItem('token', token);

                await AsyncStorage.setItem('user', user_id);
                setUserid(user_id);
                setToken(token);
                setAuthenticate(true);
                return true;
            } else {
                console.error("Success is not come drom axios");
            }
        } catch (error) {
            console.log("Errro Occure Due To Axios");
            // This iS issue no such we get here
            console.log("Errro Occure Due To Axios", error.response?.data.isExist);

            if (axios.isAxiosError(error)) {
                console.error("Error Responce", error);

            }
            // console.log("Error Box in Login",error.response?.data?.isPasswordFail);

            if (error.response?.data?.isPasswordFail) {
                console.log("Password Fail", isPasswordFail);
                return { isPasswordFail: true }

            }

            return false;
        }
        return false;

    }
    const signUp = async (email, password) => {

        try {
            const sendRequest = await axios.post(`${API_URL}/api/auth/register`, { email, password });

            // console.log("Success SignIn ",success);
            // console.log("Data   ",sendRequest);

            if (sendRequest?.data?.success) {
                return sendRequest?.data?.User;
            } else {
                console.error("Success is not come drom axios");
            }
        } catch (error) {
            console.error("Errro Occure Due To Axios");

            // is axois.isAxiosError check that the error come from server not from our typo and invalide network access, anyone ad refernce
            if (axios.isAxiosError(error)) {
                console.error("Error Responce", error?.response);
                if (error.response?.data.isExist) {
                    return { isExist: error.response?.data.isExist }
                }
            }

            return false;

        }
        return false;
    }
    const logOut = async () => {
        try {
            console.log("Logout Function");
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            setAuthenticate(false);
            setToken(null);
            setUserid(null);
            return true;
        } catch (error) {
            console.error("Error In LOgout ", error);
        }

    };

    if (loading) return <><ActivityIndicator animating={loading} size={"large"} color="grey"></ActivityIndicator></>
    return <Auth_Context.Provider value={{ logOut, login, signUp, token, userid, loading, checkAuth, Authenticate }}>{children}</Auth_Context.Provider>

}