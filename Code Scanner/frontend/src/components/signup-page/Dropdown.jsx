import React, { useContext } from 'react';
import { Box, IconButton, Text, Button } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { auth } from '../../pages/UserPages/firebase-auth';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../pages/UserPages/AuthContext';

export default function Dropdown({handleToggleDropdown }) {
  
    const { handleSignupSuccess,afterlogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const {isRegistered} = useContext(AuthContext);
  const { username } = useContext(AuthContext); // Get username from the AuthContext

  // Logout function
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log('Logged out');
      
        handleSignupSuccess(null);
        handleToggleDropdown();
        afterlogout();
        // Additional logout actions if needed
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Box
        pos={'absolute'}
        top="70px"
        right="60px"
        borderRadius={'15px'}
        
        borderWidth={2}
        bg="#F0F5FF"
        w="210px"
        h="270px"
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap="5px"
        zIndex="1000"
      >
        <IconButton
          icon={<FaUser size="25px" />}
          w="85px"
          h="85px"
          borderRadius="100px"
          color="white"
          bg="#0d5fc2"
          size="md"
        />
        <Text color="Black" fontSize={'md'}>
          {username}
        </Text>
        {auth.currentUser && auth.currentUser.email && (
          <Text color="black" fontSize={'12px'} mb="10px">
            {isRegistered?auth.currentUser.email: ''}
          </Text>
        )}
       { isRegistered &&
       <>
        <Button w="100px" h="40px" color="white" bg="#0d5fc2" onClick={() => navigate('/profile')}>
          Profile
        </Button>
      
        <Button w="100px" h="40px" color="white" bg="#0d5fc2" onClick={handleLogout}>
          Log Out
        </Button>
        </>
}
      </Box>
    </div>
  );
}
