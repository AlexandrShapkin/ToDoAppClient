function TimeConverter(date: Date): string {
  const numDate = Date.parse(date.toString());
  const dDate = new Date(numDate);

  return dDate.toLocaleString("ru-Ru", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default TimeConverter;