/**
 * This component fetches and displays a list of products from a Medusa API.
 * It uses the Medusa JS SDK to make authenticated requests to the Medusa API.
 * The fetched products are stored in the component's state and rendered as a list.
 *
 * - Imports React, useEffect, and useState from 'react'.
 * - Imports Medusa from '@medusajs/js-sdk'.
 * - Initializes the Medusa SDK with the base URL, debug mode, and API key.
 * - Uses useState to manage the state of products and errors.
 * - Uses useEffect to fetch products from the Medusa API when the component mounts.
 * - Logs the API response and updates the state with the fetched products.
 * - Handles errors by updating the error state and displaying an error message.
 * - Renders a list of products or an error message.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Medusa from '@medusajs/js-sdk';
import { AdminViewComponent, AdminViewProps } from 'payload';

interface CustomAdminUIProps {
    // Define any required props here
}

const sdk = new Medusa({
  baseUrl: 'http://localhost:9000', // Replace with your Medusa backend URL
  debug: process.env.NODE_ENV === 'development',
  apiKey: process.env.NEXT_PUBLIC_MEDUSA_API_SECRET,
});

const CustomAdminUI: React.FC<CustomAdminUIProps> = (props) => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await sdk.admin.product.list();
        console.log('API Response:', response); // Log the API response
        if (response && Array.isArray(response.products)) {
          setProducts(response.products);
        } else {
          setError('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('CustomAdminUI Component: Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Medusa Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomAdminUI;
