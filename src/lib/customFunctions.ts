import { prisma } from "./prisma";

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
  divider: number | number[]
) {
  if (typeof divider === "number") {
    const newDataTable = dataTable.map((item) => {
      return {
        name: item.name,
        value: Math.round(+item.value / divider).toLocaleString("fr-FR"),
      };
    });
    return newDataTable;
  } else {
    const newDataTable = dataTable.map((item, index) => {
      return {
        name: item.name,
        value: Math.round(+item.value / divider[index]).toLocaleString("fr-FR"),
      };
    });
    return newDataTable;
  }
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getKeys() {
  const dbKeys = [
    ...Object.keys(prisma.project.fields).slice(1, -1),
    ...Object.keys(prisma.parameters.fields).slice(1, -1),
    ...Object.keys(prisma.cost.fields).slice(1, -1),
  ];
  return dbKeys;
}

export function getPublicIdFromUrl(secureUrl: string): string | null {
  const regex =
    /https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/[^\/]+\/(.*)\..+/;
  const match = secureUrl.match(regex);

  if (match && match[1]) {
    return match[1]; // Return the public_id
  }

  return null; // Return null if the URL doesn't match the expected format
}
