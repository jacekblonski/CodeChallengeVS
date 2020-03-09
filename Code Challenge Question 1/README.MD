# Shift Cipher API
Connection
===
port: 23456
endpoint: /api/encode

Usage
===
Accepts a POST request with a message and returns a [shift cipher](https://en.wikipedia.org/wiki/Caesar_cipher) encoded version of the message.

Request
---
JSON of the form:  
{  
  "Shift": _integer_,  
  "Message": _string_  
}  
Shift: how many steps to shift each letter  
Message: your message  

Response
---
JSON of the form:  
{  
  "encodedMessage": _string_  
}  
encodedMessage: your encoded message  

Returns a status of 200 if encoding was succesful, and 500 if there was any error.
