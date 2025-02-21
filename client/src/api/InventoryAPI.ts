import axios from 'axios';

const API_URL = 'http://localhost:5000/inventory'; 


const token = localStorage.getItem('token'); 


const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// This hopefully will display all products from our database
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

//This will hopefully get a single item based on ID that is passed as a param
export const getProduct = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error ('Error getting product', error);
    throw error;
  };
};

// This creates a new product
export const createProduct = async (product: { name: string; price: number; image: string }) => {
  try {
    const response = await axiosInstance.post(`${API_URL}`, product);
    return response.data.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// This ideally updates an existing product
export const updateProduct = async (id: string, product: { name: string; price: number; image: string }) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, product);
    return response.data.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// This deletes a product
export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
