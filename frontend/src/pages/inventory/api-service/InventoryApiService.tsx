import jwtInterceptor from "../../../util/jwtInterceptor";

export type InventoryDataType = {
  inQty: number;
  outQty: number;
  productId: string;
  remark: string;
};

const increase = async (data: InventoryDataType) => {
  const response = await jwtInterceptor.post(
    "http://localhost:5555/inventories/increase/",
    { data: data },
    { withCredentials: true }
  );
  return response.data;
};

const decrease = async (data: InventoryDataType) => {
  const response = await jwtInterceptor.post(
    "http://localhost:5555/inventories/decrease/",
    { data: data },
    { withCredentials: true }
  );
  return response.data;
};

const InventoryService = {
  increase,
  decrease,
};
export default InventoryService;
