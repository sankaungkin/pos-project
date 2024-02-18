import jwtInterceptor from "../../../util/jwtInterceptor";

const getSaleInvoiceId = async () => {
  const response = await jwtInterceptor.get(
    `http://localhost:5555/saleinvoiceautoid`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const SaleInvoiceService = {
  getSaleInvoiceId,
};

export default SaleInvoiceService;
