# Hello World Chat App

The Hello World app is a chat app for mobile devices, that allows users to chat and share images and locations. The app is developed using the React Native Expo framework and integrates Google Firestore for data storage.

## Features

- Users can choose their username and a preferred background color
- An interactive chat interface where messages, as well as images and location data can be sent
- Both online and offline data storage capabilities

## Technologies

- **Expo** is used to develop a cross-platform React mobile app 
- **Gifted Chat** library provides a customized chat interface
- **Google Firestore Database & Firebase storage** is utilized for storing chat messages and images
- **Google Firebase Authentication** provides easy and secure access to the app
- Various Expo libraries such as `expo-image-picker`, `expo-media-library`, and `expo-location` are integrated to enable media and location sharing

<a name="webpage-cut"></a>
## Installation

To run the Hello World chat app locally, follow these steps:

1. Clone this repository to your local machine.
2. Make sure you are using node version `16.19.0`.
3. Inside the directory, run `npm install` to install the necessary dependencies.
4. Replace the Firebase configuration in `App.js` with your own.
5. Run `npx expo start` to launch the development server.
6. Use Expo Go on your smartphone or a simulated device to run the app.

## Supported devices

The app has been tested on Android devices with OS versions 8, 10, and 12. Compatibility with Android versions 13 and up is not fully given. Unfortunately, iOS testing could not be conducted at this time.

## Project Status

This project was made within the scope of a web development course as a portfolio project. As such, it is finished for now.