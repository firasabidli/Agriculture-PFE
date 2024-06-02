import axios from 'axios';

//const API_BASE_URL = 'http://localhost:3001'; // Remplacez ceci par l'URL de votre backend

const setAuthHeaders = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const AuthService = {
    login: async (email, password) => {
      try {
        const response = await axios.post('http://localhost:3001/auth/Login', {
          email: email,
          password: password
        });
        const authToken = response.data.authToken;
        const user = response.data.user;
        console.log("user",user);
        console.log("auth",authToken)
        setAuthHeaders(authToken);
        // Stocker le jeton d'authentification et les informations utilisateur dans le stockage local
        localStorage.setItem('authToken', response.data.authToken);
        localStorage.setItem('user', JSON.stringify(user));
  
        // Retourner à la fois le jeton d'authentification et les informations utilisateur
        return { authToken, user };
      } catch (error) {
        throw error;
      }
    },

  logout: () => {
    setAuthHeaders(null);
    localStorage.removeItem('authToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

export default AuthService;
