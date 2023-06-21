require("dotenv").config()
const axios=require("axios")

const openAI=async(prompt)=>{
  console.log(prompt)
  
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
   return await axios.post(apiUrl, {
    "model": "gpt-3.5-turbo",
    "messages": [
     ...prompt
    ]
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
      }
    })
    .then((response)=>{
      console.log(response.data)
      return (response.data)
    })
    .catch(error => {
      console.error(error);
      // return error
    });
  }
  

  module.exports={
    openAI
  }
