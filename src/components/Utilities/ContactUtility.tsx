import axios from 'axios';

// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export async function fetchRecaptchaConfig() {
    try {
        const response = await axios.get('https://profitable-sheri-seebers-8755823d.koyeb.app/api/recaptcha/config');
        return (response.data);
    } catch (err) {
        return ('Failed to load reCAPTCHA configuration');
    }
};

export async function fetchEmailJSConfig() {
    try {
        const response = await axios.get('https://profitable-sheri-seebers-8755823d.koyeb.app/api/emailjs/config');
        return (response.data);
    } catch (err) {
        return ('Failed to load EmailJS configuration');
    }
};