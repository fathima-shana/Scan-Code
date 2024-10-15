//I have defined  x='333' in .env file in same folder as server.js
//I have to console.log the value of api key in server.js file
//console.log(process.env.RAPIDAPI_KEY);
// import { Configuration, OpenAIApi } from "openai";
// import readline from "readline";

const express = require('express');
//Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
// const { GPT } = require('openai');
const axios = require('axios');
//Axios is a popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node.js.
const cors = require('cors');
//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
require('dotenv').config();
const path = require('path');
const mime = require('mime-types');
const api = process.env.x
console.log(api);






const FormData = require('form-data');
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const multer = require('multer');
//multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.


// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Destination folder to save uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.post('/recognize', upload.single('srcImg'), async (req, res) => {
  try {
   

    const imageFilePath = req.file.path;
    const apiKey = 'aaba41e5bemshb02df24f21d0280p1e96c8jsn173c2c147512';
    const apiHost = 'pen-to-print-handwriting-ocr.p.rapidapi.com';

    const data = new FormData();
    data.append('srcImg', fs.createReadStream(imageFilePath));
    data.append('Session', 'string');

    const options = {
      method: 'POST',
      url: 'https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios.request(options);
    console.log(JSON.stringify(response.data.value));

    res.json(response.data.value); // Send the response from the API back to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



// Handle POST requests to /submit-code
app.post('/submit-code', async (req, res) => {
  const code = req.body.code;
  const languageId = req.body.languageId;
  const stdin = req.body.stdin;
  const expectedOutput = req.body.expectedOutput;
  console.log("Input",stdin);
  console.log("Expected Output",expectedOutput);

  try {
    // Make a POST request to Judge0 API
    const response = await axios.post('https://judge0.p.rapidapi.com/submissions', {
      source_code: code,
      language_id: languageId, // Replace with the language ID of the code you're submitting
      stdin: stdin,
      expected_output: expectedOutput

    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'aaba41e5bemshb02df24f21d0280p1e96c8jsn173c2c147512',
         'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    });

    const submissionId = response.data.token;

    // Use the submission ID to check the status of the submission or get the results
    // You can make additional API calls to Judge0 endpoints to retrieve the results

    res.status(200).json({ submissionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



// Handle GET requests to /submission/:submissionId
app.get('/submission/:submissionId', async (req, res) => {
    const { submissionId } = req.params;
  
    try {
      // Make a GET request to Judge0 API to retrieve submission results
      const response = await axios.get(`https://judge0.p.rapidapi.com/submissions/${submissionId}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': api,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      });
  
      const submissionResult = response.data;
      
  
      res.status(200).json({ submissionResult });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });









 //post request to store user profile data in users collection by user id includes profile url, skills ,social links
 app.post('/profile/:uid', async (req, res) => {
  const { uid } = req.params;
  const { profileUrl, skills, socialLinks } = req.body;
  try {
    await admin.firestore().collection('userprofile').doc(uid).set({
      profileUrl,
      skills,
      socialLinks
    });
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }


  //get request to get user profile data from users collection by user id
  app.get('/profile/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
      const userProfile = await admin.firestore().collection('userprofile').doc(uid).get();
      res.status(200).json({ userProfile: userProfile.data() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
  );
  
});






    
  
  
  
  
  
  // Start the server
  app.listen(3000, () => {
    
    console.log('Server is running on port 3000');
    console.log('process.env.RAPIDAPI_KEY', api);
  });



