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
import { ProductType } from "./columns";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductService from "./api/ProductApi";
import Icons from "../../components/Icons";
import { Checkbox } from "../../components/ui/checkbox";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { CategoryType } from "../category/columns";
import CategoryService from "../category/api-service/CategoryApiService";

// const categorySchema = z.object({
//   categoryId: z.coerce.number(),
//   categoryName: z.string(),
// });

const formSchema = z.object({
  id: z.string(),
  productName: z.string().trim().min(3, {
    message: "minimum length is 3 characters",
  }),
  brandName: z.string(),
  uom: z.string().trim().min(3, {
    message: "minimum length is 3 characters",
  }),
  buyPrice: z.coerce.number(),
  sellPriceLevel1: z.coerce.number(),
  sellPriceLevel2: z.coerce.number(),
  reorderLvl: z.coerce.number(),
  qtyOnHand: z.coerce.number(),
  isActive: z.boolean(),
  categoryId: z.coerce.number(),
  // category: categorySchema,
});

export type ResultProduct = {
  id?: string;
  productName?: string;
  uom?: string;
  buyPrice?: number;
  sellPriceLevel1?: number;
  sellPriceLevel2?: number;
  reorderLvl?: number;
  qtyOnHand?: number;
  brandName?: string;
  isActive?: boolean;
  categoryId?: number;
  categoryName?: string;
};

const UpdateProduct: React.FC<ProductType> = (editProduct) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    productName: "",
    uom: "",
    buyPrice: 0,
    qtyOnHand: 0,
    isActive: false,
    reorderlvl: 0,
    sellPriceLevel1: 0,
    sellPriceLevel2: 0,
    categoryId: 0,
    category: {
      categoryId: 0,
      categoryName: "",
    },
  });

  const { data: catData } = useQuery<CategoryType[], Error>({
    queryKey: ["categories"],
    queryFn: CategoryService.fetchAll,
  });

  const toastId = "update-category";
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation(ProductService.update, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const result = useQuery(["product", editProduct.id], () =>
    ProductService.fetchProduct(editProduct.id)
  );
  // console.log(result.data);
  useEffect(() => {
    setProduct(result.data);
    form.reset(product);
    if (!open) {
      form.reset();
    }
  }, [form, open, product, result.data]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const updateProduct = {
      id: values.id,
      buyPrice: values.buyPrice,
      isActive: values.isActive,
      productName: values.productName,
      qtyOnHand: values.qtyOnHand,
      reorderLvl: values.reorderLvl,
      sellPriceLevel1: values.sellPriceLevel1,
      sellPriceLevel2: values.sellPriceLevel2,
      categoryId: values.categoryId,
      brandName: values.brandName,
      uom: values.uom,
    };
    // console.log("updateProduct:", updateProduct);
    setTimeout(() => {
      setOpen(false);
      updateProductMutation.mutate(updateProduct);
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
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CODE (Don't Update)</FormLabel>
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
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
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
                  name="brandName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BRAND</FormLabel>
                      <FormControl>
                        <Input autoFocus={false} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex-row ml-1 ">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                className="overflow-visible"
                                placeholder={product.category.categoryName}
                              />
                            </SelectTrigger>
                            <SelectContent className="overflow-y-auto max-h-[10rem]">
                              <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                {catData?.map((element) => (
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
                </div>
                {/* <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input autoFocus={false} {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
              <div className="flex flex-row">
                <div>
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
                </div>
                <div className="ml-1">
                  <FormField
                    control={form.control}
                    name="buyPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Buy Price</FormLabel>
                        <FormControl>
                          <Input autoFocus={false} {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="sellPriceLevel1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SellPrice Level 1</FormLabel>
                      <FormControl>
                        <Input autoFocus={false} {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="ml-1">
                  <FormField
                    control={form.control}
                    name="sellPriceLevel2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SellPrice Level 2</FormLabel>
                        <FormControl>
                          <Input autoFocus={false} {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                <div className="ml-1">
                  <FormField
                    control={form.control}
                    name="reorderLvl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reorder Lvl</FormLabel>
                        <FormControl>
                          <Input autoFocus={false} {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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

export default UpdateProduct;
