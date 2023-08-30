import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    let navigate = useNavigate();
    //fetching local storage in stringify form and then parsing it
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!userInfo) { navigate("/")}
    },[navigate])

    return <ChatContext.Provider value={{user,setUser}}>{children}</ChatContext.Provider>
};
export const ChatState = () => {
    return useContext(ChatContext);
}; 




export default ChatProvider;