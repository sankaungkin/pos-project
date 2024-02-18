import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import { ArrowUpDown, ZoomIn } from "lucide-react";
import PODetails from "./view-po/PODetails";

export type PurchaseType = {
  id: string;
  total: number;
  grandTotal: number;
  purchaseDate: string;
  //   supplierId: number;
  //   supplier: {
  //     name: string;
  //     supplierId: number;
  //   };
  supplier: string;
  remark: string;
};

export const columns: ColumnDef<PurchaseType>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="flex flex-row justify-center m-auto">
          <PODetails
            grandTotal={100}
            id="PINV0001"
            purchaseDate="abcd"
            remark="abcd"
            supplier="9999122"
            total={1000}
            key="P0001"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ##PurchaseID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="text-left ml-6">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "grandTotal",
    header: () => {
      return <Button variant="ghost">GrandTotal</Button>;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("grandTotal"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MMK",
      }).format(amount);
      return <div className="text-center font-medium mr-5">{formatted}</div>;
    },
  },

  {
    accessorKey: "supplier.name",

    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Supplier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (status) => (
      <div className="text-left ml-5 w-auto">
        {status.getValue() as React.ReactNode}
      </div>
    ),
  },
  {
    accessorKey: "remark",
    size: 200,
    header: () => {
      return <Button variant="ghost">Remark</Button>;
    },
    cell: ({ row }) => (
      <div className="text-left ml-4">{row.getValue("remark")}</div>
    ),
  },
  {
    accessorKey: "purchaseDate",
    size: 200,
    header: () => {
      return <Button variant="ghost">Date</Button>;
    },
    cell: ({ row }) => (
      <div className="text-left ml-4">{row.getValue("purchaseDate")}</div>
    ),
  },
];
