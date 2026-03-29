export const useNumber = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  return { formatCurrency };
};
