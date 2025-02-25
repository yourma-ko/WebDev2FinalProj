This section provides instructions for setting up and running the frontend of the Electronics Store project.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)  
- npm or yarn (Node package managers)  

## Installation

### 1. Clone the Repository


git clone https://github.com/yourma-ko/WebDev2FinalProj
cd laptop-store/frontend

### 2. Install Dependencies
Using npm:


npm install
Or using yarn:


yarn install
### 3. Install Required Libraries

npm install react-router-dom @mui/material @emotion/react @emotion/styled redux react-redux axios react-icons

Or using yarn:
yarn add react-router-dom @mui/material @emotion/react @emotion/styled redux react-redux axios react-icons
Configuration
### 4. Set Up Environment Variables
Create a .env file in the frontend directory and add the required environment variables:


VITE_ADMIN_PASSWORD ="2305"

Running the Application
### 5. Start the Development Server
Using npm:
npm run dev
Or using yarn:
yarn dev
The application will run at http://localhost:5173/ (default Vite port).
 ### 6. Build the Project
Using npm:


npm run build
Or using yarn:


yarn build
This will create an optimized build in the dist/ folder.
# Backend API
## Prerequisites
.Net 9.0.1 SDK
## Set Up Environment Variables
Add your connection stings either in /API/appsettings.json file or in the environment
## Run Application
In PowerShell
cd {your local path}\WebDev2FinalProj\API
dotnet run
