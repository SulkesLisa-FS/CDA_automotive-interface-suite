### CDA - Muliti-Device Interface Project Prep

# Part 1 _ Foundation

### Proof of Work

- Ensure all four TypeScript projects are created with dependencies installed

- Create and compile the shared-types module

- Test the TypeScript server with the provided HTML client

- Read the React Native documentation on PanResponder and TypeScript integration

   [PanResponder](https://reactnative.dev/docs/panresponder) <br>
   [TypScript Integration](https://reactnative.dev/docs/integration-with-existing-apps#4-writing-the-typescript-code)

- Review TypeScript basics if needed (interfaces, type annotations, generics)
   [TypeScript Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) 

- Sketch ideas for your mobile control interface layout

- Record a small demo of the project running at this point and add a link to a YouTube or other video streaming service to the response section of this lesson.

### What I completed in Part 1:
Step 1: Create the Main Project Directory <br>
Step 2: Create the Mobile Controls App <br>
Step 3: Create the Tablet Cluster App <br>
Step 4: Create the Web Map Interface <br>
Step 5: Create the TypeScript Server <br>
Step 6: Create Shared Type Definitions <br>

NEXT...

## II Server Infrastructure

Create the foundation of the type-safe architecture <br>
Build the Server:

Step 1: Configure the Server Scripts  <br>
Step 2: Configure TypeScript for Modern ES Modules  <br>
Step 3: Create the Server Directory Structure  <br>
Step 4: Import Dependencies and Setup  (server/src/index.ts)  <br>
Step 5: Express and Socket.IO Setup  (server/src/index.ts)  <br>
Step 6: Initialize Vehicle State  (server/src/index.ts)  <br>
Step 7: Client Tracking and Socket Extension  (server/src/index.ts)  <br>
Step 8: Connection Handling  (server/src/index.ts)  <br>
Step 9: Control Input Handling  <br>
Step 10: Physics Simulation  <br>
Step 11: Server Startup  <br>

NEXT...

## Testing The Server
1. Run Server - npm run dev
2. Create a Test Client  <br>

NEXT...

### Proof of Work
- [ ] all four TypeScript projects are created with dependencies installed

- [ ] Create shared-types module

- [ ] compile the shared-types module

- [ ] Test the TypeScript server with the provided HTML client

- [ ] Record a small demo of the project running 

- [ ] Read: React Native documentation  & TypeScript basics

- [ ] Sketch Mobile Interface - Low Fidelity

<br>

# Trouble Shooting Errors:

1. Import Error in server/src/index.ts for ../shared-types/index.js
   Resolved: Updated to point to ../../shared-types/index.js

2. Error in server/src/index.ts: '}' expected. in Handle Client Type
   Resolved: Added '});'at the end of the socket.on function. 

3. Error in server/src/index.ts: Cannot find name 'socket'.
   Resolved: After reviewing, socket is outside of the scope. <b>
   the 2nd Error was not an error, the code block was not completed yet.
   - Removed the endding '});' of the block. 
   - Will finish adding code for issue to resolve itself.
   - Issue did not resolve - Added '});' at the end of the Control Input Handeling block. 