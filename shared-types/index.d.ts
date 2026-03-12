export interface VehicleMotion {
    speed: number;
    direction: number;
    x: number;
    y: number;
    accelerating: boolean;
}
export interface VehicleControls {
    throttle: number;
    brake: number;
    steering: number;
    gear: 'P' | 'R' | 'N' | 'D' | 'S';
}
export interface VehicleSystems {
    lights: boolean;
    leftSignal: boolean;
    rightSignal: boolean;
    hazards: boolean;
}
export interface VehicleCluster {
    rpm: number;
    fuel: number;
    battery: number;
    warnings: string[];
    trip: number;
    odometer: number;
}
export interface VehicleEnvironment {
    speedLimit: number;
    nearbyTraffic: any[];
    alerts: string[];
}
export interface VehicleState {
    motion: VehicleMotion;
    controls: VehicleControls;
    systems: VehicleSystems;
    cluster: VehicleCluster;
    environment: VehicleEnvironment;
    timestamp: number;
}
export interface ControlInput {
    type: 'throttle' | 'brake' | 'steering' | 'gear' | 'lights' | 'leftSignal' | 'rightSignal' | 'hazards';
    value: number | string | boolean;
}
export interface EnvironmentUpdate {
    speedLimit?: number;
    alerts?: string[];
}
export type ClientType = 'mobile' | 'tablet' | 'web' | 'test';
//# sourceMappingURL=index.d.ts.map