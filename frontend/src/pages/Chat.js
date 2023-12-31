import React from "react";
import { useState } from "react";
import {Box} from "@chakra-ui/layout"
import SideDrawer from "../components/miscallaneous/SideDrawer";
import Mychats from "../components/Mychats";
import Chatbox from "../components/Chatbox";
import {ChatState} from "../Context/ChatProvider";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
       <Box
        display ='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <Mychats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
  
      </Box> 
   </div>
  );
};



export default Chatpage;
