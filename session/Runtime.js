export const 
    WHITE = '#fff',
    GREY = '#D9D9D9',
    BURGUNDY = '#941A1D',
    BLACK = '#262626';

/** @type {string} */ var user = null;

export function retrieveProfile() {
    
}

export function getProfile() {
    return user;
}

export function isLoggedIn() {
    return getProfile() != null;
}

export async function handleLogin(navigation, email, password, setLoading) {
    setLoading(true);
    try {
      await login(email, password);    // assume `login()` returns a Promise
      navigation.replace('Home')
      StackActions
    } catch (err) {
      console.error(err);
      // show an error toast/snackbar if you like
    } finally {
      setLoading(false);
    }
  }

export async function login(email, password) {
    await new Promise(res => setTimeout(res, 1500));
    user = 'John Smith';
    return user;
}

export function createAccount() {
    
}

export function getAnnouncements() {
    return [
        'Office closed Fri 12th',
        'New HR policy out now',
        'Quarterly report due 30th',
        'Happy hour Friday 5pm',
    ].filter((e, i) => i < 4);
}