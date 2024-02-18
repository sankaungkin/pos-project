import jwtInterceptor from "../../util/jwtInterceptor";

const getTotalProducts = async () => {
  const response = await jwtInterceptor.get(
    "http://localhost:5555/totalproducts",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const reorderProductCount = async () => {
  const response = await jwtInterceptor.get(
    "http://localhost:5555/reorderproductcount",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const top5sellingProducts = async () => {
  const response = await jwtInterceptor.get(
    "http://localhost:5555/topfivesellingproducts",
    { withCredentials: true }
  );
  return response.data;
};

const DashboardDataService = {
  getTotalProducts,
  reorderProductCount,
  top5sellingProducts,
};

export default DashboardDataService;
