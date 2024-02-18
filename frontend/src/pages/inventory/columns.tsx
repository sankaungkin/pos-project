import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import { ArrowUpDown, MinusCircle, PlusCircle } from "lucide-react";

import React from "react";

export type ProductType = {
  id: string;
  productName: string;
  uom: string;
  // //   buyPrice: number;
  //   sellPriceLevel1: number;
  //   sellPriceLevel2: number;
  reorderLvl: number;
  qtyOnHand: number;
  isActive: boolean;
  //   categoryId: number;
};

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CODE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 85,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("productName")}</div>,
  },
  {
    accessorKey: "uom",
    header: () => {
      return <Button variant="ghost">Unit</Button>;
    },

    cell: ({ row }) => <div>{row.getValue("uom")}</div>,
  },
  //   {
  //     accessorKey: "buyPrice",
  //     header: () => {
  //       return <Button variant="ghost">BuyPrice</Button>;
  //     },
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("sellPriceLevel2"));

  //       // Format the amount as a dollar amount
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "MMK",
  //       }).format(amount);

  //       return <div className="text-right font-medium">{formatted}</div>;
  //     },
  //   },
  //   {
  //     accessorKey: "sellPriceLevel1",
  //     header: () => {
  //       return <Button variant="ghost">SellPrice1</Button>;
  //     },
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("sellPriceLevel2"));

  //       // Format the amount as a dollar amount
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "MMK",
  //       }).format(amount);

  //       return <div className="text-right font-medium">{formatted}</div>;
  //     },
  //   },
  //   {
  //     accessorKey: "sellPriceLevel2",
  //     header: () => {
  //       return <Button variant="ghost">SellPrice2</Button>;
  //     },
  //     // cell: (status) => (
  //     //   <div className="w-[100px]">{status.getValue() as React.ReactNode}</div>
  //     // ),
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("sellPriceLevel2"));

  //       // Format the amount as a dollar amount
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "MMK",
  //       }).format(amount);

  //       return <div className="text-right font-medium">{formatted}</div>;
  //     },
  //   },
  {
    accessorKey: "isActive",
    header: () => {
      return <Button variant="ghost">Active</Button>;
    },
    cell: (status) => (
      <div className={`bg-${status.getValue() ? "gray-200" : "red-400"}`}>
        {/* <div className="bg-green-400"> */}
        {status.getValue() ? "ACTIVE" : "INACTIVE"}
      </div>
    ),
  },

  {
    accessorKey: "qtyOnHand",
    maxSize: 10,
    header: () => {
      return <Button variant="ghost">OnHand</Button>;
    },
    cell: (status) => (
      <div
        className={`bg-${
          Number(status.getValue()) > 10 ? "gray-200" : "yellow-400"
        }`}
        // className="bg-yellow-400"
      >
        {status.getValue() as React.ReactNode}
      </div>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    // cell: ({ row }) => {
    cell: () => {
      return (
        <div className="flex flex-row justify-center m-auto w-auto">
          <Button variant="outline" size="icon" className="h-5 w-5 mr-5">
            <PlusCircle className="h-auto w-auto" />
          </Button>
          <Button variant="outline" size="icon" className="h-5 w-5 mr-5">
            <MinusCircle className="h-5 w-5" />
          </Button>

          {/* <UpdateProduct
            id={row.getValue("id")}
            buyPrice={row.getValue("buyPrice")}
            isActive={row.getValue("isActive")}
            productName={row.getValue("productName")}
            qtyOnHand={row.getValue("qtyOnHand")}
            reorderLvl={row.getValue("reorderLvl")}
            sellPriceLevel1={row.getValue("sellPriceLevel1")}
            sellPriceLevel2={row.getValue("sellPriceLevel2")}
            categoryId={17}
            uom={row.getValue("uom")}
            key={row.getValue("id")}
          />

          <DeleteProduct
            id={row.getValue("id")}
            productName={row.getValue("productName")}
          /> */}
        </div>
      );
    },
  },

  //   {
  //     accessorKey: "category.categoryName",
  //     size: 200,
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Category
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //     cell: (status) => (
  //       <div className=" text-left w-auto">
  //         {status.getValue() as React.ReactNode}
  //       </div>
  //     ),
  //   },
  {
    accessorKey: "reorderLvl",
    maxSize: 10,
    header: () => {
      return <Button variant="ghost">Reorder</Button>;
    },
    cell: (status) => (
      <div className="w-auto text-center">
        {status.getValue() as React.ReactNode}
      </div>
    ),
  },
];
