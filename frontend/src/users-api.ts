
const environment = {
    apiRoot: 'http://localhost:3000/api'
};

async function postToUserEndpoint(endpoint: string, email: string, password: string) {
    try {
        const response = await fetch(`${environment.apiRoot}/users/${endpoint}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`${endpoint} failed:`, error);
        throw error;
    }
}

export async function login(email: string, password: string) {
    return postToUserEndpoint('login', email, password);
}

export async function register(email: string, password: string) {
    return postToUserEndpoint('register', email, password);
}