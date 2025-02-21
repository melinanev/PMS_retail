import { productData } from "../interfaces/productsData"; 



// This hopefully will display all products from our database
export const getProducts = async () => {
  try {
    const response = await fetch('/api/inventory', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
};

//This will hopefully get a single item based on ID that is passed as a param
export const getProduct = async (id: string) => {
  try {
    const response = await fetch(`/api/inventory/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
};

// This creates a new product
export const createProduct = async (body: productData) => {
  try {
    const response = await fetch(
      '/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from Product Creation: ', err);
    return Promise.reject('Could not create product');
  }
};

// This ideally updates an existing product
export const updateProduct = async (
  id: string,
  product: {
    sku: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    description: string;
    image?: string | null;
  }
) => {
  try {
    const response = await fetch(`/api/inventory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error updating product:', err);
    return Promise.reject('Could not update product');
  }
};

// This deletes a product
export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`/api/inventory/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error deleting product:', err);
    return Promise.reject('Could not delete product');
  }
};