import {Platform} from "react-native";

export const
    WHITE = '#fff',
    GREY = '#D9D9D9',
    BURGUNDY = '#941A1D',
    BLACK = '#262626';

export const USER = "John Smith"; // Login is not needed

export const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
// noinspection HttpUrlsUsage
export const API_BASE = `http://${HOST}:5000`;

/**
 * @type {string[]}
 */
export const DepToString = {};
/**
 * @type {{int}}
 */
export const DepFromString = {};

export async function initializeDepartments(): Promise<void> {
    if (Object.keys(DepToString).length) return;

    const res = await fetch(`${API_BASE}/department`)
    if (!res.ok) {
        throw new Error(`Could not load departments: HTTP ${res.status}`)
    }

    const list: { id: number; name: string }[] = await res.json()
    list.forEach(d => {
        DepToString[d.id]     = d.name
        DepFromString[d.name] = d.id
    })
}

/**
 * @returns {Promise<[]>}
 */
export async function getStaff() {
    const url = `${API_BASE}/employee`;
    try {
        const res = await fetch(url);
        if (!res.ok) { // noinspection ExceptionCaughtLocallyJS
            throw new Error(`HTTP ${res.status}`);
        }
        return await res.json();
    } catch (err) {
        throw err;
    }
}

/**
 * Saves the updated employee data.
 * @param {string} id   The employee’s unique ID
 * @param {object} data The full metadata object
 */
export async function saveEmployee(id, data) {
    // TODO: hook this up to your API
    console.log('Saving employee', id, data);
    // simulate network delay
    return new Promise(resolve => setTimeout(resolve, 500));
}

export async function removeEmployee(id) {
    const res = await fetch(`${API_BASE}/employee/${id}`, {
         method: 'DELETE'
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Delete failed: ${body || `HTTP ${res.status}`}`);
    }
}

export async function createEmployee(data) {
    const response = await fetch(`${API_BASE}/employee`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Create failed: ${error}`);
    }

    return await response.json();
}