'use client';

import React, { useState } from 'react';
import Medusa from '@medusajs/js-sdk';
import { Gutter, Button, TextInput } from '@payloadcms/ui';

const sdk = new Medusa({
  baseUrl: 'http://localhost:9000', // Replace with your Medusa backend URL
  debug: process.env.NODE_ENV === 'development',
  apiKey: process.env.NEXT_PUBLIC_MEDUSA_API_SECRET,
});

const ManageProducts: React.FC = () => {
  const [title, setTitle] = useState('');
  const [optionTitle, setOptionTitle] = useState('');
  const [optionValue, setOptionValue] = useState('');
  const [variantTitle, setVariantTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddProduct = async () => {
    try {
      const response = await sdk.admin.product.create({
        title,
        options: [
          {
            title: optionTitle,
            values: [optionValue],
          },
        ],
        variants: [
          {
            title: variantTitle,
            options: {
              [optionTitle]: optionValue,
            },
            prices: [],
          },
        ],
        shipping_profile_id: 'sp_01JKT5BAW15K58EAQ799KT1Q6Z',
      });
      console.log('Product added:', response);
      setTitle('');
      setOptionTitle('');
      setOptionValue('');
      setVariantTitle('');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product');
    }
  };

  return (
    <Gutter>
      <div>
        <h2>Add Product</h2>
        {error && <div>Error: {error}</div>}
        <TextInput
          label="Title"
          value={title}
          onChange={(e:any) => setTitle(e.target.value)}
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
        <TextInput
          label="Variant Title"
          value={variantTitle}
          onChange={(e:any) => setVariantTitle(e.target.value)}
          path="variantTitle"
        />
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>
    </Gutter>
  );
};

export default ManageProducts;
