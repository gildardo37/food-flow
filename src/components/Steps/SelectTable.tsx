import React from "react";
import { useGetTables } from "@/hooks/useApi";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";

interface Props {
  onChange: () => void;
}

export const SelectTable: React.FC<Props> = ({ onChange }) => {
  const [order, setOrder] = useAtom(orderAtom);
  const { data, isLoading: isTableLoading, error } = useGetTables();
  const { tableId } = order;

  const onTableChange = (id: number) => {
    setOrder((prev) => ({ ...prev, tableId: id }));
    onChange();
  };

  return isTableLoading ? (
    <p>Loading</p>
  ) : error ? (
    <p>{error.message}</p>
  ) : data?.data?.length ? (
    <form className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {data.data.map(({ id, name, capacity }) => (
        <label
          htmlFor={id.toString()}
          key={id}
          className="radio flex cursor-pointer flex-col rounded-md border-2 border-slate-100 bg-slate-100 p-4"
        >
          <input
            className="appearance-none"
            id={id.toString()}
            onChange={() => onTableChange(id)}
            type="radio"
            name="table"
            required
            checked={tableId === id}
          />
          <p className="font-semibold">
            {id} - Table {name}
          </p>
          <p>Capacity: {capacity} persons</p>
        </label>
      ))}
    </form>
  ) : (
    <p>Something failed</p>
  );
};
