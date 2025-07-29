import { useSelector } from 'react-redux';

export const useCurrencyConvert = () => {
  let { rate } = useSelector((state) => state.settings); // Access currency and rate from Redux

  rate = 1;
  const convertCurrency = (number) => {
    return Number((number * rate).toFixed(1));
  };
  return convertCurrency;
};
