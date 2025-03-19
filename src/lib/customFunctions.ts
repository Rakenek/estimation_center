import { Cost, Parameters, Project } from '@prisma/client';
import { prisma } from './prisma';

export function snakeToTitleCase(str: string): string {
  return str
    .split('_') // Split the string by underscores
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize first letter, lowercase the rest
    )
    .join(' '); // Join the words with a space in between
}
export function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
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
  if (typeof divider === 'number') {
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
      if (typeof obj1[key] === 'number' && typeof obj2[key] === 'number') {
        result[key] = (obj1[key] - obj2[key]) as T[typeof key]; // Type assertion to maintain type safety
      } else if (
        typeof obj1[key] === 'string' &&
        typeof obj2[key] === 'string'
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

// export async function generateDefaultObject(modelName: string) {
//   // Fetch column names and types dynamically from the database
//   const modelFields = await prisma.$queryRaw<
//     { column_name: string; data_type: string }[]
//   >`
//     SELECT column_name, data_type
//     FROM information_schema.columns
//     WHERE table_name = ${modelName}
//   `;

//   // Generate object with defaults
//   const defaultObject = Object.fromEntries(
//     modelFields
//       .map(({ column_name, data_type }) => ({ column_name, data_type }))
//       .filter(({ column_name }) => !column_name.includes("id")) // Exclude fields with "id" in the name
//       .map(({ column_name, data_type }) => [
//         column_name,
//         data_type.includes("double") ||
//         data_type.includes("numeric") ||
//         data_type.includes("float")
//           ? 0 // Set Float fields to 0
//           : "", // Set String fields to ""
//       ])
//   );

//   return defaultObject;
// }

// function moveFirstPropToLast(
//   obj: Record<string, unknown>
// ): Record<string, unknown> {
//   // Get the first key in the object
//   const firstKey = Object.keys(obj)[0];

//   // Create a new object with the first property moved to the end
//   const { [firstKey]: firstValue, ...rest } = obj;

//   // Return a new object with the first property at the end
//   return {
//     ...rest,
//     [firstKey]: firstValue,
//   };
// }

// export async function generateFlattenedDefaultObject(modelNames: string[]) {
//   // Helper function to generate default object for a single model
//   const generateDefaultObject = async (modelName: string) => {
//     // Fetch column names and types dynamically from the database
//     const modelFields = await prisma.$queryRaw<
//       { column_name: string; data_type: string }[]
//     >`
//       SELECT column_name, data_type
//       FROM information_schema.columns
//       WHERE table_name = ${modelName}
//     `;

//     // Generate object with defaults
//     return Object.fromEntries(
//       modelFields
//         .map(({ column_name, data_type }) => ({ column_name, data_type }))
//         .filter(({ column_name }) => !column_name.includes("id")) // Exclude fields with "id" in the name
//         .map(({ column_name, data_type }) => [
//           column_name,
//           data_type.includes("double") ||
//           data_type.includes("numeric") ||
//           data_type.includes("float")
//             ? 0 // Set Float fields to 0
//             : "", // Set String fields to ""
//         ])
//     );
//   };

//   // Create a single object with all model properties flattened
//   //@ts-expect-error: Doesnt have id props
//   const flattenedObject: Project & Parameters & Cost = {};

//   for (const modelName of modelNames) {
//     const defaultObject = moveFirstPropToLast(
//       await generateDefaultObject(modelName)
//     );

//     // Flatten the model object and add to the final object
//     Object.assign(flattenedObject, defaultObject);
//   }

//   // console.log(flattenedObject);
//   return flattenedObject;
// }

// export async function getEmptyDatabaseObject() {
//   const costObject = await generateFlattenedDefaultObject([
//     "Project",
//     "Parameters",
//     "Cost",
//   ]);
//   costObject.image_url =
//     "https://res-console.cloudinary.com/duv2kieyz/thumbnails/v1/image/upload/v1740656853/bXktbmV4dGpzLXByb2plY3Qvc2cwNWNubTdsY3E5Y2N1Mmp5dmI=/preview";

//   return costObject;
// }
