export interface IInvoiceItem {
  id: string;
  itemName: string;
  qty: number;
  price: number;
}

export type InvoiceStore = {
  invoiceItems: IInvoiceItem[];
  isInvoiceOpen: boolean;
  openInvoice: () => void;
  closeInvoice: () => void;
  setItemQuantity0: (id: string) => void;
  increateItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  getInvoiceQuantity: () => void;
  getTotalPrice: () => number;
};

export type SetState = (fn: (prevState: InvoiceStore) => InvoiceStore) => void;

export const setItemQuantity0 = (
  invoiceItems: IInvoiceItem[],
  id: string
): IInvoiceItem[] => {
  return invoiceItems.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        quantity: item.qty ? (item.qty = 0) : 1,
      };
    }
    return item;
  });
};

export const increateItemQuantity = (
  invoiceItems: IInvoiceItem[],
  id: string
): IInvoiceItem[] => {
  return invoiceItems.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        qty: item.qty ? item.qty + 1 : 1,
      };
    }
    return item;
  });
};

export const decreaseItemQuantity = (
  invoiceItems: IInvoiceItem[],
  id: string
): IInvoiceItem[] => {
  return invoiceItems.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        qty: item.qty ? item.qty - 1 : 0,
      };
    }
    return item;
  });
};

export const getTotalPrice = (invoiceItems: IInvoiceItem[]): number => {
  const totalPrice = invoiceItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  return totalPrice;
};

export const getGrandTotalPrice = (
  invoiceItems: IInvoiceItem[],
  discount: number
): number => {
  const grandTotal =
    invoiceItems.reduce((total, item) => total + item.price * item.qty, 0) -
    discount;
  return grandTotal;
};

export const openInvoice = (invoice: InvoiceStore) => {
  return (invoice.isInvoiceOpen = true);
};

export const closeInvoice = (invoice: InvoiceStore) => {
  return (invoice.isInvoiceOpen = false);
};
