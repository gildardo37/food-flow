import { ButtonLink } from "@/components/Button/ButtonLink";
import { useGetOrders } from "@/hooks/useApi";
import { createOrderPage, orderDetailPage } from "@/utils/consts";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const OrdersPage: NextPage = () => {
  const { data: orders, isLoading, error } = useGetOrders();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <ButtonLink href={createOrderPage} type="primary">
          Add Order
        </ButtonLink>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error && orders?.error ? (
        <p>{error.message}</p>
      ) : orders?.data ? (
        <div className="grid grid-cols-3 gap-8">
          {orders?.data.map(({ id, created_at, table_fk, user_fk }) => (
            <Link
              key={id}
              href={orderDetailPage(id)}
              className="radio flex cursor-pointer flex-col rounded-md border-2 border-slate-100 bg-slate-100 p-4"
            >
              <div>Table: {table_fk}</div>
              <div>User: {user_fk}</div>
              <div>{new Date(created_at).toLocaleString()}</div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Something failed</p>
      )}
    </section>
  );
};

export default OrdersPage;
