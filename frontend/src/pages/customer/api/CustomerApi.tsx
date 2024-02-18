import jwtInterceptor from "../../../util/jwtInterceptor";

const fetchAllCustomers = async () => {
  const response = await jwtInterceptor.get(`http://localhost:5555/customer/`, {
    withCredentials: true,
  });
  return response.data;
};

const CustomerService = {
  fetchAllCustomers,
};

export default CustomerService;
