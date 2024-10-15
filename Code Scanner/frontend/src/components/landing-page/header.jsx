import React, { useState } from 'react';
import { Box, Flex, Spacer, IconButton, useColorMode, Button, HStack, Image, Text } from '@chakra-ui/react';
import { FaChevronDown, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';

import { useContext } from 'react';
import AuthContext from '../../pages/UserPages/AuthContext';
import ProfileSection from '../signup-page/Dropdown';
import { auth } from '../../pages/UserPages/firebase-auth';
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();
  const { setIsRegistered } = useContext(AuthContext);
  const { handleSignupSuccess,afterlogout } = useContext(AuthContext);
  const { isRegistered, username } = React.useContext(AuthContext);
  console.log("authcontext ", isRegistered);
  const { colorMode, toggleColorMode } = useColorMode(); // Hook to get color mode (light or dark) and toggle function
  const location = useLocation();
  const path = location.pathname;

  const shouldRenderOtherElements = path !== '/login' && path !== '/signup'; // If path is not login or signup, render other elements

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
   
    auth
      .signOut()
      .then(() => {
        console.log('Logged out');
      
        handleSignupSuccess(null);
      
        afterlogout();
        navigate('/');
        // Additional logout actions if needed
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const boxStyle = {
    pos: "static",
    top: "0",
    
    zIndex: "20", 
    background:"#FFFFFF",
    boxShadow: "inner",

  
  };


  

  return (
   
    <Box style={boxStyle} pos={'fixed'} width='100%' >
      <Flex align="center">
        
        <Link to={'/'}><HStack alignItems="center" justify="center" width={{md:"300px",base:'100px'}} height="60px" >
    
        <Text color={'black'} fontSize={24} fontWeight={600}>Code</Text>
        <Text color={'black'} fontSize={24} fontWeight={300}>Extract</Text>
        </HStack></Link>

        {/* Search bar */}
      
      
        <Spacer />
        <Spacer/>
        <Spacer/>

        {shouldRenderOtherElements && (
          <>
            

            <Box right={0} w="300px" h={10} alignItems="right"   onClick={handleToggleDropdown} cursor={'pointer'} > 
            <HStack spacing={0}>
            

            <Box right={0} w="300px" h={10} alignItems="right"   onClick={handleToggleDropdown} cursor={'pointer'} > 
            
            </Box>
              </HStack>
            </Box>

          </>
        )}

             {isRegistered &&
             <Button   color="black" bg='#0073C7' onClick={handleLogout}>
                   Log Out
                 </Button>
}
        <Box pl={2}>
          <HStack spacing={0} mr={10}>
            <>
           
              
            
              
              {path !== '/login' && !isRegistered && (
                <Link to="/login">
                  <Button color="black" bg='#0073C7' ml="30px" >
                    Login
                  </Button>
                </Link>
              )}
           


                 {path !== '/signup' && !isRegistered && (
                <Link to="/signup">
                  <Button color="black" border={'1px solid #0073C7'} mx="5">
                    SignUp
                  </Button>
                </Link>
              )}
            </>
           
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;