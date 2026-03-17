const SERVER_BASE_URL = 'https://ruderalis-api.onrender.com/api/v1';
// const SERVER_BASE_URL = 'http://localhost:8080/api/v1';
const REGULARIS_THEME_VARIANT = 'REGULARIS_THEME_VARIANT';
const REGULARIS_AUTH_TOKEN = 'REGULARIS_AUTH_TOKEN';
const REGULARIS_AUTH_DATA = 'REGULARIS_AUTH_DATA';
const DEV_MODE = false;

const DEV_USER = {
    _id: '64a1b2c3d4e5f6a7b8c9d0e1',
    firstName: 'Shay',
    lastName: 'Ford',
    fullName: 'Shay Ford',
    username: 'shayford',
    email: 'shay@ruderalis.com',
    phone: '+1 (702) 420-0099',
    pin: '1234',
    status: 'active',
    role: 'user',
    image: null,
    gender: 'Male',
    dob: '1995-06-15',
    medicalCardNumber: 'MED-NV-2024-00042',
    medicalCardExpiry: '2026-06-15',
    address: {
        street: '420 Green Street',
        addressLine1: '420 Green Street',
        addressLine2: 'Suite 4B',
        city: 'Las Vegas',
        state: 'Nevada',
        zip: '89101',
        zipCode: '89101',
        country: 'United States',
    },
    shippingAddress: {
        firstName: 'Shay',
        lastName: 'Ford',
        phone: '+1 (702) 420-0099',
        addressLine1: '420 Green Street',
        addressLine2: 'Suite 4B',
        city: 'Las Vegas',
        state: 'Nevada',
        zipCode: '89101',
        country: 'United States',
    },
    balance: 5000,
    totalOrders: 12,
    totalSpent: 2450,
    memberSince: '2024-01-15',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2025-12-01T10:00:00.000Z',
};

const DEV_TOKEN = 'dev-bypass-token-ruderalis-2024';

export const CONSTANTS = {
    SERVER_BASE_URL, REGULARIS_THEME_VARIANT, REGULARIS_AUTH_TOKEN,
    REGULARIS_AUTH_DATA, DEV_MODE, DEV_USER, DEV_TOKEN
};