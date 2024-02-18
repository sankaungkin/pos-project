import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { PlusSquare } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import Icons from "@/components/Icons";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from "./api-service/CategoryApiService";

const formSchema = z.object({
  categoryName: z.string().trim().min(3, {
    message: "minimum length is 3 characters",
  }),
});

const CreateCategory: React.FC = () => {
  const toastId = "create-category";
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const addCategoryMutation = useMutation(CategoryService.create, {
    onSuccess: async () => {
      // Invalidates cache and refetch
      await queryClient.invalidateQueries({
        queryKey: ["categories"],

        refetchType: "active",
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.categoryName);
    setIsLoading(true);

    try {
      setTimeout(() => {
        setOpen(false);
        addCategoryMutation.mutate(values.categoryName);
        setIsLoading(false);
      }, 1000);
      toast.info("Create successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000, //3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide,
      });
    } catch (error) {
      toast.error("Error on create", {
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
          <Button size="icon" className="h-8 w-8 mr-5 mt-1">
            <PlusSquare className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-2-[425px] bg-blue-400">
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input autoFocus={true} {...field} />
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
                  Create
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

export default CreateCategory;
