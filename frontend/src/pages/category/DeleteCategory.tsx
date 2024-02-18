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
import { CategoryType } from "./columns";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryService from "./api-service/CategoryApiService";
import Icons from "../../components/Icons";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DeleteCategoryProps {
  id: number;
  categoryName: string;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = (deleteCategory) => {
  const category: CategoryType = deleteCategory;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toastId = "delete_category";

  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation(CategoryService.deleteCategory, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],

        refetchType: "active",
      });
    },
  });

  function handleSubmit(id: number) {
    console.log(id);
    setIsLoading(true);
    setTimeout(() => {
      setOpen(false);
      deleteCategoryMutation.mutate(id);
      setIsLoading(false);
    }, 1000);

    toast.warning(`Category ${id} has been deleted..`, {
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
            <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
            <AlertDialogDescription className="text-blue-800 font-bold">
              This will permanently delete category
              <p className="text-yellow-800 font-bold"> CODE: {category.id}</p>
              <p className="text-blue-800 font-bold">{category.categoryName}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSubmit(category.id)}>
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

export default DeleteCategory;
