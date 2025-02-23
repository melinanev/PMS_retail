import type { UserLogin } from '../interfaces/UserLogin';

// Login function
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const error = await response.json(); 
      throw new Error(error.message || 'User information not retrieved, check network tab!');
    }

    const data = await response.json(); 
    localStorage.setItem('token', data.token); 

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

// Register function
const register = async (username: string, password: string, firstName: string, lastName: string, email: string) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        firstName,  
        lastName,   
        email,
        role: "N/A"  
      }),
    });

    if (!response.ok) {
      
      const error = await response.json(); 
      throw new Error(error.message || "Registration failed");
    }

    const data = await response.json(); 
    console.log("User registered successfully:", data);
    return data;  

  } catch (error) {
    console.error("Error from user registration:", error);
    return Promise.reject("Registration failed");
  }
};

export { login, register };
