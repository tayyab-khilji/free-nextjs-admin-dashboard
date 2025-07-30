'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
// component
import Table from 'src/components/table/table';
import UserList from 'src/components/table/rows/usersList';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false, sort: true },
  { id: 'email', label: 'Email', alignRight: false, sort: true },
  { id: 'plan', label: 'Plan', alignRight: false, sort: false },
  { id: 'joined', label: 'Joining Date', alignRight: false, sort: true },
  { id: 'status', label: 'Status', alignRight: false, sort: true },
  { id: '', label: 'Actions', alignRight: true }
];

const data = {
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "cover": {
        "url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      "name": "john doe",
      "email": "john.doe@example.com",
      "plan": "Free",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "cover": {
        "url": "https://images.unsplash.com/photo-1494790108755-2616b612b169?w=150&h=150&fit=crop&crop=face"
      },
      "name": "jane smith",
      "email": "jane.smith@example.com",
      "plan": "Monthly",
      "status": "blocked",
      "createdAt": "2024-02-20T14:45:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "cover": null,
      "name": "mike johnson",
      "email": "mike.johnson@example.com",
      "plan": "Annual",
      "status": "suspended",
      "createdAt": "2024-03-10T09:15:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439014",
      "cover": {
        "url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      "name": "sarah wilson",
      "email": "sarah.wilson@example.com",
      "plan": "Free",
      "status": "pending",
      "createdAt": "2023-12-05T16:20:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "cover": {
        "url": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
      },
      "name": "david brown",
      "email": "david.brown@example.com",
      "plan": "Monthly",
      "status": "active",
      "createdAt": "2024-04-02T11:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439016",
      "cover": null,
      "name": "emily davis",
      "email": "emily.davis@example.com",
      "plan": "Annual",
      "status": "suspended",
      "createdAt": "2024-01-28T08:45:00.000Z"
    }
  ]
}


export default function AdminProducts() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [count, setCount] = useState(0);

  // const { data, isLoading } = useQuery(
  //   ['user', pageParam, searchParam, count],
  //   () => api.getAllUsers(+pageParam || 1, searchParam || ''),
  //   {
  //     onError: (err) => {
  //       toast.error(err.response.data.message || 'Something went wrong!');
  //     }
  //   }
  // );

  const [id, setId] = useState(null);



  return (
    <>
      <Table headData={TABLE_HEAD} data={data} isLoading={false} row={UserList} setId={setId} id={setId} isSearch={false} />
    </>
  );
}
