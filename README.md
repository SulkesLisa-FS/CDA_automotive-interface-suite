###  CDA_MOD2-Project

TERM: C202603

# Building a multi-platform automotive interface suite


## Applications

1 - mobile-controls (Phone Interface: Serves as the "steering wheel" interface) <br>
2 - tablet-cluster  (Dashboard Display: Speed, RPM, Fuel Levels, Warnings..etc.) <br>
3 - web-map         (Trafic Controller Center: Set speed limits, create alerts, and monitor vehicle postion in real time) <br>
4 - typscript-server (Central Communication Hub: Coordinates communication between interfaces) <br>
- Shared Type Definitions for maintaining consistency and preventing bugs: Acts as a common language between all applictions. <br>


### Run Expo:  mobile-controls , tablet-cluster
    
    npx expo start

    npx expo start --clear

    Press: i for mobile
    Press: i for tablet

<br>


### Expo TEST Platforms
    
    npm run android

    npm run ios

    npm run web

<br>


### React-Native Debugger

To Open: Run expo

    Press: j  for expo-React Native Dev Tools


    

### Server Scripts
- "dev": Uses tsx for seamless TypeScript development with ES modules
- "build": Compiles TypeScript to JavaScript
- "start": Runs compiled JavaScript in production

### Run the Server: 

    npm run dev    - Development
    

<br>

### PORTS:

- Server:      3001

- iOS: &emsp;  8081