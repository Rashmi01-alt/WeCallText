import { Menu, MenuButton, MenuDivider, MenuItem, MenuList} from '@chakra-ui/menu';
import { Tooltip } from '@chakra-ui/tooltip';
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay,DrawerBody } from '@chakra-ui/modal';
import React from 'react';
import { Button } from "@chakra-ui/button";
import { Box, Input, Text, useToast } from "@chakra-ui/react";
import { Spinner} from "@chakra-ui/spinner";

import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { useDisclosure } from '@chakra-ui/hooks'
import { Avatar } from "@chakra-ui/avatar";
import { useState } from "react";
import {ChatState} from "../../Context/ChatProvider";
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ChatLoading from '../ChatLoading';
import UserListItem from '../userAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import { Effect } from 'react-notification-badge';
import NotificationBadge from 'react-notification-badge';


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState("false");
  const [LoadingChat, setLoadingChat] = useState("");
  const { user,setSelectedChat,chats,setChats } = ChatState();
  const navigate = useNavigate();
   const { isOpen, onOpen, onClose } = useDisclosure();
const toast= useToast();
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate("/")
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      //we need to send jwt token so we need the header
      
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
// storing the data on the basis of the search query
      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
    
  const accessChat =async (userId) => {
    //since we r also sending some json data so it will contail content-type
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      // it will return a new chat that is created
      const { data } = await axios.post(`/api/chats`, { userId }, config);
      // but if the chat is already inside the chatstate tht we r fetching inside mychats, then we will append and update
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
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
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE } />
            <BellIcon fontSize='2xl' m={1}></BellIcon>
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No new messages"}
              {notification.map((notif) => (
                <MenuItem key={notif._id} onClick={() => {
                  setSelectedChat(notif.chat)
                  setNotification(notification.filter((n)=>n!==notif))
                }}>
                  {notif.chat.isGroupChat ? `New message in ${notif.chat.chatName}` :
                    `New message from ${getSender(user,notif.chat.users)}`}
                </MenuItem>
              )
              )}
            </MenuList>
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
      <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
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
              <Button 
             onClick={handleSearch}>
                Go</Button> 
            </Box>
             {loading ? (
              <ChatLoading/>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {LoadingChat && <Spinner ml="auto" d="flex" />}
        </DrawerBody>
        </DrawerContent>
       
      </Drawer>
    </>
  );
};

export default SideDrawer; 
