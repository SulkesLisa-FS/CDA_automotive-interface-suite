### CDA - Muliti-Device Interface Project Prep

# Part 4 _ Web Interface

### What I completed in Part 4:  

### Part I: Project Setup & Architecture

1. Adding Mapping Capabilities:  (Install: install mapbox-gl @types/mapbox-gl )
2. TypeScript Configuration for Web  (Update: tsconfig.app.json)
3. Web-Specific Type Definitions  (Create: web.ts)


### Part II: Real-time Vehicle Tracking Interface

1. Connection Management for Web  (Create: useTrafficControl.ts)
2. Vehicle Tracking Map Component 
    * (Signup: mapbox - Get Access Token // Create .env)
    * (Create: VehicleMap.tsx)
3. Map Styling  (Create: VehicleMap.css)


### Part III: Environmental Control Systems

1. Control Panel Component  (Create: ControlPanel.tsx)
2. Control Panel Styling  (Create: ControlPanel.css)


### Part IV: Admin Dashboard & System Monitoring

1. Admin Dashboard Component   (Create: AdminDashboard.tsx)
2. Admin Dashboard Styling  (Create: AdminDashboard.css)


### Part V: Final Integration & Testing

1. Main App Assembly  (Update: App.tsx)
2. Remove React StrictMode (Update: main.tsx)
3. Main Layout  (Update: App.css)
4. Cross-Platform Testing
    - Step 1: Start the Server
    - Step 2: Start the Web Interface
    - Step 3: Start Mobile Controls - Need to do this After Tablet (steps are backwards)
    - Step 4: Start Tablet Dashboard




## Proof of Work


Before the next lesson:

- [ ] Enhance the map visualization: Add roads, intersections, or more detailed geography

- [ ] Create additional alert types: Weather warnings, road closures, or special events

- [ ] Implement user authentication: Add login system for traffic operators

- [ ] Add data persistence: Store alerts and speed limit changes in local storage

- [ ] Performance testing: Monitor the system with many simulated vehicles

- [ ] Record a small demo of the project running at this point and add a link to a YouTube or other video streaming service to the response section of this lesson.








<br>

# Trouble Shooting Issues & Errors:

1. src/types/web.ts Import shared-types error
   Resolved: Updated to point to '../../../shared-types'

2. VehicleMap.tsx  Errors 
    - .env Property 'env' does not exist on type 'ImportMeta'.
    Resolved: - Created file vite-env.d.ts file and added /// <reference types="vite/client" />

    After Fix: More Errors still presist:

    * Line 54 Error: 'catch' or 'finally' expected.
      Resolved: Removed exter closing brackets at the end of 'map.current!.addLayer'.
      Rest of the errors were resolved after this fix. 


3. ControlPanel.tsx EnvironmentUpdate Import Error:
    Module '"../types/web"' declares 'EnvironmentUpdate' locally, but it is not exported.
    Resolved: In types/web.ts - added export:  export type { EnvironmentUpdate };

4. App.tsx   Error with <VehicleMap/> in the body import.
   I suspect because of the .env error from above # 2 error. 
    Resolved: Was resolved after fixing the errors in VehicleMap.tsx

5. main.tsx Error with import App from './App.tsx'
   An import path can only end with a '.tsx' extension when 'allowImportingTsExtensions' is enabled.
   Resolved: Removed '.tsx'

6. Web Dashboard: Connected Devices do not show as connected

    Issue: The server was tracking connected client counts internally in the terminal but never broadcasting them. The web dashboard's AdminDashboard was reading connectedDevices from systemMetrics, but those values were initialized to all zeros and never updated — so it always showed 0 for mobile, tablet, and web. Now the server emits the counts whenever a client connects or disconnects, and the web hook receives and displays them.
     
     Resolve:  Added io.emit('client-count', connectedClients) to the server's register-client and disconnect handlers, then added a client-count listener in useTrafficControl.ts that updates systemMetrics.connectedDevices.
     


7. Web Dashboard: Speedlimit does not change

    Issue: 
    The speed limit was hardcoded as 55 in App.tsx, so clicking a different speed limit button sent the value to the server but the UI never reflected the change. The server also had no environment-update handler, so the tablet never received it either. Now the value is reactive — it updates in the web dashboard and propagates to the tablet through the server.

    Resolved: Added currentSpeedLimit state to useTrafficControl.ts, updated it when the user clicks a speed limit button, passed it from App.tsx to the ControlPanel, and added a server handler to broadcast the change to all clients.



8. Web Dashboard: Show Emergenc Alerts Across Devivces


9. Alerts and Speedlimit changes need to persist in local storage
    Issue: Alerts not sending across devices:
    The server was already broadcasting vehicleState.environment.alerts to all clients via vehicle-update, but the mobile and tablet apps had no UI to show them. Without rendering the data, alerts created from the web dashboard were invisible on those devices.

    Resolve: Added alert banner components to both App.tsx and App.tsx that display vehicleState.environment.alerts. The data was already flowing from the web dashboard → server → all clients via the environment-update and vehicle-update events we wired up earlier. We just needed to render it.


10. Local storage persistence: 
    Issue:
    Alerts and speed limit were stored only in React state (in-memory), so they were lost on every browser refresh. Using localStorage lets the web dashboard remember the last speed limit and any active alerts between sessions, matching the project requirement for data persistence.

    Resolved: 
    Updated useTrafficControl.ts to read/write currentSpeedLimit and trafficAlerts from localStorage. The useState initializers load saved values on page load, and the updateSpeedLimit and createAlert callbacks save to localStorage on every change. Now both persist after a browser refresh.



11. Web Dashboard:  No way to remove or dismiss the alerts

    Issue:  Once alerts were created, there was no way to remove them — they persisted in the UI, in local storage, and across all connected devices indefinitely. The clear button gives the traffic operator a way to dismiss alerts when they're no longer relevant, and the change propagates to all devices (mobile and tablet) through the server.

    Resolved: 
    Add an Alert dismiss button:  Added a clearAlerts function in useTrafficControl.ts that empties the alerts array, removes them from localStorage, and sends an empty alerts array to the server via environment-update. Then passed it through App.tsx as a prop to ControlPanel.tsx, where the added "Clear All Alerts" button next to the "Create Alert" button resides.














