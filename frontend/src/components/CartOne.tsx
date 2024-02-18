import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export type CardProps = {
  description: string;
  count: number | undefined | string;
};

const CardOne: React.FC<CardProps> = (cardProps) => {
  return (
    <Card className="w-[350px]  shadow-lg bg-blue-600">
      <CardHeader>
        <CardTitle>{cardProps.description}</CardTitle>
      </CardHeader>
      <CardContent className=""> {cardProps.count}</CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

export default CardOne;
