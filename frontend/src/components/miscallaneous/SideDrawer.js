import { Button, Tooltip } from '@chakra-ui/react';
import React from 'react'
import {Box} from "@chakra-ui/layout"
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState("false");
  const [loadingChat, setloadingChat] = useState("");
  
  return (
    <Box
      d='flex'
      justifyContent='space-between'
      alignItems='centre'
      bg='white'
      w='100%'
      p='5px 10px 5px 10px'
      borderWidth='5px'
    >
      <Tooltip label='search users to chat' hasArrow placement='bottom-end'>
        <Button variant='ghost '>
          <i class="fa-solid fa-magnifying-glass">

          </i>
          <Text d={{ base: "none", md: "flex" }} px='4px'>
            Search User </Text>
        </Button>
      </Tooltip>
      <Text fontSize='2xl' fonyFamily='work sans'>
        We-Call-Text
      </Text>
      <div>
        
      </div>
    </Box>
  );
};

export default SideDrawer; 
