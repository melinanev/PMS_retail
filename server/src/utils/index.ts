import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false;
      return decoded.exp * 1000 <Date.now();
    } catch (error) {
      return true;
    }
  }

  getToken(): string | null {
    // TODO: return the token
    return localStorage.getItem("id_token");

  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/login");
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page

  }
}

export default new AuthService();