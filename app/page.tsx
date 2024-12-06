import HousePricePredictor from "@/components/house-price-predictor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>House Price Predictor</CardTitle>
          <CardDescription>
            Enter the size of the house to get a price estimate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HousePricePredictor />
        </CardContent>
      </Card>
    </div>
  );
}
