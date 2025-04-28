// User-related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface Student extends User {
  role: 'student';
  studentId: string;
  department: string;
  email: string;
}

export interface Admin extends User {
  role: 'admin';
  username: string;
}

// Authentication-related types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface OtpRequest {
  email: string;
}

export interface OtpVerification {
  email: string;
  otp: string;
}

// Bus and route related types
export interface BusRoute {
  id: string;
  routeNo: string;
  name: string;
  startTime: string;
  stops: BusStop[];
}

export interface BusStop {
  id: string;
  name: string;
  time: string;
}

export interface BusLocation {
  routeId: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

// Feedback and complaint types
export interface Feedback {
  id: string;
  userId: string;
  routeId: string;
  type: 'feedback' | 'complaint';
  title: string;
  description: string;
  status: 'pending' | 'reviewing' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}