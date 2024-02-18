import { useQuery } from "@tanstack/react-query";
import CardOne from "../../components/CartOne";
import Products from "../products/Products";
import DashboardDataService from "./dashboardapi";
import ProductTable from "../products/bestsellingproducts/product-table";

type DataItem = {
  count: number;
};

const Dashboard = () => {
  const { data: totalProducts } = useQuery<number, Error>({
    queryKey: ["totalProducts"],
    queryFn: DashboardDataService.getTotalProducts,
  });

  const { data: reorderProducts } = useQuery<DataItem[], Error>({
    queryKey: ["reorderPRoducts"],
    queryFn: DashboardDataService.reorderProductCount,
  });

  return (
    <>
      <div className=" flex gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* <CardOne />
            <CardTwo />
            <CardThree />
            <CardFour /> */}
        <CardOne
          description="TotalProducts"
          count={totalProducts ? totalProducts : 0}
          key={1}
        />
        <CardOne
          description="Rerorder"
          count={reorderProducts?.at(0)?.count}
          key={2}
        />
        <ProductTable />
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"> */}
      <div className="mt-4  gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne />
            <ChartTwo />
            <ChartThree />
            <MapOne /> */}
        <Products />
        <div className="col-span-12 xl:col-span-8"></div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};
export default Dashboard;
