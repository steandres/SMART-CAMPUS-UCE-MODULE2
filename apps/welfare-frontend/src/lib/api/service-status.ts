import { scholarshipApi, socioeconomicApi } from './http-client';

export interface ServiceStatus {
  name: string;
  baseUrl: string;
  isAvailable: boolean;
}

export async function getServiceStatuses(): Promise<ServiceStatus[]> {
  const scholarshipUrl =
    process.env.NEXT_PUBLIC_SCHOLARSHIP_API_URL ?? 'http://localhost:3000';
  const socioeconomicUrl =
    process.env.NEXT_PUBLIC_SOCIOECONOMIC_API_URL ?? 'http://localhost:3001';

  const [scholarship, socioeconomic] = await Promise.allSettled([
    scholarshipApi.get('/health'),
    socioeconomicApi.get('/health'),
  ]);

  return [
    {
      name: 'Scholarship Service',
      baseUrl: scholarshipUrl,
      isAvailable: scholarship.status === 'fulfilled',
    },
    {
      name: 'Socioeconomic Form Service',
      baseUrl: socioeconomicUrl,
      isAvailable: socioeconomic.status === 'fulfilled',
    },
  ];
}
