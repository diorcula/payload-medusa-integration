'use client'

import React from 'react';
import { Gutter } from '@payloadcms/ui';
import ManageProducts from './ManageProducts';
import ShippingProfiles from './ShippingProfiles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AdminViewProps } from 'payload';

// Define or import the Locale type
type Locale = string; // Adjust this according to your actual Locale type

// Create a new QueryClient for Tanstack Query to be used in all components
const queryClient = new QueryClient();

const CustomAdminUI: React.FC<AdminViewProps> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Gutter>
        <div>
          <h1>Medusa Dashboard</h1>
          <ManageProducts />
          <ShippingProfiles />
        </div>
      </Gutter>
    </QueryClientProvider>
  );
};

export default CustomAdminUI;
