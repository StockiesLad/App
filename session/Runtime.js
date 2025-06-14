export const
    WHITE = '#fff',
    GREY = '#D9D9D9',
    BURGUNDY = '#941A1D',
    BLACK = '#262626';

export const USER = "John Smith"; // Login is not needed

export function getStaff() {
    return Array.from({ length: 8 }, (_, i) => ({
        id: String(i),
        name: `Employee ${i + 1}`
    }));
}

export function findStaffMember(name) {
    return getStaff().find(e => e.name === name)
}