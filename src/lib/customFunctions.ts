export function camelCaseToSpaces(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // Adds space between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Handles cases where there are multiple uppercase letters
    .toLowerCase(); // Converts the entire string to lowercase
}
