/**
 * This component fetches and displays a list of products from a Medusa API.
 * It takes `endpoint` and `apiKey` as props to make authenticated requests to the Medusa API.
 * The fetched products are stored in the component's state and rendered as a list.
 */

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { sdk } from '../payload.config';
import Medusa from '@medusajs/js-sdk';

interface MedusaProductsProps {}

const sdk = new Medusa({
  baseUrl: 'http://localhost:9000', // Replace with your Medusa backend URL
  debug: process.env.NODE_ENV === 'development',
  apiKey: process.env.MEDUSA_API_SECRET,
  // auth: {
  //   type: "session",
  // },
})

const MedusaProducts: React.FC<MedusaProductsProps> = () => {
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
        setError('MedusaProducts Component: Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Medusa Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MedusaProducts;
