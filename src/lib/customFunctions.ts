export function snakeToTitleCase(str: string): string {
  return str
    .split("_") // Split the string by underscores
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize first letter, lowercase the rest
    )
    .join(" "); // Join the words with a space in between
}
export function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export function remappingKeys(
  something: object,
  labels: string[],
  cutFrom: number,
  cutTo: number
) {
  return Object.entries(something)
    .map(([key, value], index) => {
      return { name: labels[index], value };
    })
    .slice(cutFrom, cutTo);
}

export function divide(
  dataTable: { name: string; value: string | number }[],
  divider: number
) {
  const newDataTable = dataTable.map((item) => {
    return {
      name: item.name,
      value: Math.round(+item.value / divider).toLocaleString("fr-FR"),
    };
  });
  return newDataTable;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
