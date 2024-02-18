import { ChangeEvent, FC } from "react";

interface CellData {
  className?: string;
  type: string;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  name: string;
  id: string;
  value: string | number;
}

interface InvoiceFieldProps {
  onEditItem: (event: ChangeEvent<HTMLInputElement>) => void;
  cellData: CellData;
}

const InvoiceField: FC<InvoiceFieldProps> = ({ onEditItem, cellData }) => {
  return (
    <input
      className={cellData.className}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      required
    />
  );
};

export default InvoiceField;
