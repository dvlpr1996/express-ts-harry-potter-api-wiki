import path from 'path';
import { JSON_DATA_PATH } from '../config/constant';
import fs from 'fs';

export const prepareData = (data: any): string => {
  return data ? String(data).trim() : '';
};

export const prepareSlugData = (data: string): string => {
  return data
    ? data
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
    : '';
};

export const prepareUrlData = (url: string): string => {
  return url ? String(url).trim() : '';
};

export const setTypeCharacters = (type: string): string => {
  const typeMap: Record<string, string> = {
    student: '0',
    staff: '1',
    others: '2',
  };
  return typeMap[type] ?? '-1';
};

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
