export const 
    WHITE = '#fff',
    GREY = '#D9D9D9',
    BURGUNDY = '#941A1D',
    BLACK = '#262626';

export function getProfile() {
    return 'John Smith';
}

export function isLoggedIn() {
    return getProfile() != null;
}

export function login() {

}

export function createAccount() {
    
}

export function getAnnouncements() {
    return [
        'Office closed Fri 12th',
        'New HR policy out now',
        'Quarterly report due 30th',
        'Happy hour Friday 5pm',
    ].filter((e, i) => i >= 4);
}