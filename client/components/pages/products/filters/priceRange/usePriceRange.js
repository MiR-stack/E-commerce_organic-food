import { useState, useEffect } from "react";
import useDynamicUrl from "../../../../../hooks/useDynamicUrl";

function usePriceRange() {
  const { searchParams, setRouter } = useDynamicUrl();

  const min = Number(searchParams.get("min"));
  const max = Number(searchParams.get("max"));
  const [priceRange, setPriceRange] = useState([min || 0, max || 100]);

  const handlePriceRange = (e, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleMinPriceRange = (e) => {
    let value = Math.abs(Number(e.target.value));

    if (value < priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
    }
  };
  const handleMaxPriceRange = (e) => {
    let value = Math.abs(Number(e.target.value));
    setPriceRange([priceRange[0], value]);
  };

  useEffect(() => {
    setRouter("min", priceRange[0]);
  }, [priceRange[0]]);

  useEffect(() => {
    setRouter("max", priceRange[1]);
  }, [priceRange[1]]);

  return {
    priceRange,
    handlePriceRange,
    handleMinPriceRange,
    handleMaxPriceRange,
  };
}

export default usePriceRange;
