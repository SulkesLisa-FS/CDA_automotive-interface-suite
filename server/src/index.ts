import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { VehicleState, ControlInput, EnvironmentUpdate, ClientType } from '../../shared-types/index.js'; // check this import points to the right level depending on if you added a /src directory or not

const app = express();
const server = createServer(app);
// Enable CORS for all domains (development only)
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// This will hold the current state of the vehicle
// Typically, a database or in-memory store would be used,
// but for simplicity, we'll use a single object here.
let vehicleState: VehicleState = {
  motion: {
    speed: 0,        // Current speed in MPH
    direction: 0,    // Heading in degrees (0-359)
    x: 100,         // Position X coordinate
    y: 100,         // Position Y coordinate
    accelerating: false
  },
  controls: {
    throttle: 0,    // 0-1 (idle to full throttle)
    brake: 0,       // 0-1 (no brake to full brake)
    steering: 0,    // -1 to 1 (full left to full right)
    gear: 'P'       // P, R, N, D, S
  },
  systems: {
    lights: false,
    leftSignal: false,
    rightSignal: false,
    hazards: false
  },
  cluster: {
    rpm: 0,
    fuel: 85,       // Percentage
    battery: 75,    // Percentage for electric vehicles
    warnings: [],   // Array of warning strings
    trip: 0,        // Trip odometer
    odometer: 45234 // Total mileage
  },
  environment: {
    speedLimit: 55,
    nearbyTraffic: [],
    alerts: []
  },
  timestamp: Date.now()
};