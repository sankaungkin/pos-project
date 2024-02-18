import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { z } from "zod";
import ProductService from "./api/ProductApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../../components/ui/button";
import { PlusSquare } from "lucide-react";
import { DialogContent, DialogHeader } from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../components/ui/input";
import Icons from "../../components/Icons";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import CategoryService from "../category/api-service/CategoryApiService";
import { CategoryType } from "../category/columns";

const formSchema = z.object({
  id: z.string().trim().min(3, {
    message: "minimum length is 3 characters",
  }),
  productName: z.string().trim().min(3, {
    message: "minimum length is 3 characters",
  }),
  uom: z.string().trim().min(3, {
    message: "minimum length is 3 characters",
  }),
  buyPrice: z.coerce
    .number()
    .min(0, "Amount must be a positive number")
    .default(0),
  sellPriceLevel1: z.coerce
    .number()
    .min(50, "Amount must be a positive number")
    .default(0),
  sellPriceLevel2: z.coerce
    .number()
    .min(50, "Amount must be a positive number")
    .default(0),
  reorderLvl: z.coerce
    .number()
    .min(1, "Amount must be a positive number")
    .default(1),
  qtyOnHand: z.coerce
    .number()
    .min(0, "Amount must be a positive number")
    .default(0),
  brandName: z.string().default("NO BRAND"),
  isActive: z.boolean().default(true),
  categoryId: z.number().default(17),
});

const CreateProduct: React.FC = () => {
  const toastId = "create-product";
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const addProductMutation = useMutation(ProductService.create, {
    onSuccess: async () => {
      // Invalidates cache and refetch
      await queryClient.invalidateQueries({
        queryKey: ["products"],

        refetchType: "active",
      });
    },
  });

  const { data } = useQuery<CategoryType[], Error>({
    queryKey: ["categories"],
    queryFn: CategoryService.fetchAll,
  });

  const { data: newProductId } = useQuery<string | "0">({
    queryFn: ProductService.getProductId,
    queryKey: ["productId"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    setIsLoading(true);

    try {
      setTimeout(() => {
        setOpen(false);
        addProductMutation.mutate(values);
        // console.log(values);
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
            <DialogTitle>Create Product</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CODE</FormLabel>
                      <FormControl>
                        <Input
                          autoFocus={true}
                          {...field}
                          defaultValue={newProductId}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="m-auto">
                      <FormLabel>ACTIVE</FormLabel>
                      <FormControl className="flex flex-row items-end space-x-3 ml-5">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input autoFocus={false} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="uom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UNIT</FormLabel>
                      <FormControl>
                        <Input autoFocus={false} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="buyPrice"
                  render={({ field }) => (
                    <FormItem className="ml-auto">
                      <FormLabel>Buy Price</FormLabel>
                      <FormControl>
                        <Input autoFocus={false} {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="sellPriceLevel1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SellPrice 1</FormLabel>
                      <FormControl>
                        <Input autoFocus={false} {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellPriceLevel2"
                  render={({ field }) => (
                    <FormItem className="ml-auto">
                      <FormLabel>SellPrice 2</FormLabel>
                      <FormControl>
                        <Input autoFocus={false} {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="qtyOnHand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>On Hand</FormLabel>
                      <FormControl>
                        <Input autoFocus={false} {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reorderLvl"
                  render={({ field }) => (
                    <FormItem className="ml-auto">
                      <FormLabel>Reorder Lvl</FormLabel>
                      <FormControl>
                        <Input autoFocus={false} {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-row ">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={() => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              {data?.map((element) => (
                                <SelectItem
                                  key={element.id}
                                  value={element.id.toString()}
                                >
                                  {element.categoryName}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right ml-auto">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create
                  </Button>
                </div>
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

export default CreateProduct;
