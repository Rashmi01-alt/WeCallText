import { Menu, MenuButton, MenuDivider, MenuItem, MenuList} from '@chakra-ui/menu';
import { Tooltip } from '@chakra-ui/tooltip';
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay,DrawerBody } from '@chakra-ui/modal';
import React from 'react';
import { Button } from "@chakra-ui/button";
import { Box, Input, Text } from "@chakra-ui/react";

import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { useDisclosure } from '@chakra-ui/hooks'
import { Avatar } from "@chakra-ui/avatar";
import { useState } from "react";
import {ChatState} from "../../Context/ChatProvider";
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState("false");
  const [loadingChat, setloadingChat] = useState("");
  const { user } = ChatState();
  const navigate = useNavigate();
   const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate("/")
  };

  return (
    <>
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='centre'
      bg='white'
      w='100%'
      p='5px 10px 5px 10px'
      borderWidth='5px'
    >
      <Tooltip label='search users to chat' hasArrow placement='bottom-end'>
        <Button variant='ghost ' onClick={onOpen}>
            < Search2Icon m={2} />
            
          <Text d={{ base: "none", md: "flex" }} px='4px'>
            Search User </Text>
        </Button>
      </Tooltip>
      <Text fontSize='2xl' fontFamily='work sans'>
        We-Call-Text
      </Text>
      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize='2xl' m={1}></BellIcon>
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}>
            <Avatar size="sm" cursor="pointer" name={user.name}
              src={user.pic} />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user} >
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider/> 
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
      </Box>
      <Drawer placement='left' onOpen={onOpen} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
           <DrawerBody>
          <Box display='flex' pb={2}>
            <Input
              placeholder='search by name or email'
              mr={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)} />
            {/* <Button onClick={handleSearch}>Go</Button> */}
      </Box>
        </DrawerBody>
        </DrawerContent>
       
      </Drawer>
    </>
  );
};

export default SideDrawer; 
