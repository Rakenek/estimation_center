import { Cost, Parameters, Project } from "@prisma/client";
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
        value: Math.round(+item.value / divider),
      };
    });
    return newDataTable;
  } else {
    const newDataTable = dataTable.map((item, index) => {
      return {
        name: item.name,
        value: Math.round(+item.value / divider[index]),
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

export function subtractObjects<T extends Cost>(obj1: T, obj2: T): T {
  const result = {} as T; // Explicitly define result as T

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (typeof obj1[key] === "number" && typeof obj2[key] === "number") {
        result[key] = (obj1[key] - obj2[key]) as T[typeof key]; // Type assertion to maintain type safety
      } else if (
        typeof obj1[key] === "string" &&
        typeof obj2[key] === "string"
      ) {
        result[key] = obj1[key] as T[typeof key];
      }
    }
  }

  return result;
}

interface Item {
  name: string;
  value: number;
}

export function combineArrays(arr1: Item[], arr2: Item[]): Item[] {
  // Create a new array to store the result
  const result: Item[] = [];

  // Loop through arr1 and match with arr2 based on name
  arr1.forEach((item1) => {
    // Find the matching item in arr2 based on the 'name'
    const item2 = arr2.find((item) => item.name === item1.name);

    if (item2) {
      // If a match is found, subtract values and push the result to the new array
      result.push({
        name: item1.name,
        value: item1.value - item2.value,
      });
    } else {
      // If no match is found, just take the item from arr1
      result.push({
        name: item1.name,
        value: item1.value,
      });
    }
  });

  return result;
}

interface SteelPrice {
  year: number;
  week: string;
  min_PUDS: number;
  max_PUDS: number;
  avg_PUDS: number;
  prefabricated: number;
  complete: number;
}

export const transformSteelPrices = (steelPrices: SteelPrice[]) => {
  return steelPrices.map((item) => ({
    yearAndWeek: `${item.week} - ${item.year}`,
    min_PUDS: item.min_PUDS,
    max_PUDS: item.max_PUDS,
    avg_PUDS: item.avg_PUDS,
    prefabricated: item.prefabricated,
    complete: item.complete,
  }));
};
