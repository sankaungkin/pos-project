import jwtInterceptor from "../../../util/jwtInterceptor";
import { CategoryType } from "../columns";

const create = async (data: string) => {
  const response = await jwtInterceptor.post(
    "http://localhost:5555/category",
    { categoryName: data },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deleteCategory = async (id: number) => {
  const response = await jwtInterceptor.delete(
    `http://localhost:5555/category/${id}`,
    { withCredentials: true }
  );
  return response;
};

const fetchAll = async () => {
  const response = await jwtInterceptor.get("http://localhost:5555/category", {
    withCredentials: true,
  });
  // console.log(response.data);
  return response.data;
};
const update = async (category: CategoryType) => {
  const response = await jwtInterceptor.put(
    `http://localhost:5555/category/${category.id}`,
    {
      categoryName: category.categoryName,
    },
    { withCredentials: true }
  );
  return response.data;
};

const fetchCategory = async (id: number) => {
  const response = await jwtInterceptor.get<CategoryType>(
    `http://localhost:5555/category/${id}`,

    { withCredentials: true }
  );
  return response.data;
};

const CategoryService = {
  create,
  fetchAll,
  update,
  deleteCategory,
  fetchCategory,
};

export default CategoryService;
