### URL MASKER APP

####Overview
  The Website converts given URL from a .csv file into a masked Url which when clicked redirects the user to the given link in csv.

#### Tech Stack Used
  - Frontend 
    - React
      - Toolkits:
        - Axios
        - PapaParse
        - Mui
  - Backend
    - Node
      - Express
      - Mongoose
      - Crypto
      - Cors
      - cookie-parser
      - Body-parser
      - dotenv
  - Datebase 
    - MongoDB

#### How it works
  - Steps:
    - First, we collect all all the URl in a csv file.
    - We upload the file, and name of the person and then it pings the backend where the information gets converted.
    - The input gets hashed into a random String and a new Url is generated(Masked URl) which is then saved into the dB.
    - Then the frontend is supplied with an array of masked url which if clicked on the frontend, redirects to the original URl. 
    - On the frontend, if the URl has been clicked, it generates a count variable which keep track of number of clicks.

####  How to feed the env variables

ORIGIN_URL = "The Origin URL that we wanna feed to cors"
PORT = "The port that we want out server to run on" // Default is 8000
MONGO_URI = "The DB URL"


And.. Thats it !!