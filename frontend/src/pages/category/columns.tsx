import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";

export type CategoryType = {
  id: number;
  categoryName: string;
};

export const columns: ColumnDef<CategoryType>[] = [
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("categoryName")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row justify-center m-auto">
          {/* <Button variant="outline" size="icon" className="h-5 w-5 mr-5">
            <Pencil className="h-5 w-5" />
          </Button> */}
          <UpdateCategory
            id={row.getValue("id")}
            categoryName={row.getValue("categoryName")}
            key={row.getValue("id")}
          />
          <DeleteCategory
            id={row.getValue("id")}
            categoryName={row.getValue("categoryName")}
          />
        </div>
      );
    },
  },
];
