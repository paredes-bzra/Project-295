import { register } from "../users-api.js";

async function submitRegisterForm(e: Event) {
    e.preventDefault();

    const email = document.querySelector<HTMLInputElement>('#register-email').value;
    const password = document.querySelector<HTMLInputElement>('#register-password').value;
    const passwordConfirm = document.querySelector<HTMLInputElement>('#register-password-confirm').value;
    
    if (password === passwordConfirm) {
        try {
            const loginInfo = await register(email, password);
            localStorage.setItem('jwt-token', loginInfo.jwt);
            window.location.href = '../index.html';
        }
        catch (err: any) {
            document.querySelector<HTMLElement>('#register-error').innerText = err?.message;
        }
    }
    else {
        document.querySelector<HTMLElement>('#register-error').innerText = "Password confirmation didn't match.";
    }
}

document.querySelector('form').addEventListener('submit', submitRegisterForm);