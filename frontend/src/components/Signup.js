import { React, useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
 
  const handleClick = () => setShow(!show);
  
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = async (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    let result;
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat_app");

      return axios
        .post(`https://api.cloudinary.com/v1_1/djmeoiigc/image/upload/`, data, {
          onUploadProgress: (ProgressEvent) => {},
        })
         .then((res) => res.json())
         
        .then(({data}) => {
          
          data.secure_url = "" + data.secure_url;
          setPic(data.secure_url.toString());
          console.log(data.url.toString());
          console.log("UPLOAD COMLETE: " + JSON.stringify(result));

          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/registerUser",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };
  return <VStack spacing='5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) =>setName(e.target.value)}/>
            
        </FormControl>
        <FormControl id='email1' isRequired>
            <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    onChange={(e) =>setEmail(e.target.value)}/>
            
        </FormControl>
        <FormControl id='password1' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show ? 'text':'password'}
                    placeholder='Enter Your Password'
                    onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? "Hide":"Show"}

                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
         <FormControl id='confirmpassword' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show ? 'text':'password'}
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmpassword(e.target.value)} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? "Hide":"Show"}

                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
         <FormControl id='pic' isRequired>
            <FormLabel>Upload your Picture</FormLabel>
            <Input
                    type='file'
                p={1.5}
                accept='image/*'
                    onChange={(e) =>postDetails(e.target.files[0])}/>
            
        </FormControl>
        <Button
            colorScheme='blue'
            width='100%'
            style={{ marginTop: 15 }}
            onClick={submitHandler}
        isLoading={picLoading}>
            Signup
        </Button>
      </VStack>
}

export default Signup;
