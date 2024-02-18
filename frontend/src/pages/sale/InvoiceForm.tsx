import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  Controller,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import SelectProduct from "./SelectProduct";
import { useEffect, useState } from "react";
import { XCircle, Equal, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SaleInvoiceService from "./api/SalesApi";
import CustomerService from "../customer/api/CustomerApi";
import Select from "react-select";
import { Label } from "../../components/ui/label";
import moment from "moment";

type FormValues = {
  id: string;
  discount: number;
  grandTotal: number;
  customerId: number;
  saleDetails: {
    id: string;
    productId: string;
    productName: string;
    price: number;
    qty: number;
    total: number;
  }[];
  total: number;
  invoiceDate: string;
};

type Option = {
  label: string;
  value: string;
  price: number;
};

type CustomerOption = {
  label: string;
  value: number;
};

const formSchema = z.object({
  id: z.string(),
  discount: z.coerce.number().default(0),
  grandTotal: z.coerce.number().default(0),
  customerId: z.coerce.number(),
  // customerId: z.string().default("4"),
  saleDetails: z.object({
    id: z.string(),
    productId: z.string(),
    productName: z.string(),
    price: z.coerce.number().default(1),
    qty: z.coerce.number().default(1),
    total: z.coerce.number(),
  }),
  totalAmount: z.coerce.number(),
  invoiceDate: z.string(),
});

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "saleDetails",
    control,
  });
  if (formValues) {
    const total = formValues.reduce(
      (acc, current) => acc + (current.price || 0) * (current.qty || 0),
      0
    );
    // return <p>Total Amount: {total}</p>;
    return (
      <div className="flex flex-row justify-between mt-3">
        <p>Total:</p>
        <div className="font-bold bg-yellow-500 text-xl p-1">{total}</div>
      </div>
    );
  } else return <p>Total Amount: 0 </p>;
};

const GrandTotal = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "saleDetails",
    control,
  });
  const discountValue = useWatch({
    name: "discount",
    defaultValue: 0,
    control,
  });
  if (formValues) {
    const grandTotal =
      formValues.reduce(
        (acc, current) => acc + (current.price || 0) * (current.qty || 0),
        0
      ) - discountValue;

    return (
      <div className="flex flex-row justify-between mt-3">
        <p>GrandTotal:</p>
        <div className="font-bold bg-green-500 text-xl p-1">{grandTotal}</div>
      </div>
    );
  } else return <p>GrandTotal: 0 </p>;
};

export default function InvoiceForm() {
  const { data: newInvoiceId } = useQuery({
    queryFn: SaleInvoiceService.getSaleInvoiceId,
    queryKey: ["saleInvoiceId"],
  });

  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: CustomerService.fetchAllCustomers,
  });

  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);

  useEffect(() => {
    const customerResult: CustomerOption[] = [];
    if (customers) {
      customers.forEach((value) => {
        customerResult.push({
          label: value.name,
          value: value.id,
        });
      });
      setCustomerOptions([...customerResult]);
    }
  }, [customers]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grandTotal: 0,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "saleDetails",
    control,
  });

  const watchItems =
    useWatch({
      control,
      name: "saleDetails",
    }) || [];

  const calculateSubtotal = (index: number) => {
    const item = watchItems[index];
    return item ? item.qty * item.price : 0;
  };

  const onSubmit = (data: FormValues) => {
    const total = data.saleDetails.reduce(
      (acc, current) => acc + (current.price || 0) * (current.qty || 0),
      0
    );

    const newData: FormValues = {
      ...data,
      total: total,
    };
    console.log("onSubmit:", newData);
  };

  const handleAdd = (data: Option) => {
    const existingProductIndex = watchItems.findIndex(
      (item) => item.productName === String(data.label)
    );
    if (
      existingProductIndex !== -1 &&
      watchItems.at(existingProductIndex)?.productName
    ) {
      // Product already exists, update quantity
      const updatedQuantity = watchItems[existingProductIndex].qty + 1;

      setValue(`saleDetails.${existingProductIndex}.qty`, updatedQuantity);
    } else {
      // Product does not exist, add new field
      append({
        id: crypto.randomUUID(),
        productId: data.value,
        productName: String(data.label),
        price: data.price,
        qty: 1,
        total: data.price,
      });
    }
  };

  const [selectProduct, setSelectedProduct] = useState<Option>({
    label: "",
    price: 0,
    value: "",
  });

  const invoiceDate = moment(new Date()).format("DD/MM/YYYY");

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discount = parseFloat(e.target.value) || 0;
    const total = watchItems.reduce(
      (acc, current) => acc + (current.price || 0) * (current.qty || 0),
      0
    );
    const grandTotal = total - discount;

    // Set the new values in the form
    setValue("discount", discount);
    setValue("grandTotal", grandTotal);
  };

  const handleChildSelectChange = (selectedOption: Option) => {
    // Handle the selected value in the parent component
    setSelectedProduct(selectedOption);
  };
  return (
    <div>
      <div className="mt-2">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-between  p-2">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <div className="flex flex-row">
                    <Label className="mt-3 mr-2">Invoice No:</Label>
                    <FormItem>
                      {/* <FormLabel>Invoice No:</FormLabel> */}
                      <FormControl>
                        <Input
                          autoFocus={true}
                          {...field}
                          defaultValue={newInvoiceId}
                          {...register("id")}
                          className="bg-blue-600 text-white text-lg"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              />
              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-row m-auto">
                    <Label className="mt-3 mr-2">Customer</Label>
                    <div className="w-auto">
                      <Select
                        options={customerOptions}
                        value={customerOptions.find(
                          (c) => c.value === field.value
                        )}
                        required
                        onChange={(val) => field.onChange(val?.value)}
                      />
                      {errors.customerId && <>{errors.customerId.message}</>}
                    </div>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="invoiceDate"
                render={({ field }) => (
                  <div className="flex flex-row">
                    <Label className="mt-3 mr-2">Date :</Label>
                    <FormItem>
                      <FormControl>
                        <Input
                          className="bg-blue-600 text-white text-lg"
                          defaultValue={invoiceDate}
                          {...register("invoiceDate")}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              />
            </div>

            {/* INVOICE DETAILS DIV */}
            <div className=" flex flex-row  m-auto p-2 mt-2 border-blue-900 border-double  border-4">
              {/* LINE ITEM DIV  */}
              <div className=" flex w-10/12">
                <div className="mt-5 w-8/12">
                  {fields.map((field, index) => {
                    return (
                      <div key={field.id} className="w-full">
                        <section className="flex p-15 mt-1">
                          <Input
                            className="w-5/12"
                            placeholder="product name"
                            {...register(
                              `saleDetails.${index}.productName` as const,
                              {
                                required: true,
                              }
                            )}
                          />

                          <Input
                            className="text-center w-16 ml-2"
                            placeholder="quantity"
                            type="number"
                            min={1}
                            {...register(`saleDetails.${index}.qty` as const, {
                              valueAsNumber: true,
                              required: true,
                            })}
                            defaultValue={1}
                          />
                          <X className="h-5 w-5 ml-2 mt-2" />
                          <Input
                            // className={errors?.cart?.[index]?.price ? "error" : ""}
                            className="text-blue-700 font-bold text-right w-28 ml-2"
                            placeholder="price"
                            type="number"
                            min={1}
                            disabled
                            {...register(
                              `saleDetails.${index}.price` as const,
                              {
                                valueAsNumber: true,
                                required: true,
                              }
                            )}
                          />
                          <Equal className="h-5 w-5 ml-2 mt-2" />
                          <p className=" mt-2 w-20 mr-2 text-right text-green-700 font-extrabold">
                            {calculateSubtotal(index)}
                          </p>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-5 w-5 mr-5 mt-2"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <XCircle className="h-5 w-5 text-red-600" />
                          </Button>
                        </section>
                      </div>
                    );
                  })}
                  {/* ADD PRODUCT DIV */}
                  <div className="flex flex-row mt-2 w-full">
                    <SelectProduct onChange={handleChildSelectChange} />
                    <Button
                      type="button"
                      className="ml-2"
                      onClick={() => {
                        handleAdd(selectProduct);
                      }}
                    >
                      ADD
                    </Button>
                  </div>
                </div>
              </div>
              {/* DISCOUNT AND TOTAL DIV */}
              <div>
                <div>
                  <Total control={control} />
                </div>

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <div>
                      <FormItem>
                        <div className="flex flex-row justify-between  mt-2">
                          <FormLabel className="mt-3 mr-5">Discount</FormLabel>
                          <FormControl>
                            <Input
                              autoFocus={false}
                              {...field}
                              {...register("discount", { valueAsNumber: true })}
                              min={0}
                              type="number"
                              onChange={handleDiscountChange}
                              required
                              className="text-right text-lg w-20 border-yellow-500"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                      {errors.discount && <Label>Error</Label>}
                    </div>
                  )}
                ></FormField>
                <GrandTotal control={control} />

                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
