import React, { useRef } from 'react';
import { Box, Flex, Divider, Text, Input, Button, Heading,Alert,AlertIcon, HStack, Grid } from '@chakra-ui/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate,Link} from 'react-router-dom';
import axios from 'axios';





const LoginPage = ({ handleSignupSuccess }) => {

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  // showing login failed error after entering wrong credentials
  const [error, setError] = React.useState(null);
  const [resetPasswordMessage, setResetPasswordMessage] = React.useState('');
 


  const handleLogin = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      const userData = {
        username: email,
        // Add other user data properties as needed
      };

      navigate('/convert')
      handleSignupSuccess(userData);
      
     
      
     
      
    } catch (error) {
      if(error.code === 'auth/user-not-found'){
        setError('User not found with this email address ')
      }
      else if(error.code === 'auth/wrong-password'){
        setError('Wrong password check again')
      }
      console.log('Login failed', error);
    }
  };

  const handleForgotPassword = async () => {
    const email = emailRef.current.value;

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      setResetPasswordMessage('Password reset email sent. Please check your inbox.');
      setError(null);
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
      console.error('Error sending password reset email:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;
      const userData = {
        username: email.substring(0, email.lastIndexOf('@')),
      
      };
      handleSignupSuccess(userData);
      navigate('/convert')

     
   
    } catch (error) {
      console.log('Google sign-in failed', error);
    }
  };



  return (
    <>
    <Box bg={'white'}>
      <Box display="flex" flexDirection="column" gap="150px" bg={"white"} h="100vh" pt={{base:'0', md:'150px'}}>
      <Grid templateColumns={{ base: '1fr', md: '3fr 3fr' }} bg={"white"} pt={0} pl={{base: '100px', md:"0px"}} >
        <HStack pl={{base: '0', md:'300'}}>
          <div>
        
          
          
          <Flex direction="column">
            <Heading fontStyle="normal" fontWeight="bold" fontSize="5xl" p="40px 65px 35px 0px" color={"#0073c7"}>
              Log In
            </Heading>
            <Box display="flex" alignItems="center" justifyContent="space-evenly" w="300px" h="45px" bg={'#0073c7'} borderRadius="4px" cursor={'pointer'} onClick={handleGoogleSignIn}>
              <FaGoogle size="25px" />
              <Text color="white" fontSize="md" lineHeight="18px" >
                Log In with Google
              </Text>
            </Box>
         
            <Text fontSize="md" fontWeight="400" m="25px 0 10px 0">
              How social log in works
            </Text>
            <Text w="300px" h="130px" color="txtg" fontSize="sm">
              If the email address associated with your social account matches the email address of your Code Extract
              account, you'll be Signed Up. You aren't locked to any particular social account. Questions? contact
              support.
            </Text>
          </Flex>
          </div>
          <div>
          <Box mt="100px" ml="px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Divider orientation="vertical" h="140px" borderColor="#9B9DAD" />
            <Box display="flex" alignItems="center" justifyContent="center" mx="2" w="45px" h="50px" border="1px solid #9B9DAD" borderRadius="10px" textAlign="center">
              <Text fontSize="xl" fontWeight="bold" color="#9B9DAD">
                OR
              </Text>
            </Box>
            <Divider orientation="vertical" h="140px" borderColor="#9B9DAD" />
          </Box>
          </div>
          </HStack>
          <div>
          <Flex ml="0px" mt={100} direction={"column"} justifyContent={'center'}>
            <Text mt="10px" color={"#0073c7"}>Email</Text>
            <Input ref={emailRef} borderColor={"#0073c7"} color={"#0073c7"} placeholder="Email" w="350px" h="45px" bg="#F0F5FF" borderRadius="4px" mt="10px" />
            <Text mt="10px" color={"#0073c7"}>Password</Text>
            <Input ref={passwordRef} placeholder="Password" color={"#0073c7"} type="password" borderColor={"#0073c7"} w="350px" h="45px" bg="#F0F5FF" borderRadius="4px" mt="10px" />
            <Button type="submit" w="350px" h="45px" bg="#0073c7" borderRadius="4px" mt="20px" color="white" onClick={handleLogin}>
              Log In
            </Button>
            {error && <Text mt="10px"color="red">{error}* </Text>}
            {error && (
            <Alert status="error" mt="10px">
              <AlertIcon />
              {error}
            </Alert>
          )}
          {resetPasswordMessage && (
            <Alert status="success" mt="10px">
              <AlertIcon />
              {resetPasswordMessage}
            </Alert>
          )}

          <Text textAlign="center" ml={-400} mt="25px" fontSize="sm" color="#76DAFF" cursor={'pointer'} onClick={handleForgotPassword} >
              Forgot Password?
          </Text>
          
        
        
          
        <Link to='/signup'>
        <Text textAlign="center" ml="-400px" mt="0px" fontSize="sm" color="#76DAFF">
          
          Don't have an account? <Text as="u" color="#76DAFF">Sign Up</Text>
        </Text>
        </Link></Flex>
        </div>
        </Grid>
      </Box>
      </Box>
    </>
  );
}

export default LoginPage;
