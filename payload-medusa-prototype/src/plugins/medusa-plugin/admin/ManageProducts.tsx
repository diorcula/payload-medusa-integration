'use client';

import React, { useState } from 'react';
import sdk from '../utils/medusaSdk';
import { Gutter, Button, TextInput } from '@payloadcms/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ListProducts from './ListProducts';

// Function to add a product; note that to take multiple variables, we pass an object
const addProduct = async (newProduct: { title: string; optionTitle: string; optionValue: string }) => {

  const response = await sdk.admin.product.create({
    title: newProduct.title,

    options: [
      {
      title: newProduct.optionTitle,
      values: [newProduct.optionValue],
    },
  ],
    shipping_profile_id: 'sp_01JKT5BAW15K58EAQ799KT1Q6Z', //hardcoded for now.
  });

  console.log('PRODUCT ADDED: ', response);
  return response;

};

const deleteProduct = async (productId: string) => {
  const response = await sdk.admin.product.delete(productId);
  console.log('PRODUCT DELETED: ', response);
  return response;
};


const ManageProducts: React.FC = () => {
  const [title, setTitle] = useState('');
  const [optionTitle, setOptionTitle] = useState('');
  const [optionValue, setOptionValue] = useState('');
  const [error, setError] = useState<string | null>(null);


  // the queryclient is used to invalidate the cache (query) after a mutation to reload the data
  const queryClient = useQueryClient();

  const addMutation = useMutation({
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

      // Deleting a product
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['admin-products']});
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      setError('Error deleting product');
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

    // Call the mutation function with the variables; multiple variables have to be mapped to an object
    addMutation.mutate({ title, optionTitle, optionValue });
  };

  return (
    <Gutter>
      <div>
        <h1>Manage Products</h1>
        <ListProducts onDelete={(productId) => deleteMutation.mutate(productId)} />
      </div>

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
    </Gutter>
  );
};

export default ManageProducts;
