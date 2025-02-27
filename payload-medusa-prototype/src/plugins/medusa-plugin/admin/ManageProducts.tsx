'use client';

import React, { useState } from 'react';
import Medusa from '@medusajs/js-sdk';
import { Gutter, Button, TextInput } from '@payloadcms/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const sdk = new Medusa({
  baseUrl: 'http://localhost:9000', // Replace with your Medusa backend URL
  debug: process.env.NODE_ENV === 'development',
  apiKey: process.env.NEXT_PUBLIC_MEDUSA_API_SECRET,
});

// the create moet nog juist gemapt worden aan de hand van de data van newProduct
const addProduct = async (newProduct: any) => {

  const response = await sdk.admin.product.create({
    title: newProduct.title,

    options: [
      {
      title: newProduct.optionTitle,
      values: [newProduct.optionValues],
    },
  ],
    shipping_profile_id: 'sp_01JKT5BAW15K58EAQ799KT1Q6Z',
  });

  console.log('PRODUCT ADDED: ', response);
  return response;

};


const ManageProducts: React.FC = () => {
  const [title, setTitle] = useState('');
  const [optionTitle, setOptionTitle] = useState('');
  const [optionValue, setOptionValue] = useState('');
  const [error, setError] = useState<string | null>(null);


  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['admin-products']});
      setTitle('');
      setOptionTitle('');
      setOptionValue('');
    },
    onError: (error) => {
      console.error('Error adding product:', error);
      setError('Error adding product');
    },
  });


  const handleAddProduct = (e: any) => {
    e.preventDefault();
    setError(null);

    // Ensure optionValue is not null or undefined
    if (!optionValue) {
      setError('Option Value cannot be empty');
      return;
    }

    console.log('Mutating with:', { title, optionTitle, optionValue });
    mutate({ title, optionTitle, optionValue });
  };


  return (
    <Gutter>
      <div>
        <h2>Add Product</h2>
        {error && <div>Error: {error}</div>}
        <TextInput
          label="Title"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          path="title"
        />
        <TextInput
          label="Option Title"
          value={optionTitle}
          onChange={(e:any) => setOptionTitle(e.target.value)}
          path="optionTitle"
        />
        <TextInput
          label="Option Value"
          value={optionValue}
          onChange={(e:any) => setOptionValue(e.target.value)}
          path="optionValue"
        />

        <Button onClick={handleAddProduct}>Add Product</Button>

      </div>
    </Gutter>
  );
};

export default ManageProducts;
