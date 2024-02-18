import { CategoryType } from "./columns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Pencil } from "lucide-react";
import CategoryService from "./api-service/CategoryApiService";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Icons from "../../components/Icons";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateCategoryProps {
  id: number;
  categoryName: string;
}

const formSchema = z.object({
  id: z.number(),
  categoryName: z.string().trim().min(3, {
    message: "minimum length is 3 characters",
  }),
});
const UpdateCategory: React.FC<UpdateCategoryProps> = (editCategory) => {
  const toastId = "update-category";

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const updateCategoryMutation = useMutation(CategoryService.update, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const category: CategoryType = editCategory;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: category.id,
      categoryName: category.categoryName,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const updateCategory: CategoryType = {
      id: values.id,
      categoryName: values.categoryName,
    };

    setTimeout(() => {
      setOpen(false);
      updateCategoryMutation.mutate(updateCategory);
      setIsLoading(false);
    }, 1000);

    toast.warn("Update successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId,
      transition: Slide,
      theme: "colored",
    });
  }

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [form, open]);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="h-5 w-5 mr-5">
            <Pencil className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-blue-400">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CODE</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus={false}
                        {...field}
                        className="font-bold text-red-900 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CODE</FormLabel>
                    <FormControl>
                      <Input autoFocus={false} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
    </>
  );
};

export default UpdateCategory;
