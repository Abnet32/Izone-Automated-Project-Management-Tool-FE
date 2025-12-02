import Cookies from 'js-cookie';


const TOKEN_KEY = 'token';


export function setToken(token: string) {
// for simple usage; prefer httpOnly cookies from backend
Cookies.set(TOKEN_KEY, token, { secure: true });
}


export function getToken(): string | undefined {
return Cookies.get(TOKEN_KEY);
}


export function removeToken() {
Cookies.remove(TOKEN_KEY);
}