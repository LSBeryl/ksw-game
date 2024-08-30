export function formatMoney(num) {
  if (num < 10000) {
    return num.toLocaleString();
  }

  const units = ["", "만", "억", "조", "경", "해"];
  let result = "";
  let unitIndex = 0;

  while (num > 0) {
    const remainder = num % 10000;
    num = Math.floor(num / 10000);

    if (remainder > 0) {
      result =
        `${remainder.toLocaleString()}${units[unitIndex]} ` +
        result.toLocaleString();
    }

    unitIndex++;
  }

  return result.trim();
}
