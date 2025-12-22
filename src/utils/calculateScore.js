import { PESOS } from "../constants/weights";

export function calculateTotalScore(university) {
  let total = 0;

  Object.entries(PESOS).forEach(([key, weight]) => {
    const value = Number(university[key]) || 0;
    total += value * weight;
  });

  return total;
}
