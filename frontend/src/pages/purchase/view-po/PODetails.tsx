import React, { useState } from "react";
import { PurchaseType } from "../columns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PurchaseService from "../api/PurchaseApi";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { ZoomIn } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DialogHeader, DialogTitle } from "../../../components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../components/ui/input";
import Icons from "../../../components/Icons";
import { Label } from "../../../components/ui/label";

const itemSchema = z.object({
  productName: z.string(),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  total: z.coerce.number(),
});

const formSchema = z.object({
  id: z.string(),
  supplierName: z.string(),
  total: z.coerce.number(),
  discuount: z.coerce.number(),
  grandTotal: z.coerce.number(),
  purchaseDate: z.string(),
  lineItems: z.array(itemSchema),
});

const PODetails: React.FC<PurchaseType> = (viewPO) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const result = useQuery(["po", viewPO.id], () =>
    PurchaseService.fetchIndividualPO(viewPO)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // console.log(result);
  // console.log(formSchema);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="h-5 w-5 mr-5">
            <ZoomIn className="h-5 w-5" />
          </Button>
        </DialogTrigger>

        <DialogContent className=" sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>View PO</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PODetails;
