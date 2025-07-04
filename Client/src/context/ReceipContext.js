import axios, { Axios } from "axios";
import { createContext, useContext, useState } from "react";
import { Auth_Context } from "./ApiContext";
import { API_URL } from "../Constant";


export const ReceipContext = createContext();


export const ReceipProvider = ({ children }) => {


    const { token } = useContext(Auth_Context)
    //    const[receipuser,setReceipuser] = useState('');
    //  setReceipuser(userid);
    const createRecipesFunction = async (e) => {
        try {
            const { title, description, difficulty } = e;
            console.log('====================================');
            console.log("ReceipContext Argument", e);
            console.log('====================================');
            const success = await axios.post(`${API_URL}/api/auth/receip/create`, { title, description, difficulty },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            return success.data;

        } catch (error) {
            console.log('====================================');
            console.error("Error Responce",error?.response)
            console.log('====================================');
            if (error.response?.data.isExist) {
                return {isExist:error.response?.data.isExist}
            }
            
            return false;
        }
    }
    const allreceipdatafetch = async () => {
        try {

            console.log('====================================');
            console.log("ReceipContext Argument  allreceipdatafetch sssssss");
            console.log("ReceipContext Argument  Token", token);
            console.log('====================================');
            const success = await axios.get(`${API_URL}/api/auth/receip/allreceip`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            console.log("Recipe Succefully ", success);
            return success.data;

        } catch (error) {
            console.log('====================================');
            console.log("Error in ReceipContext", error);
            console.log('====================================');
            return false;
        }
    }

    const deletreceipdata = async (id) => {
        try {
            console.log("In Delete in COntext", id);

            const success = await axios.delete(`${API_URL}/api/auth/receip/deleat`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params:{ id }
                })
            if (success) {
                console.log("Success in the context of deleat",success);
                return true;

            }
        } catch (error) {
            console.log("Error in the context of deleat",error);
            console.log("Error in the context of deleat",error.message);
            return false;
        }
    }
    return (
        <ReceipContext.Provider value={{ createRecipesFunction, allreceipdatafetch, deletreceipdata }}>{children}</ReceipContext.Provider>
    )
}