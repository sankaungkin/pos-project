import { useEffect, useState } from "react";
import Select from "react-select";
import ProductService from "../products/api/ProductApi";
import { ProductType } from "../products/columns";
import { useQuery } from "@tanstack/react-query";

type Option = {
  label: string;
  value: string;
  price: number;
};

interface ChildComponentProps {
  onChange: (selectedOption: Option) => void;
}

const SelectProduct: React.FC<ChildComponentProps> = ({ onChange }) => {
  // ! populate the products to select option

  const [options, setOptions] = useState<Option[]>([]);
  const { data } = useQuery<ProductType[], Error>({
    queryKey: ["products"],
    queryFn: ProductService.fetchProducts,
  });
  useEffect(() => {
    const results: Option[] = [];

    if (data) {
      data.forEach((value) => {
        results.push({
          label: value.productName.toString(),
          value: value.id,
          price: value.sellPriceLevel1,
        });
      });
      setOptions([
        { label: "Select a product", value: "", price: 0 },
        ...results,
      ]);
    }
  }, [data]);

  // ! select the product from select

  // const onChange = (option: Option | null) => {
  //   console.log("SelectedOption:", option?.value, option?.label, option?.price);
  //   if (option)
  //     setSelectedProduct({
  //       label: option.label,
  //       price: option.price,
  //       value: option.value,
  //     });
  //   console.log("SelectedProduct:", selectedProduct);
  // };

  const handleSelectChange = (selectedOption) => {
    // Send the selected value to the parent component
    onChange(selectedOption);
  };

  return (
    <>
      <div className="w-4/12">
        <Select options={options} onChange={handleSelectChange} />
      </div>
    </>
  );
};

export default SelectProduct;
