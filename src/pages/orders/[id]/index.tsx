import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetOrderById } from "@/hooks/useApi";

const OrderDetailPage: NextPage = () => {
  const { query } = useRouter();
  const orderId = query.id as string;
  const { data, isLoading, error } = useGetOrderById(orderId);

  console.log(data);
  const order = data?.data;
  console.log(order);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Order</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error && data?.error ? (
        <p>{error.message}</p>
      ) : order ? (
        <div className="grid grid-cols-3 gap-8">
          <div className="radio flex flex-col rounded-md border-2 border-slate-100 bg-slate-100 p-4">
            <div>Table: {order.table_fk}</div>
            <div>User: {order.user_fk}</div>
            <div>{new Date(order.created_at).toLocaleString()}</div>
          </div>
        </div>
      ) : (
        <p>Something failed</p>
      )}
    </section>
  );
};

export default OrderDetailPage;
