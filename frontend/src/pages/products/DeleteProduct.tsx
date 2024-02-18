import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Icons from "../../components/Icons";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "./api/ProductApi";

interface DeleteProductProps {
  id: string;
  productName: string;
}

const DeleteProduct: React.FC<DeleteProductProps> = (deleteProduct) => {
  const product = deleteProduct;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toastId = "delete_product";

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation(ProductService.deleteProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],

        refetchType: "active",
      });
    },
  });

  function handleSubmit(id: string) {
    // console.log(id);
    setIsLoading(true);
    setTimeout(() => {
      setOpen(false);
      deleteProductMutation.mutate(id);
      setIsLoading(false);
    }, 1000);

    toast.warning(`Product ${id} has been deleted..`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId,
      transition: Slide,
    });
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5"
            onClick={() => handleSubmit}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}

            <Trash2 className="h-5 w-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-orange-300">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-800 font-bold">
              Are you sure to delete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete Product.
              <p className="text-yellow-800 font-bold"> CODE: {product.id}</p>
              <p className="text-blue-800 font-bold">{product.productName}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSubmit(product.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
    </>
  );
};

export default DeleteProduct;
