import path from 'path';
import { JSON_DATA_PATH } from '../config/constant/constant';
import fs from 'fs';

/**
 * Prepares a string by trimming it. Returns an empty string if the input is falsy.
 * @param data - Input data of any type.
 * @returns A trimmed string or an empty string.
 */
export const prepareData = (data: any): string => {
  return data ? String(data).trim() : '';
};

/**
 * Prepares a slug from a given string by converting it to lowercase,
 * replacing spaces with hyphens, and removing non-alphanumeric characters.
 * @param data - Input string to convert into a slug.
 * @returns A slugified string.
 */
export const prepareSlugData = (data: string): string => {
  return data
    ? data
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
    : '';
};

/**
 * Prepares a URL string by trimming it. Returns an empty string if the input is falsy.
 * @param url - Input URL string.
 * @returns A trimmed URL string.
 */
export const prepareUrlData = (url: string): string => {
  return url ? String(url).trim() : '';
};

/**
 * Maps a type string to a corresponding numeric value.
 * @param type - Type string ("student", "staff", "others").
 * @returns A string value representing the type, or -1 if no match.
 */
export const setTypeCharacters = (type: string): string => {
  const typeMap: Record<string, string> = {
    student: '0',
    staff: '1',
    others: '2',
  };
  return typeMap[type] ?? '-1';
};

/**
 * Asynchronously reads and parses a JSON file from the specified directory.
 *
 * @param {string} fileName - The name of the JSON file (without extension) to read. The file should be located in the directory defined by `JSON_DATA_PATH`.
 * @returns {Promise<any>} - A promise that resolves to the parsed JSON data from the file.
 * @throws {Error} - Throws an error if the file does not exist, cannot be read, or cannot be parsed.
 */
export const fetchDataFromJsonFile = async (fileName: string): Promise<any> => {
  const dataPath = path.join(JSON_DATA_PATH, `${fileName}.json`);
  try {
    await fs.promises.access(dataPath, fs.constants.F_OK);
  } catch {
    throw new Error(`File not found: ${dataPath}`);
  }

  try {
    const rawData = await fs.promises.readFile(dataPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read or parse data from ${dataPath}: ${error.message}`);
    }
    throw new Error('Failed to read or parse data from ${dataPath}');
  }
};
