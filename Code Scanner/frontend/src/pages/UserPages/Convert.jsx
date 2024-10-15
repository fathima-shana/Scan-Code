import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Divider, Flex, EditableTextarea, HStack, Input, Select, Spacer, Text, Textarea, VStack, Grid, Image, Spinner } from "@chakra-ui/react";
import { FaAngleDown, FaArrowAltCircleDown, FaCaretDown, FaCopy, FaDropbox, FaFileDownload, FaRegArrowAltCircleDown, FaSortDown, FaSun, FaUpload } from "react-icons/fa";
import Instruction1 from '../../assets/Image folder-cuate.png'
            
function Convert() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [custominput, setCustominput] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [time, setTime] = useState('');
  const [memory, setMemory] = useState('');
  const [language, setLanguage] = useState('C');
  const [error, setError] = useState('');
  const [loading1, setloading1] = useState(false);
  const [Isthereiscode, setIsthereiscode] = useState(false);

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageRecognition = async () => {
    setloading1(true);
    const formData = new FormData();
    formData.append('srcImg', selectedImage);
// delay the loading by 10 seconds
  
    try {
      const response = await axios.post('http://localhost:3000/recognize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCode(response.data);
    } catch (error) {
      console.error(error);
    }

    setloading1(false);
  };

  const scanningAnimationStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.5)',
    zIndex: 9999,
  };

  const scanningLineStyle = {
    width: '100%',
    height: '2px',
    backgroundColor: '#0073c7',
    animation: 'scan 2s linear infinite',
    transformOrigin: 'bottom',
  };
  

  const handleSubmitCode = () => {
    setLoading(true);
    const id = getLanguageId(language);
    console.log("Language id is ", id);

    axios.post('http://localhost:3000/submit-code', {
      code: code,
      languageId: getLanguageId(language),
      stdin: custominput,
      expectedOutput: outputFormat,
    })
      .then(response => {
        console.log(response.data);
        const submissionId = response.data.submissionId;
        setIsthereiscode(true);
        axios.get(`http://localhost:3000/submission/${submissionId}`)
          .then(response => {
            setTimeout(() => {
              console.log("inside", response.data);
              console.log("Is there is code", Isthereiscode);
              setOutput(response.data.submissionResult.stdout);
              setStatus(response.data.submissionResult.status.description);
              setTime(response.data.submissionResult.time);
              setMemory(response.data.submissionResult.memory);
              setError(response.data.submissionResult.stderr);

              console.log("Status is ", status);
              console.log("Time is ", time);
              console.log("Memory is ", memory);
              console.log("Loading is inside get ", loading);
              console.log("Output is ", response.data.submissionResult.stdout);
              setloading(false);
            }, 2000);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  function getLanguageId(language) {
    console.log("Language is ",language);
    // Map language to language ID
    switch (language) {
      case "Java":
        return 62;
      case "Python":
        return 70;
      case "C++":
        return 54;
      case "C":
        return "50";
  // Default to C++
    }
  }

  return (
    <div  bg={'#FFFFFF'} pt={5}>
      <style>
        {`
       @keyframes scan {
        0% {
          transform: translateY(-7500%);
        }
        100% {
          transform: translateY(4000%);
        }
      }
      `}
      </style>
      <Flex w={'100vw'} bg={'#FFFFFF'} h={'100vh'} pb={10} justifyContent={'space-around'}>
        <Box bg={'#FFFFFF'} pt={170}>
          <Text fontWeight="semibold" fontSize={50} textAlign='center' color={"black"} lineHeight={"60px"} mb={5}>Upload Image </Text>
          <VStack>
         
            <Box position="relative" display={'flex'} flexDirection={'column'} alignItems="center" justifyContent="center" bg={'#F0F5FF'} borderRadius="10px"  boxShadow={' rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'} w="400px" h="100%" p={10} >
            <Image src={Instruction1} alt="Image" mt="-35px" h="200px" w="200px" display={selectedImage && 'none'} />
              {selectedImage && (
               
                  <Image src={URL.createObjectURL(selectedImage)} alt="Selected Image" width="400px" height="200px" m={5} border={'1px solid black'} />
             
              )}

            
              <Button
                colorScheme="blue"
                cursor={'pointer'}
                bg="#0073C7"
                color={"white"} 
                as="label"
                htmlFor="imageUpload"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={2}
              
               
              >
                 <FaUpload color="white" size={20} />
                {selectedImage ? '  Change Image' : '  Upload Image'}
                <Input
                  id="imageUpload"
                  type="file"
                  display="none"
                  onChange={handleImageUpload}
                />
              </Button>

            
         
              {loading1 && (
                <div style={scanningAnimationStyle} className="scanning-animation">
                  <div style={scanningLineStyle} className="scanning-line"></div>
                </div>
              )}
            </Box>
            {selectedImage && <Button
              colorScheme="blue"
              bg="#0073C7"
              color={"white"} 
              mt={5}
             
              onClick={handleImageRecognition}
              disabled={!selectedImage || loading}
            >
              Recognize Handwriting
            </Button>
}
            {loading && <p>Loading...</p>}
          </VStack>
        </Box>
        <Box  bg={'#FFFFFF'} pt={20}>
          <Box w="680px" h="100%" borderWidth={3} bg="#F0F5FF" borderColor={"#0073c7"} borderRadius={15} pb={5}>
            <Box bg="#F0F5FF" borderBottomColor={"#0073c7"} borderWidth={2} w="676px" h="50px" borderRadius={15} borderBottomRadius={0} pt="5px" p={5} display='flex' justifyContent={"space-between"} alignItems={"center"} >
              <Select placeholder={language} bg={"#F0F5FF"} borderWidth={2} borderColor={"#0073c7"} w="162px" h="31px" display={"flex"} color={"#0073c7"} size={12} value="language" onChange={(e) => setLanguage(e.target.value)} borderRadius={9} >
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="C">C</option>
               
              </Select>
              <Button h="30px" bg="#0073c7" borderRadius={4} color="white" onClick={handleSubmitCode}>Run</Button>
            </Box>
            <Textarea style={{ scrollbarColor: 'blue' }} color={"#0073c7"} bg={"white"} borderColor={"white"} borderRadius={15} borderWidth={2} value={code} placeholder="Enter Your Code Here" onChange={(event) => { setCode(event.target.value) }} h="400px" w="650px" margin="10px" />
            {Isthereiscode ? (
              <Box >
                {error !== null ? (
                  <Box bg="#F0F5FF" w="100%" display={loading ? 'none' : 'block'} alignItems={"center"} p="10px">
                    <Text fontSize={16} color={"black"} fontWeight={'semibold'}>Error : </Text>
                    <Text fontSize={20} color={"black"} ml="10px">{error}</Text>
                  </Box>
                ) : (
                  <></>
                )}
                <Text visibility={loading ? 'hidden' : 'visible'} fontSize={24} ml="15px" color={"#0073c7"}>Output </Text>
                <Box bg={'white'} w="675px" h='100%' px={3}  borderWidth={2}>
                  {output === null ? (
                    <Text color={'black'} align={"left"} fontSize={16}>{'No Output'}</Text>
                  ) : (
                    <Text align={"left"} fontSize={16} color={'black'}>
                      {loading ? 'Submission On Queue' : output.split("\n").slice(0, 3).map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </Text>
                  )}
                </Box>
              
              </Box>
            ) : (
              <Box bg="#F0F5FF" h="53px" w="676px" mt="30px" pt="0px" display={'flex'} alignItems={'center'} justifyContent={'center'} borderBottomRadius={11} borderWidth={2} borderTopColor={"white"} >
                <Text color={'black'}>Scan the image and press run</Text>
               
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Convert;
