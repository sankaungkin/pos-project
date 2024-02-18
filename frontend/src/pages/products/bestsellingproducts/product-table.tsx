import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import ProductService from "../api/ProductApi";
import { Loader2 } from "lucide-react";

export type TopSellingProductsType = {
  productId: string;
  productName: string;
  sum: number;
};

const ProductTable = () => {
  const { data, error, isLoading } = useQuery<TopSellingProductsType[], Error>({
    queryKey: ["bestSelling"],
    queryFn: ProductService.fetchBestSellingProducts,
  });

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600">{error.message}</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <br />
        <p className="text-3xl"> Loading...</p>
      </div>
    );
  return (
    <div>
      <>TOP SELLING PRODUCTS</>
      <Table className="border-solid shadow-md border-2">
        <TableHeader className="bg-blue-400 text-black">
          <TableRow>
            <TableHead className="w-[100px]">ProductID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead className="text-right">Sold Quantity</TableHead>
          </TableRow>
        </TableHeader>
        {data?.map((product) => (
          <TableBody>
            <TableRow key={product.productId}>
              <TableCell className="font-medium">{product.productId}</TableCell>
              <TableCell className="w-full text-left">
                {product.productName}
              </TableCell>
              <TableCell className="text-right">{product.sum}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default ProductTable;
