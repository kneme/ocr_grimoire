## To set up this project, you will need to create a main /project folder and add two subfolders for the backend and frontend
  1. Clone /backend with:

    git clone https://github.com/kneme/ocr_grimoire.git backend
  2. Clone /frontend with:

    git clone https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres.git frontend
  3. Run npm install for the two folders

## This project also requires the environment variables MONGODB_URI and JWT_SECRET.
  1. In /backend, create a .env file
  2. Furnish the .env file like so:

          MONGODB_URI=<your_mongodb_uri>
        
          JWT_SECRET=<your_randomly_generated_secret_key>
