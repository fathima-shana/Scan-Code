import { Box, Button, Divider, Flex, Grid, HStack, Heading, IconButton, Image, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import computer from '../../assets/Programming-cuate (2).png'
import Instruction1 from '../../assets/Image folder-cuate.png'
import Instruction2 from '../../assets/Image upload-cuate.png'
import Instruction3 from '../../assets/Code snippets-cuate.png'
import Instruction5 from '../../assets/Mention-cuate.png'

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Container } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

import { useContext } from 'react';
import AuthContext from '../../pages/UserPages/AuthContext';

 // Set the root element for accessibility
const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
   
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Perform form validation here
  
      // Reset the form
      setName('');
      setEmail('');
      setMessage('');
    };
  
    return (
        <div>
          <Flex w="100%" h="90vh" align={"center"} justify={"center"} gap={15}>
          <Image src={Instruction5} alt="Image"  h={{base:'350px', md:'500px'}} w={{base:'350px', md:'500px'}} />  
     
        <VStack alignItems={'self-start'} gap={4}> 
        <Heading color={'black'}>Contact Us</Heading>
          
 
<Input
  type="text"
  id="name"
  placeholder="Name"
  bg="#F0F5FF"
  p="10px"
  width="300px"
  height="40px"
  color= "black"
  borderRadius="10px"
  value={name}
  onChange={(e) => setName(e.target.value)}
  isRequired
  _placeholder={{
    color: "black",
    opacity: 1
  }}
/>

<Input
  type="text"
  id="email"
  placeholder="Email"
  color= "black"
  bg="#F0F5FF"
  p="10px"
  width="300px"
  height="40px"
  borderRadius="10px"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  isRequired
  _placeholder={{
    color: "black",
    opacity: 1
  }}
/>


<Textarea
  id="message"
  placeholder="Message"
  bg="#F0F5FF"
  color="black"
  p="10px"
  width="300px"
  height="120px"
  borderRadius="10px"
  onChange={(e) => setMessage(e.target.value)}
  isRequired
  _placeholder={{
    color: "black",
    opacity: 1
  }}
  sx={{
    resize: "none",
    textAlign: "left",
    lineHeight: "normal",
    alignItems: "flex-start",
  }}
/>

        <Button  color={"white"} bg={"#0073c7"} w={100} >Send</Button>
        </VStack>
        </Flex>
        </div>
        
     
    );
  };
  
 
 
const PracQues = () => {
  const { isRegistered } = React.useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleButtonClick = () => {
    window.location.href = '/convert';
  };

  const handleLoginPrompt = () => {
    setShowLoginPrompt(true);
  };

  // const handleModalClose = () => {
  //   setShowLoginPrompt(false);
  // };

  // const renderLoginModal = () => {
  //   return (
  //     <div
  //       style={{
  //       position: 'fixed',
  //       top: '50%',
  //       left: '50%',
  //       transform: 'translate(-50%, -50%)',
  //       background: 'linear-gradient(to right top, #F0F5FF, #0073c7)',
  //       width: '400px',
  //       padding: '20px',
  //       color: '#fff',
  //       textAlign: 'center',
  //     }}
  //     >
  //       <h2>Please Log In</h2>
  //       <p>Please log in to perform this action.</p>
  //       <HStack mt={10} ml={10} spacing={20}>
  //       <Link to={'/login'}><button
  //         style={{
  //           backgroundColor: '#0073c7',
  //           color: '#F0F5FF',
  //           padding: '10px 20px',
  //           border: 'none',
  //           cursor: 'pointer',
  //           borderRadius: '15px'

  //         }}
  //         onClick={handleModalClose}
  //       >
  //         <b>Log In</b>
  //       </button>
  //       </Link> 
  //       <button
  //         style={{
  //           backgroundColor: '#0073c7',
  //           color: '#F0F5FF',
  //           padding: '10px 20px',
  //           border: 'none',
  //           cursor: 'pointer',
  //           borderRadius: '15px'

  //         }}
  //         onClick={handleModalClose}
  //       >
  //         <b>Close</b>
  //       </button>
  //       </HStack>
  //     </div>
  //   );
  // };
  const navigate = useNavigate();
  const handleAction = () => {
    if (isRegistered) {
      navigate('/convert')
    } else {
      navigate('/signup')
    }
  };
    
    
    return (

        
        <div >
            <Box bg={"white"} pt={50} >
    

        <Grid templateColumns={{ base: '1fr', md: '2fr 2fr' }} mt={30} mr={50} >

<div >
<Image src={computer} alt="Image" ml={20} mt="-15px" width="80%" height="110%" />  

</div>
<div   > 


    <Heading mt={{base: '10px', md:'200px'}} fontSize='48px' fontWeight={700} color='black' lineHeight="58px">Execute Your Written Code In Seconds </Heading>
    <Text fontSize='15px' mt="18px" color='#121316' mr="100px" width={450} lineHeight="26px">Experience Code Extract: Simplify code compilation. Unleash creativity, learn new languages. Transform images into code snippets now!
</Text>
    <div>
      <Button colorScheme="facebook" h="48px" w="190px" mt={2} color={"white"} bg="#0073C7" onClick={handleAction}>Upload</Button>
     
      </div>

</div>
</Grid>


<Text mt={28} align={"center"} fontSize='30px' fontWeight={'bold'} color={"black"}>How to Convert Image Formats</Text>
            <Text mt={2} align={"center"} fontSize='16px'   color={"black"}>With the CodeExtract image format converter, you get a free convenient tool to switch between<br/>
the hand written code to digital in the simplest way possible.</Text>
<Flex align={"center"} justify={"center"} ml={25}>       
<Grid templateColumns={{ base: '1fr', md: '2fr 2fr' }} bg={"white"} pt={10} rowGap={25}>
<div  > 

    <Text fontSize='28px' fontWeight={'semibold'} color='black' ml={40}>1. Select</Text>
    <Text fontSize='16+px' color='black'ml={40}>To start off, click the “Sign up” and create your<br/>Code Extract account. Then, click the "Upload Image"<br/> and select the format for your
desired outcome</Text>

</div>
<div >
<Image src={Instruction1} alt="Image" ml={20} mt="-35px" h="350px" w="350px" />  

</div>

<div >
<Image src={Instruction2} alt="Image" ml={200} mt="-75px" h="400px" w="400px" />  

</div>
<div  > 
  
    <Text fontSize='28px' fontWeight={'semibold'} color='black' ml={0}>2. Upload</Text>
    <Text fontSize='16+px' color='black'ml={0}>After get started click on the "Upload Image"<br/> button to select the image containing the handwritten <br/>code you want to compile or just drag and drop your image there
</Text>

</div>



<div  > 
    <Text fontSize='28px' fontWeight={'semibold'} color='black' ml={40}>3.Convert</Text>
    <Text fontSize='16+px' color='black'ml={40}>After get started click on the "Upload Image"<br/> button to select the image containing the handwritten <br/>code you want to compile or just drag and drop your image there
</Text>

</div>
<div >
<Image src={Instruction3} alt="Image" ml={20} mt="-35px"  h="350px" w="350px" />  

</div>


</Grid>
</Flex> 

<Box  borderWidth={5} p={5}>
<ContactForm/>
</Box>
<Box
    as="footer"
    role="contentinfo"
    py={{
      base: '12',
      md: '16',
    }}
    color={"black"}
    w="100%"
    px={20}
    bg="#F0F5FF"
  >

    

      <Flex justify="space-between" direction="row"   bg="#F0F5FF">
      <HStack  >
        <Text color={'black'} fontSize={24} fontWeight={600}>Code</Text>
        <Text color={'black'} fontSize={24} fontWeight={300}>Extract</Text>
        </HStack>
        <ButtonGroup variant="tertiary">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.75rem" />}
          />
          <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="1.75rem" />} />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.75rem" />}
          />
        </ButtonGroup>
      </Flex>
      <Text fontSize="sm" color="fg.subtle">
        &copy; {new Date().getFullYear()} Code Extract, Inc. All rights reserved.
      </Text>

  </Box>
        
        </Box>
       </div>
      
        );
};



export default PracQues