'use client';

import React, { useEffect, useState } from 'react';
import Medusa from '@medusajs/js-sdk';
import { Gutter, Table, Column } from '@payloadcms/ui';

const sdk = new Medusa({
  baseUrl: 'http://localhost:9000', // Replace with your Medusa backend URL
  debug: process.env.NODE_ENV === 'development',
  apiKey: process.env.NEXT_PUBLIC_MEDUSA_API_SECRET,
});

const ListProducts: React.FC = () => {
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
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns: Column[] = [
    {
      accessor: 'id',
      active: true,
      field: { name: 'id', type: 'text' },
      Heading: 'Product ID',
      renderedCells: products.map((product) => <div key={product.id}>{product.id}</div>),
    },
    {
      accessor: 'title',
      active: true,
      field: { name: 'title', type: 'text' },
      Heading: 'Title',
      renderedCells: products.map((product) => <div key={product.id}>{product.title}</div>),
    },
    {
      accessor: 'price',
      active: true,
      field: { name: 'price', type: 'number' },
      Heading: 'Price',
      renderedCells: products.map((product) => <div key={product.id}>{product.price}</div>),
    },
    {
      accessor: 'status',
      active: true,
      field: { name: 'status', type: 'text' },
      Heading: 'Status',
      renderedCells: products.map((product) => <div key={product.id}>{product.status}</div>),
    },
  ];

  return (
    <Gutter>
      <div>
        <h2>Product List</h2>
        <Table columns={columns} data={products} />
      </div>
    </Gutter>
  );
};

export default ListProducts;
