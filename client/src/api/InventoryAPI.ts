import axios from 'axios';

const API_URL = 'http://localhost:5000/inventory'; // Updated to match your backend route

// Assuming the token is stored in localStorage
const token = localStorage.getItem('token'); // Replace with how you store the token

// Axios instance with the Authorization header
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (product: { name: string; price: number; image: string }) => {
  try {
    const response = await axiosInstance.post(`${API_URL}`, product);
    return response.data.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id: string, product: { name: string; price: number; image: string }) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, product);
    return response.data.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
