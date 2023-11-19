import axios from 'axios';

import { PUBLIC_ELEVEN_LABS_API_KEY } from '$env/static/public';

const convertTextToAudio = async (textToConvert:string, person:string) => {
    // Set the API key for ElevenLabs API
    const apiKey = PUBLIC_ELEVEN_LABS_API_KEY;
  
    // ID of voice to be used for speech
    const voiceId = person;
  
    // API request options
    const apiRequestOptions = {
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        'xi-api-key': apiKey,
      },
      data: {
        text: textToConvert,
      },
      responseType: 'arraybuffer', // To receive binary data in response
    };
  
    // Sending the API request and waiting for response
    const apiResponse = await axios.request(apiRequestOptions);
  
    // Return the binary audio data received from API
    return apiResponse.data;
  };
  
  export default convertTextToAudio;