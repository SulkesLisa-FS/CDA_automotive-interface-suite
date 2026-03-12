// Shared type definitions for the entire automotive suite.

// Defines all movement properties.
export interface VehicleMotion {
  speed: number;        // Current speed in MPH
  direction: number;    // Heading in degrees (0-359)
  x: number;           // Position X coordinate
  y: number;           // Position Y coordinate
  accelerating: boolean;
}

// Represents user inputs for controlling the vehicle.
export interface VehicleControls {
  throttle: number;    // 0-1 (idle to full throttle)
  brake: number;       // 0-1 (no brake to full brake)
  steering: number;    // -1 to 1 (full left to full right)
  gear: 'P' | 'R' | 'N' | 'D' | 'S';
}

// Handles auxiliary controls and systems.
export interface VehicleSystems {
  lights: boolean;
  leftSignal: boolean;
  rightSignal: boolean;
  hazards: boolean;
}

// Represents the vehicle's dashboard and diplay data.
export interface VehicleCluster {
  rpm: number;
  fuel: number;       // Percentage
  battery: number;    // Percentage for electric vehicles
  warnings: string[]; // Array of warning strings
  trip: number;       // Trip odometer
  odometer: number;   // Total mileage
}

// Represents the external environment around the vehicle.
export interface VehicleEnvironment {
  speedLimit: number;
  nearbyTraffic: any[];
  alerts: string[];
}

// Master state object that combines all interfaces into a single source of truth for the vehicle's current state.
export interface VehicleState {
  motion: VehicleMotion;
  controls: VehicleControls;
  systems: VehicleSystems;
  cluster: VehicleCluster;
  environment: VehicleEnvironment;
  timestamp: number;
}

// Next two are communication interfaces that handle app-to-server messaging. 
export interface ControlInput {
  type: 'throttle' | 'brake' | 'steering' | 'gear' | 'lights' | 'leftSignal' | 'rightSignal' | 'hazards';
  value: number | string | boolean;
}

export interface EnvironmentUpdate {
  speedLimit?: number;
  alerts?: string[];
}
export type ClientType = 'mobile' | 'tablet' | 'web' | 'test';