import React from "react";
import { NextPage } from "next";
import { useGetTables } from "@/hooks/useApi";
import { Card } from "@/components/Card";
import { Stepper } from "@/components/Stepper";

const Order: NextPage = () => {
  const { data, isPending: isTableLoading, error } = useGetTables();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Progress</h2>
        <Stepper />
      </div>
      {isTableLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : data?.data?.length ? (
        <div>
          <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {data.data.map(({ id, name, capacity }) => (
              <li key={id}>
                <Card>
                  name: {name}, capacity: {capacity}
                </Card>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Something failed</p>
      )}
    </section>
  );
};

export default Order;
