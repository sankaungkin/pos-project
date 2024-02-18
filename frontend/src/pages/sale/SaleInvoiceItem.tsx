import { FC, ChangeEvent } from "react";
import InvoiceField from "./InvoiceField";

interface InvoiceItemProps {
  id: string;
  name: string;
  qty: number;
  price: number;
  onDeleteItem: (id: string) => void;
  onEdtiItem: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InvoiceItem: FC<InvoiceItemProps> = ({
  id,
  name,
  qty,
  price,
  onDeleteItem,
  onEdtiItem,
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr>
      <td className="w-full">
        <InvoiceField
          onEditItem={(event: ChangeEvent<HTMLInputElement>) =>
            onEdtiItem(event)
          }
          cellData={{
            placeholder: "Item name",
            type: "text",
            name: "name",
            id: id,
            value: name,
          }}
        />
      </td>
      <td className="min-w-[65px] md:min-w-[80px]">
        <InvoiceField
          onEditItem={(event: ChangeEvent<HTMLInputElement>) =>
            onEdtiItem(event)
          }
          cellData={{
            type: "number",
            min: 1,
            name: "qty",
            id: id,
            value: qty,
          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 sm:left-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* SVG path data here */}
        </svg>
        <InvoiceField
          onEditItem={(event: ChangeEvent<HTMLInputElement>) =>
            onEdtiItem(event)
          }
          cellData={{
            className: "text-right",
            type: "number",
            min: 0.01,
            step: 0.01,
            name: "price",
            id: id,
            value: price,
          }}
        />
      </td>
      <td className="flex items-center justify-center">
        <button
          className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
          onClick={deleteItemHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* SVG path data here */}
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
