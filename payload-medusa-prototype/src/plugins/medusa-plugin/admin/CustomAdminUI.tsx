'use client';

import React from 'react';
import { Gutter } from '@payloadcms/ui';
import ListProducts from './ListProducts';
import ManageProducts from './ManageProducts';
import ShippingProfiles from './ShippingProfiles';

const CustomAdminUI: React.FC = () => {
  return (
    <Gutter>
      <div>
        <h1>Medusa Products</h1>
        <ListProducts />
        <ManageProducts />
        <ShippingProfiles />
      </div>
    </Gutter>
  );
};

export default CustomAdminUI;
