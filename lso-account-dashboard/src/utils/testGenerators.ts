import * as fc from 'fast-check';
import { User, UserRole, Address, Shipment, ShipmentStatus } from '../types/models';

// User Generator
export const userGenerator = () =>
  fc.record({
    id: fc.uuid(),
    firstName: fc.string({ minLength: 1, maxLength: 50 }),
    lastName: fc.string({ minLength: 1, maxLength: 50 }),
    email: fc.emailAddress(),
    role: fc.constantFrom(UserRole.ADMIN, UserRole.USER, UserRole.VIEWER),
    language: fc.constantFrom('EN', 'ZH', 'ES'),
    region: fc.constantFrom('US', 'CN', 'EU'),
  }) as fc.Arbitrary<User>;

// Address Generator
export const addressGenerator = () =>
  fc.record({
    id: fc.uuid(),
    label: fc.string({ minLength: 1, maxLength: 50 }),
    recipientName: fc.string({ minLength: 1, maxLength: 100 }),
    addressLine1: fc.string({ minLength: 1, maxLength: 100 }),
    addressLine2: fc.option(fc.string({ minLength: 1, maxLength: 100 }), {
      nil: undefined,
    }),
    city: fc.string({ minLength: 1, maxLength: 50 }),
    state: fc.string({ minLength: 2, maxLength: 2 }),
    postalCode: fc.string({ minLength: 5, maxLength: 10 }),
    country: fc.constantFrom('US', 'CN', 'CA', 'UK'),
    phone: fc.string({ minLength: 10, maxLength: 15 }),
    isDefault: fc.boolean(),
    inUse: fc.boolean(),
  }) as fc.Arbitrary<Address>;

// Address with shipments (inUse = true)
export const addressWithShipmentsGenerator = () =>
  addressGenerator().map((address) => ({ ...address, inUse: true }));

// Address list generator
export const addressListGenerator = () =>
  fc.array(addressGenerator(), { minLength: 0, maxLength: 10 });

// Invalid Email Generator
export const invalidEmailGenerator = () =>
  fc.oneof(
    fc.string().filter((s) => !s.includes('@')),
    fc.string().map((s) => s + '@'),
    fc.string().map((s) => '@' + s)
  );

// Invalid Tracking Number Generator
export const invalidTrackingNumberGenerator = () =>
  fc.oneof(
    fc.string({ maxLength: 5 }),
    fc.string({ minLength: 50 }),
    fc.string().filter((s) => /[^A-Z0-9]/.test(s))
  );

// Valid Tracking Number Generator
export const validTrackingNumberGenerator = () =>
  fc.string({ minLength: 10, maxLength: 16 }).filter(s => /^[A-Z]{2,4}[0-9]{8,12}$/.test(s));

// Navigation State Generator - simplified
export const navigationStateGenerator = () =>
  fc.record({
    currentUser: fc.option(userGenerator(), { nil: null }),
    onLogoClick: fc.func(fc.anything()),
    onMenuItemClick: fc.func(fc.anything()),
    onSearch: fc.func(fc.anything()),
    onLanguageChange: fc.func(fc.anything()),
  });

// Page Generator
export const pageGenerator = () =>
  fc.constantFrom('home', 'dashboard', 'tracking', 'reports', 'about');

// Overview State Generator
export const overviewStateGenerator = () =>
  fc.record({
    shipments: fc.array(
      fc.record({
        id: fc.uuid(),
        trackingNumber: fc.string({ minLength: 10, maxLength: 20 }),
        status: fc.constantFrom(
          ShipmentStatus.PENDING,
          ShipmentStatus.IN_TRANSIT,
          ShipmentStatus.OUT_FOR_DELIVERY,
          ShipmentStatus.DELIVERED,
          ShipmentStatus.EXCEPTION
        ),
        origin: addressGenerator(),
        destination: addressGenerator(),
        createdAt: fc.date(),
        estimatedDelivery: fc.date(),
        actualDelivery: fc.option(fc.date(), { nil: undefined }),
      }) as fc.Arbitrary<Shipment>,
      { minLength: 0, maxLength: 5 }
    ),
  });
