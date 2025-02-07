import React from 'react'
import { createUserWithEmailAndPassword ,signInWithPopup,GoogleAuthProvider,getAuth} from 'firebase/auth';
import  { Box, Flex,Divider, Spacer, IconButton, Input, InputGroup, InputRightElement, Circle, useColorMode, Avatar, Button, HStack, Image,Heading,Text, Grid } from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { auth,firestore } from './firebase-auth';
import { useNavigate } from 'react-router-dom';


import { doc, setDoc,getDoc } from 'firebase/firestore';


const SignUpPage = ({ handleSignupSuccess }) =>  {
    const [registerEmail, setRegisterEmail] = React.useState("")
    const [registerPassword ,setRegisterPassword] = React.useState("")
    const [registerUsername, setRegisterUsername] = React.useState("")
    const navigate = useNavigate();

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      
            if (userCredential && userCredential.user) {
              const user = userCredential.user;
      
              
              await setDoc(doc(firestore, "username", user.uid), {
                username: registerUsername,
              });
      
              console.log("User created successfully");
      
              const userData = {
                uid: user.uid,
                username: registerUsername,
                email: user.email,
                // Add other user data properties as needed
              };
      
              navigate('/convert');
              handleSignupSuccess(userData);
            }
          }




         catch (error) {
            console.log(error)
        }

    }

    const handleGoogleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const displayName = user.displayName;
    // Check if the user document exists in the Firestore collection
    const userDoc = await getDoc(doc(firestore, "username", user.uid));
    if (!userDoc.exists()) {
      console.log("Inside if(userdocexist):", userDoc.data(),user.displayName);
      // Create the user document if it doesn't existy
      const userData = {
        username: displayName, // Extract username from email
      };
      await setDoc(doc(firestore, "username", user.uid), userData);
    }

    // Perform the necessary actions upon successful sign-in
    handleSignupSuccess();
    navigate('/');
  } catch (error) {
    console.log("Google sign-in failed:", error);
  }
};



  return (
    <>
   <Box bg={'white'} >
    <Box  height="100vh"   position={"relative"} mt={6}
          ml={{ base: '10px' , md: '300px' }} display={'flex'} flexDirection={'row'}>
                <Grid templateColumns={{ base: '1fr', md: '3fr 3fr' }} bg={"white"} pt={0} pl={{base: '100px', md:"0px"}} >
                  <HStack>
                    <div>
                <Heading fontStyle={"normal"} fontWeight={"bold"} color="#0073c7" fontSize="5xl" p="40px 65px 35px 0px">
                      Sign Up
                    </Heading>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}  w="250px" h="45px" bg="#0073c7" borderRadius="4px" cursor={'pointer'} onClick={handleGoogleSignIn}>
                    <FaGoogle size="25px" />
                    <Text color="white" fontSize="md" lineHeight={"18px"}>
                      Sign Up with Google
                    </Text>

                  </Box>
               

                  <Text fontSize={"md"} color="blackAlpha.700" fontWeight={"400"} m="25px 0 10px 0">How social log in works</Text>
                  <Text w="300px" h="130px" color="blackAlpha.600" fontSize={'sm'}>By signing up, you agree to CodeSpace Terms of Service , Code of Conduct , and Privacy Policy .</Text>
</div>
                  <Box mt="100px" ml="55px" display="flex" flexDirection={'column'} alignItems="center" justifyContent="center">
  <Divider orientation="vertical" h="140px" borderColor="#9B9DAD" />
  
  <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mx="2" w="45px" h="50px" border="1px solid #9B9DAD" borderRadius="10px" textAlign="center">
    <Text fontSize="xl" fontWeight="bold" color="#9B9DAD">
      OR
    </Text>
  </Box>
  <Divider orientation="vertical" h="140px" borderColor="#9B9DAD" />
</Box>
         </HStack>      
         <Flex ml="70px" direction={"column"} justifyContent={'center'}>
      <Text color={"#0073c7"}>Username</Text>
      <Input placeholder="Username"  w="350px" color={"#0073c7"} h="45px" bg="#F0F5FF" borderRadius="4px" mt="10px" onChange={(event) => {setRegisterUsername(event.target.value)}} />
      <Text mt="10px" color={"#0073c7"}>Email</Text>
      <Input placeholder="Email" w="350px" h="45px" color={"#0073c7"} bg="#F0F5FF" borderRadius="4px" mt="10px" onChange={(event) => {setRegisterEmail(event.target.value)}} />
      <Text mt="10px" color={"#0073c7"}>Password</Text>
      <Input placeholder="Password" w="350px" h="45px" color={"#0073c7"} bg="#F0F5FF" borderRadius="4px" mt="10px" onChange={(event) => {setRegisterPassword(event.target.value)}}  />
      <Button w="350px" h="45px" colorScheme='blue' color="white" borderRadius="4px" mt="20px" bg="#0073c7" onClick={register}>Sign Up</Button>

    

    </Flex>
    </Grid>
    


   

  
    

    </Box>
    </Box>
   
  
    </>
  )
};

export default SignUpPage