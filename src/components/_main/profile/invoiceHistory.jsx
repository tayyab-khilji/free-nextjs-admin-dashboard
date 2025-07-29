'use client';
// react
import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
// mui
import { Box } from '@mui/material';

// api
import * as api from 'src/services';
// components
const Table = dynamic(() => import('src/components/table/table'));
// const OrderRow = dynamic(() => import('src/components/table/rows/orderRow'));
const OrderRow = dynamic(() => import('src/components/table/rows/Recentorders'));

const OrderCard = dynamic(() => import('src/components/cards/order'));

const dataArrray = [
  {
    _id: 'order_001',
    items: [
      {
        name: 'Product Name',
        fullName: 'Full Product Name',
        imageUrl: '/images/product1.jpg'
      }
    ],
    total: 99.99,
    status: 'delivered',
    createdAt: '2025-05-10T14:48:00.000Z'
  },
  {
    _id: 'order_002',
    items: [
      {
        name: 'Another Product',
        fullName: 'Another Full Product Name',
        imageUrl: '/images/product2.jpg'
      }
    ],
    total: 150.0,
    status: 'ontheway',
    createdAt: '2025-05-09T09:20:00.000Z'
  },
  {
    _id: 'order_003',
    items: [],
    total: 0,
    status: 'pending',
    createdAt: '2025-05-08T18:15:00.000Z'
  }
];

export default function InvoiceHistory() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const { data, isLoading } = useQuery(['user-invoice', pageParam], () =>
    api.getUserInvoice(`?page=${pageParam || 1}`)
  );

  const tableData = {
    // data: isLoading ? null : data?.data,
    data: dataArrray,

    count: 5
  };

  const TABLE_HEAD = [
    { id: 'name', label: 'Product', alignRight: false },
    { id: 'items', label: 'Items', alignRight: false },
    { id: 'total', label: 'Total', alignRight: false, sort: true },
    { id: 'inventoryType', label: 'Status', alignRight: false, sort: true },
    { id: 'createdAt', label: 'Date', alignRight: false, sort: true },
    { id: 'action', label: 'Action', alignRight: true, sort: true }
  ];

  return (
    <Box mt={3}>
      {isLoading ? null : (
        <Table headData={TABLE_HEAD} data={tableData} isLoading={false} row={OrderRow} mobileRow={OrderCard} />
      )}
    </Box>
  );
}
