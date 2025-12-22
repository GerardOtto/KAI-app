export function formatNumber(value, decimals = 2) {
    if (value === null || value === undefined || value === "") {
      return "—";
    }
  
    if (typeof value !== "number") {
      return value;
    }
  
    const factor = Math.pow(10, decimals);
    const truncated = Math.trunc(value * factor) / factor;
  
    // Si termina en .00, mostrar sin decimales
    if (Number.isInteger(truncated)) {
      return truncated.toString();
    }
  
    return truncated.toFixed(decimals);
  }
  