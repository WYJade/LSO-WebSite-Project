// User Role Enum
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  VIEWER = 'viewer',
}

// Shipment Status Enum
export enum ShipmentStatus {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  EXCEPTION = 'exception',
}

// User Status Enum
export enum UserStatus {
  INVITED = 'invited',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// User Model
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  language: string;
  region: string;
}

// Address Model
export interface Address {
  id: string;
  label: string;
  recipientName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  inUse: boolean;
}

// Dimensions Model
export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in';
}

// Tracking Event Model
export interface TrackingEvent {
  timestamp: Date;
  location: string;
  status: string;
  description: string;
}

// Shipment Model
export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: Address;
  destination: Address;
  createdAt: Date;
  estimatedDelivery: Date;
  actualDelivery?: Date;
}

// Package Model
export interface Package {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  weight: number;
  dimensions: Dimensions;
  currentLocation?: string;
  events: TrackingEvent[];
}

// Account User Model
export interface AccountUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  invitedAt: Date;
  lastLogin?: Date;
}

// New User Data Model
export interface NewUserData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
