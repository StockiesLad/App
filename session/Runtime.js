export const
    WHITE = '#fff',
    GREY = '#D9D9D9',
    BURGUNDY = '#941A1D',
    BLACK = '#262626';

export const USER = "John Smith"; // Login is not needed

export function getStaff() {
    return Array.from({ length: 8 }, (_, i) => ({
        id: String(i),
        position: i > 3 ? "Manager": "Director",
        sector: i > 5 ? "Finance": "Software",
        name: `Employee ${i + 1}`,
        email: `employee${i + 1}@example.com`,
        mobilePhone: `0422 222 222`,
        homePhone: `+61 444 444 444`
    }));
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
    // TODO: implement API remove call
    console.log('Removing employee', id);
    return new Promise(resolve => setTimeout(resolve, 500));
}