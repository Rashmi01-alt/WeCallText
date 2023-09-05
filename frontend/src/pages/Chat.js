import React from "react";
import { ChatState } from "../Context/ChatProvider";
import {Box} from "@chakra-ui/layout"
import SideDrawer from "../components/miscallaneous/SideDrawer";
import Mychats from "../components/Mychats";
import Chatbox from "../components/Chatbox";

const Chatpage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
       <Box
        d='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <Mychats />}
        {user && <Chatbox />}
  
      </Box> 
   </div>
  );
};



export default Chatpage;
