import { ButtonLink } from "@/components/Button/ButtonLink";
import { useGetOrders } from "@/hooks/useApi";
import { createOrderPage, orderDetailPage } from "@/utils/consts";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const OrdersPage: NextPage = () => {
  const { data: orders, isLoading, error } = useGetOrders();

  console.log(orders?.data);

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
          {orders?.data.map(({ id, createdAt, user, table }) => (
            <Link
              key={id}
              href={orderDetailPage(id)}
              className="radio flex cursor-pointer flex-col rounded-md border-2 border-slate-100 bg-slate-100 p-4"
            >
              <div>Table: {table.id}</div>
              <div>User: {user.firstName}</div>
              <div>{new Date(createdAt).toLocaleString()}</div>
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
