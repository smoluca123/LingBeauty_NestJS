import { MAX_LIMIT_ON_PAGE } from 'src/constants/contants';
import * as bcrypt from 'bcryptjs';
import { configData } from 'src/configs/configuration';
import * as crypto from 'crypto';

export const normalizePaginationParams = ({
  limit,
  page,
}: {
  limit?: number;
  page?: number;
}): {
  limit: number;
  page: number;
} => {
  limit = limit || 10;
  page = page || 1;
  limit = limit > MAX_LIMIT_ON_PAGE ? MAX_LIMIT_ON_PAGE : limit;
  return {
    limit,
    page,
  };
};

export const processDataObject = async <T>(
  data: T,
  {
    excludeKeys = [],
  }: {
    excludeKeys?: string[];
  } = {},
): Promise<T> => {
  // Kiểm tra null/undefined hoặc không phải object
  if (!data || typeof data !== 'object') return data;

  // Xử lý riêng cho array
  if (Array.isArray(data)) {
    const processedArray = await Promise.all(
      (data as any[]).map((item) => processDataObject(item)),
    );
    return processedArray as any;
  }

  const processedData = { ...data };

  for (const key of Object.keys(processedData)) {
    if (excludeKeys.includes(key)) continue;

    const value = processedData[key];

    // Xử lý object con (không phải null và là object)
    if (value && typeof value === 'object') {
      processedData[key] = await processDataObject(value);
      continue;
    }

    // Xử lý password
    if (key === 'password' && value) {
      processedData[key] = await bcrypt.hash(
        value as string,
        configData.BCRYPT_SALT_ROUNDS,
      );
    }
    // Chỉ set undefined cho null/undefined
    else if (
      typeof value !== 'boolean' &&
      typeof value !== 'number' &&
      (value === null || value === undefined || value === '')
    ) {
      processedData[key] = undefined;
    }
  }

  return processedData;
};

export function sanitizeFileName(fileName: string) {
  // Loại bỏ các ký tự không hợp lệ: chỉ giữ lại chữ cái, số, dấu gạch ngang và dấu gạch dưới
  // eslint-disable-next-line no-useless-escape
  return fileName.replace(/[^a-zA-Z0-9-_\.]/g, '').replace(/[\s]/g, '_'); // Thay thế các khoảng trắng (space) bằng dấu gạch dưới (_)
}

export function generateSecureVerificationCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

/**
 * Generate a 6-digit OTP code for verification
 * @returns 6-digit string code (e.g., "123456")
 */
export function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function getRegionFromIp(ip: string) {
  const response = await fetch(
    `https://api.ipgeolocation.io/v2/ipgeo?apiKey=45c52efa0c1a4298ac02510177dde904&ip=${ip}`,
  );
  const { location } = await response.json();
  if (response.ok) {
    return location.country_code2.toUpperCase();
  }
  return 'VN';
}

export function getBalanceIncreaseAmount(region: string) {
  switch (region) {
    case 'VN':
      return 0.0015;
    case 'US':
    case 'UK':
      return 0.006;
    default:
      return 0.001;
  }
}
