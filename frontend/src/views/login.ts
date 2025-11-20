import { login } from "../users-api.js";

async function submitLoginForm(e: Event) {
    e.preventDefault();

    const email = document.querySelector<HTMLInputElement>('#login-email').value;
    const password = document.querySelector<HTMLInputElement>('#login-password').value;

    try {
        const loginInfo = await login(email, password);
        localStorage.setItem('jwt-token', loginInfo.jwt);
        window.location.href = '../index.html';
    }
    catch (err: any) {
        document.querySelector<HTMLElement>('#login-error').innerText = err.message;
    }
}

document.querySelector('form').addEventListener('submit', submitLoginForm);