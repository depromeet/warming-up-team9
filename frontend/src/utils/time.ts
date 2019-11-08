export function parseToSpendTimeStr(spendTimeSec: number) {
  const hours = Math.floor(spendTimeSec / 60 / 60);
  const minutes = Math.floor((spendTimeSec - hours * 60 * 60) / 60);
  const seconds = spendTimeSec % 60;

  return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds
    .toString()
    .padStart(2, '0')}`;
}
