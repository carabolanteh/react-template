import { useResponsive } from "./useResponsive";

export const BREACKPOINTS = [
  { width: 576, cant: 1 },
  { width: 768, cant: 2 },
  { width: 992, cant: 2 },
  { width: 1200, cant: 3 },
];

export const useBreackpoint = () => {
  const width = useResponsive();

  for (const breackpoint of BREACKPOINTS) {
    if (width <= breackpoint.width) {
      return breackpoint.cant;
    }
  }
  return 3;
};
