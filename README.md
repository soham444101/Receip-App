# Receip-App

A full-stack recipe application with a React Native frontend and a Node.js backend. Built to help users browse and manage cooking recipes with a mobile interface

## Technologies Used
Frontend: React Native (no Expo)

Backend: Node.js + Express

Database: MongoDB + Mongoose

Authentication: JWT

Styling: React Native Components

Platform: Android & iOS

##  Project Structure

Receip-App/
├── Client/ # React Native app (no Expo)
├── Server/ # Node.js + Express backend API
└── README.md


## Clone Link
git clone https://github.com/soham444101/Receip-App.git


##  Getting Started

###  Prerequisites

- Node.js (LTS recommended)
- Git
- Android Studio (for Android emulator)
- Xcode (for iOS simulator)
- A real or virtual device for testing

##  Client – React Native

Navigate to the Client folder and install dependencies:
npm install

## Install Native Dependency
npm install @react-native-async-storage/async-storage@^2.1.2 @react-native-masked-view/masked-view@^0.3.2 @react-native-picker/picker@^2.11.0 @react-navigation/native@^7.1.6 @react-navigation/native-stack@^7.3.10 @react-navigation/stack@^7.2.10 axios@^1.9.0 react@^19.1.0 react-native@^0.79.1 react-native-gesture-handler@^2.25.0 react-native-safe-area-context@^5.4.0 react-native-screens@^4.10.0 react-native-svg@^15.11.2 react-native-vector-icons@^10.2.0 --save && npm install @babel/core@^7.26.10 @babel/preset-env@^7.25.3 @babel/runtime@^7.27.0 @react-native-community/cli@^18.0.0 @react-native-community/cli-platform-android@^18.0.0 @react-native-community/cli-platform-ios@^18.0.0 @react-native/babel-preset@^0.79.1 @react-native/eslint-config@^0.79.1 @react-native/metro-config@^0.79.1 @react-native/typescript-config@^0.79.1 @types/jest@^29.5.13 @types/react@^18.3.20 @types/react-test-renderer@^18.3.1 eslint@^9.25.1 jest@^29.6.3 prettier@^3.5.3 react-test-renderer@^19.1.0 typescript@^5.8.3 --save-dev

## Start For Android
npm run android

## Start For Ios
npm run ios

## Server- Backend 
Navigate to the Client folder and install dependencies:
npm install

## Install Backend Dependency
npm install bcryptjs@^2.4.3 cors@^2.8.5 express@^4.21.2 jsonwebtoken@^9.0.2 mongodb@^6.13.0 mongoose@^8.9.6 multer@^1.4.5-lts.1 --save && npm install dotenv@^16.4.7 kill-port@^2.0.1 morgan@^1.10.0 nodemon@^3.1.9 --save-dev

## Start Commond Backend
npm run start

## Environment Variables
Create a .env file inside Server/ with the following:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

## Contact
Email : sohamaswar@gmail.com

GitHub Profile : soham444101






