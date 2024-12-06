"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import axios from "axios";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HousePricePredictor() {
  const [size, setSize] = useState<number>(1000);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    100000, 1000000,
  ]);

  useEffect(() => {
    // Update price range based on size
    setPriceRange([size * 100, size * 300]);
  }, [size]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/predict", {
        size,
      });
      setPrice(data.price);
      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="size">House Size: {size} sq ft</Label>
        <Slider
          id="size"
          min={500}
          max={5000}
          step={100}
          value={[size]}
          onValueChange={(value) => setSize(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label>Estimated Price Range</Label>
        <div className="flex justify-between text-sm text-gray-500">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${((size - 500) / 4500) * 100}%` }}
          ></div>
        </div>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Predicting..." : "Predict Price"}
      </Button>
      <AnimatePresence>
        {price !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg"
          >
            <p className="text-2xl font-bold text-white text-center">
              Estimated Price
            </p>
            <p className="text-4xl font-extrabold text-white text-center mt-2">
              ${price.toLocaleString()}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);
//   try {
//     const { data } = await axios.post("http://localhost:5000/predict", {
//       size: parseInt(size),
//     });
//     setPrice(data.price);
//   } catch (error) {
//     console.error("Error:", error);
//   }
//   setLoading(false);
// };
