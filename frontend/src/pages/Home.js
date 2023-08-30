import React from 'react';
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import Login from '../components/Login'
import Signup from '../components/Signup'
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";

const Homepage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user)
      navigate("/chats");
  },[navigate]);
  return (
    <Container maxW='xl' centerContent >
      <Box
        d='flex'
        textAlign='center'
        justifyContent='center'
        p={3}
        bg={'white'}
        w='100%'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'>
        
        <Text fontSize='4xl' fontFamily='Bricolage+Grotesque' marginRight='40px'>Talk-A-Tive
        </Text>
      </Box>
      <Box bg='white' w='100%' p={4} borderWidth='1px'>
      <Tabs variant='soft-rounded'>
  <TabList>
    <Tab color='black' width='50%'>Login</Tab>
    <Tab color='black' width='50%'>Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel >
        <Login/>    
    </TabPanel>
    <TabPanel>
         <Signup/>
    </TabPanel>
  </TabPanels>
      </Tabs>
    </Box>
    </Container>
  )
   
  
}

export default Homepage;