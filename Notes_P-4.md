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
3. Map Styling  (VehicleMap.css)


### Part III: Environmental Control Systems

1. Control Panel Component  (ControlPanel.tsx)




















## Proof of Work











<br>

# Trouble Shooting Issues & Errors:

1. src/types/web.ts Import shared-types error
   Resolved: Updated to point to '../../../shared-types'

2. VehicleMap.tsx  Errors 
    - .env Property 'env' does not exist on type 'ImportMeta'.


3. ControlPanel.tsx EnvironmentUpdate Import Error:
    Module '"../types/web"' declares 'EnvironmentUpdate' locally, but it is not exported.
    Resolved: In types/web.ts - added export:  export type { EnvironmentUpdate };
