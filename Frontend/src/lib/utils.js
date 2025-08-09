export function formatDate(date) {
  const parsedDate = new Date(date); // force conversion to Date object

  if (isNaN(parsedDate)) return "Invalid date";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
