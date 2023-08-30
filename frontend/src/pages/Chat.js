import React from "react";
import { ChatState } from "../Context/ChatProvider";
//import {Box} from "@chakra-ui/layout"
import SideDrawer from "../components/miscallaneous/SideDrawer";

const Chatpage = () => {
  const { user } = ChatState();
  return <div style={{ width: "100%" }}>
    {user && <SideDrawer/>}
    {/* // <Box>
    //   {user && <MyChats/>}
    // </Box>
    //  */} 
  </div>;
};

export default Chatpage;
