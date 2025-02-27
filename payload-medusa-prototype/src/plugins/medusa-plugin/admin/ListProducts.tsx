'use client';

import React from 'react';
import Medusa from '@medusajs/js-sdk';
import { Gutter, Table, Column } from '@payloadcms/ui';
import { useQuery } from '@tanstack/react-query';
import { AdminProduct } from '@medusajs/types';

const sdk = new Medusa({
  baseUrl: 'http://localhost:9000', // Replace with your Medusa backend URL
  debug: process.env.NODE_ENV === 'development',
  apiKey: process.env.NEXT_PUBLIC_MEDUSA_API_SECRET,
});


const fetchProducts = async () => {
  const response = await sdk.admin.product.list();
  console.log('API Response:', response); // Log the API response
  return response.products;
};

const transformProductToRecord = (product: AdminProduct): Record<string, unknown> => ({
  id: product.id,
  title: product.title,
  status: product.status,
});

const ListProducts: React.FC = () => {
  const { data: products = [], error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  if (error) {
    return <div>Error: {error.message}</div>;
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
      accessor: 'status',
      active: true,
      field: { name: 'status', type: 'text' },
      Heading: 'Status',
      renderedCells: products.map((product) => <div key={product.id}>{product.status}</div>),
    },
  ];

  const transformedProducts = products.map(transformProductToRecord);

  return (
    <Gutter>
      <div>
        <h2>Product List</h2>
        <Table columns={columns} data={transformedProducts} />
      </div>
    </Gutter>
  );
};

export default ListProducts;
