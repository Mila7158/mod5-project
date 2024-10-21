import Cookies from 'js-cookie';

// Call this to get the "XSRF-TOKEN" cookie
export function restoreCSRF() {
    if (process.env.NODE_ENV !== 'production') {
        return csrfFetch('/api/csrf/restore'); // Make sure this endpoint is working
    } else {
        return Promise.resolve(); // In production, return a resolved promise
    }
}

export async function csrfFetch(url, options = {}) {
    // Set default method to 'GET'
    options.method = options.method || 'GET';

    // Set headers to an empty object if not present
    options.headers = options.headers || {};

    // If not a GET request, set 'Content-Type' and include 'XSRF-TOKEN' header
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    // Call fetch with the relative URL
    const res = await fetch(url, options);

    // Handle errors
    if (res.status >= 400) throw res;

    return res;
}


// import Cookies from 'js-cookie';
// import config from '../config/config';  // Import the config file

// // Call this to get the "XSRF-TOKEN" cookie
// export function restoreCSRF() {
//     if (process.env.NODE_ENV !== 'production') {
//         return csrfFetch(`${config.BASE_URL}/api/csrf/restore`); // Use base URL
//     } else {
//         return Promise.resolve(); // In production, return a resolved promise
//     }
// }

// export async function csrfFetch(url, options = {}) {
//     options.method = options.method || 'GET';
//     options.headers = options.headers || {};

//     if (options.method.toUpperCase() !== 'GET') {
//         options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
//         options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
//     }

//     const res = await fetch(`${config.BASE_URL}${url}`, options);  // Use base URL

//     if (res.status >= 400) throw res;

//     return res;
// }
