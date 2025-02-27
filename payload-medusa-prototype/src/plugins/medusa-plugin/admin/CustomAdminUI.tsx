'use client';

import React from 'react';
import { Gutter } from '@payloadcms/ui';
import ListProducts from './ListProducts';
import ManageProducts from './ManageProducts';
import ShippingProfiles from './ShippingProfiles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Create a new QueryClient for Tanstack Query to be used in all components
const queryClient = new QueryClient();

const CustomAdminUI: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Gutter>
      <div>
        <h1>Medusa Products</h1>
        <ListProducts />
        <ManageProducts />
        <ShippingProfiles />
      </div>
    </Gutter>
    </QueryClientProvider>
  );
};

export default CustomAdminUI;
