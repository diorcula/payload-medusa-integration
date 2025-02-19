'use client';

import React, { useEffect, useState } from 'react';
import Medusa from '@medusajs/js-sdk';
import { Gutter, Table, Column } from '@payloadcms/ui';

const sdk = new Medusa({
  baseUrl: 'http://localhost:9000', // Replace with your Medusa backend URL
  debug: process.env.NODE_ENV === 'development',
  apiKey: process.env.NEXT_PUBLIC_MEDUSA_API_SECRET,
});

const ShippingProfiles: React.FC = () => {
  const [shippingProfiles, setShippingProfiles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShippingProfiles = async () => {
      try {
        const response = await sdk.admin.shippingProfile.list();
        setShippingProfiles(response.shipping_profiles);
      } catch (error) {
        console.error('Error fetching shipping profiles:', error);
        setError('Error fetching shipping profiles');
      }
    };

    fetchShippingProfiles();
  }, []);

  const columns: Column[] = [
    {
      accessor: 'id',
      active: true,
      field: { name: 'id', type: 'text' },
      Heading: 'Profile ID',
      renderedCells: shippingProfiles.map((profile) => <div key={profile.id}>{profile.id}</div>),
    },
    {
      accessor: 'name',
      active: true,
      field: { name: 'name', type: 'text' },
      Heading: 'Profile Name',
      renderedCells: shippingProfiles.map((profile) => <div key={profile.id}>{profile.name}</div>),
    },
  ];

  return (
    <Gutter>
      <div>
        <h2>Shipping Profiles</h2>
        {error && <div>Error: {error}</div>}
        {shippingProfiles.length > 0 ? (
          <Table columns={columns} data={shippingProfiles} />
        ) : (
          <p>No shipping profiles available.</p>
        )}
      </div>
    </Gutter>
  );
};

export default ShippingProfiles;
