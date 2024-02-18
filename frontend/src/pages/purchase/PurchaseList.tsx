import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PurchaseType, columns } from "./columns";
import PurchaseService from "./api/PurchaseApi";
import { Loader2 } from "lucide-react";
import { DataTable } from "./data-table";

const PurchaseList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    {
      !user && navigate("/unauthorized");
    }
  }, [navigate, user]);
  const { data, error, isLoading } = useQuery<PurchaseType[], Error>({
    queryKey: ["purchases"],
    queryFn: PurchaseService.fetchPurchases,
  });

  // console.log(data);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600">{error.message}</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <br />
        <p className="text-3xl"> Loading...</p>
      </div>
    );
  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default PurchaseList;
