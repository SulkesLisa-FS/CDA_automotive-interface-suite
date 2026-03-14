import { useState, useEffect, useCallback, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { VehicleState, EnvironmentUpdate } from '../../../shared-types';
import { VehiclePosition, SystemMetrics, TrafficAlert, SpeedZone } from '../types/web';
// Replace with your actual server IP
const SERVER_URL = 'http://192.168.2.80:3001';
export function useTrafficControl() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [vehicles, setVehicles] = useState<Record<string, VehiclePosition>>({});
  const [currentSpeedLimit, setCurrentSpeedLimit] = useState(() => {
    const saved = localStorage.getItem('currentSpeedLimit');
    return saved ? Number(saved) : 55;
  });
  
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    connectedDevices: { mobile: 0, tablet: 0, web: 0, test: 0 },
    serverUptime: 0,
    networkLatency: 0,
    messagesPerSecond: 0,
    lastUpdate: Date.now()
  });
  const [speedZones, setSpeedZones] = useState<SpeedZone[]>([
    {
      id: 'zone-1',
      center: [-84.3880, 33.7490], // Atlanta, GA coordinates
      radius: 500, // 500 meters
      speedLimit: 55,
      active: true
    }
  ]);


  // Alerts State
  // const [alerts, setAlerts] = useState<TrafficAlert[]>([]);

  const [alerts, setAlerts] = useState<TrafficAlert[]>(() => {
    const saved = localStorage.getItem('trafficAlerts');
    return saved ? JSON.parse(saved) : [];
  });



  const latencyStartRef = useRef<number>(0);
  const messageCountRef = useRef<number>(0);
  const lastSecondRef = useRef<number>(Date.now());
  useEffect(() => {
    console.log('Initializing traffic control connection...');
    
    const newSocket = io(SERVER_URL, {
      transports: ['websocket', 'polling']
    });
    newSocket.on('connect', () => {
      console.log('Traffic control connected to server');
      setConnected(true);
      // Register as web client
      newSocket.emit('register-client', 'web');
    });
    newSocket.on('disconnect', () => {
      console.log('Traffic control disconnected from server');
      setConnected(false);
    });
    newSocket.on('vehicle-update', (data: VehicleState) => {
      // Update vehicle position tracking
      const vehicleId = 'vehicle-1'; // For now, we track one vehicle
      
      // Convert pixel coordinates to real GPS coordinates (simulation)
      // In a real system, vehicles would report actual GPS coordinates
      const baseLatitude = 33.7490; // Atlanta, GA
      const baseLongitude = -84.3880;
      
      // Define coordinate conversion with proper validation
      const mapWidth = 0.01; // ~1.1km at this latitude
      const mapHeight = 0.01;
      const normalizedX = (data.motion.x - 400) / 800;
      const normalizedY = (data.motion.y - 300) / 600;
      const longitude = baseLongitude + (normalizedX * mapWidth);
      const latitude = baseLatitude + (normalizedY * mapHeight);
      
      const newPosition: VehiclePosition = {
        id: vehicleId,
        coordinates: [longitude, latitude],
        bearing: data.motion.direction,
        speed: data.motion.speed,
        lastUpdate: Date.now()
      };
      
      setVehicles(prev => ({
        ...prev,
        [vehicleId]: newPosition
      }));
      // Update message counter for metrics
      messageCountRef.current++;
      const now = Date.now();
      if (now - lastSecondRef.current >= 1000) {
        setSystemMetrics(prev => ({
          ...prev,
          messagesPerSecond: messageCountRef.current,
          lastUpdate: now
        }));
        messageCountRef.current = 0;
        lastSecondRef.current = now;
      }
    });

    // Listens for Client Count for connected Devices
    newSocket.on('client-count', (counts: { mobile: number; tablet: number; web: number; test: number }) => {
      setSystemMetrics(prev => ({
        ...prev,
        connectedDevices: counts
      }));
    });


    newSocket.on('connect_error', (error) => {
      console.log('Traffic control connection error:', error);
      setConnected(false);
    });


    // Ping for latency measurement
    const latencyInterval = setInterval(() => {
      if (newSocket.connected) {
        latencyStartRef.current = Date.now();
        newSocket.emit('ping');
      }
    }, 5000);
    newSocket.on('pong', () => {
      const latency = Date.now() - latencyStartRef.current;
      setSystemMetrics(prev => ({
        ...prev,
        networkLatency: latency
      }));
    });
    setSocket(newSocket);
    return () => {
      clearInterval(latencyInterval);
      newSocket.close();
    };
  }, []);
  const updateEnvironment = useCallback((update: EnvironmentUpdate) => {
    if (socket && connected) {
      socket.emit('environment-update', update);
    }
  }, [socket, connected]);

  // Create An Alert
    const createAlert = useCallback((alert: Omit<TrafficAlert, 'id' | 'timestamp'>) => {
    
      const newAlert: TrafficAlert = {
        ...alert,
        id: `alert-${Date.now()}`,
        timestamp: Date.now()
      };

        const updatedAlerts = [...alerts, newAlert];
        setAlerts(updatedAlerts);
        localStorage.setItem('trafficAlerts', JSON.stringify(updatedAlerts));
    
        setAlerts(prev => [...prev, newAlert]);
      
        // Send to all connected clients
        updateEnvironment({
        alerts: updatedAlerts.map(a => a.message)
      });
    }, [alerts, updateEnvironment]);

      // Update Speedlimot - Set The Current Speedlimit
      const updateSpeedLimit = useCallback((limit: number) => {
          setCurrentSpeedLimit(limit);
          localStorage.setItem('currentSpeedLimit', String(limit));
          updateEnvironment({ speedLimit: limit });
    }, [updateEnvironment]);

    // Clear The Alerts
    const clearAlerts = useCallback(() => {
      setAlerts([]);
      localStorage.removeItem('trafficAlerts');
      updateEnvironment({ alerts: [] });
    }, [updateEnvironment]);




  return {
    socket,
    connected,
    vehicles: Object.values(vehicles),
    systemMetrics,
    speedZones,
    alerts,
    updateEnvironment,
    createAlert,
    updateSpeedLimit,
    clearAlerts,
    currentSpeedLimit
  };
}