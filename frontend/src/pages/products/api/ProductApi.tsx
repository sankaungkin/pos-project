import jwtInterceptor from "../../../util/jwtInterceptor";

export type CreateProductType = {
  id: string;
  productName: string;
  uom: string;
  buyPrice: number;
  sellPriceLevel1: number;
  sellPriceLevel2: number;
  reorderLvl: number;
  qtyOnHand: number;
  isActive: boolean;
  categoryId: number;
};
export type UpdateProduct = {
  id: string;
  buyPrice: number;
  isActive: boolean;
  productName: string;
  qtyOnHand: number;
  reorderLvl: number;
  sellPriceLevel1: number;
  sellPriceLevel2: number;
  categoryId: number;
  brandName: string;
  uom: string;
};

const fetchProducts = async () => {
  const response = await jwtInterceptor.get("http://localhost:5555/product", {
    withCredentials: true,
  });
  // console.log(response.data);
  return response.data;
};

const create = async (newProduct: CreateProductType) => {
  // console.log(newProduct);
  const response = await jwtInterceptor.post(
    "http://localhost:5555/product/",
    newProduct,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const update = async (product: UpdateProduct) => {
  const response = await jwtInterceptor.put(
    `http://localhost:5555/product/${product.id}`,
    {
      buyPrice: product.buyPrice,
      isActive: product.isActive,
      productName: product.productName,
      qtyOnHand: product.qtyOnHand,
      reorderLvl: product.reorderLvl,
      sellPriceLevel1: product.sellPriceLevel1,
      sellPriceLevel2: product.sellPriceLevel2,
      uom: product.uom,
      categoryId: product.categoryId,
      brandName: product.brandName,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getProductId = async () => {
  const response = await jwtInterceptor.get(
    "http://localhost:5555/product/auto-id",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deleteProduct = async (id: string) => {
  const response = await jwtInterceptor.delete(
    `http://localhost:5555/product/${id}`,
    {
      withCredentials: true,
    }
  );
  return response;
};

const fetchProduct = async (id: string) => {
  const response = await jwtInterceptor.get(
    `http://localhost:5555/product/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const fetchBestSellingProducts = async () => {
  const response = await jwtInterceptor.get(
    "http://localhost:5555/topfivesellingproducts",
    { withCredentials: true }
  );
  return response.data;
};

const ProductService = {
  fetchProducts,
  update,
  create,
  getProductId,
  deleteProduct,
  fetchProduct,
  fetchBestSellingProducts,
};

export default ProductService;
