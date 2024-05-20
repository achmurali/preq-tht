/* eslint-disable consistent-return */
import { IInvestorFirm } from '@/types';
import { IHttpService } from '@/types/IHTTPService';
import { HttpError, PreqinBackendHttpClient } from '@/utils';

export const getInvestorFirms: IHttpService<IInvestorFirm[]> = async () => {
  try {
    const result = await PreqinBackendHttpClient.get<IInvestorFirm[]>('/investors');

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      return {
        success: false,
        status: error.statusCode,
        error: error.message,
      };
    }

    throw error;
  }
};
