/* eslint-disable consistent-return */
import { IAssetClass, IInvFirmCommitment } from '@/types';
import { IHttpService } from '@/types/IHTTPService';
import { HttpError, PreqinBackendHttpClient } from '@/utils';

export const getInvFirmCommitment: IHttpService<IInvFirmCommitment[]> = async ({
  assetClass,
  firmId,
}: {
  assetClass: IAssetClass;
  firmId: string;
}) => {
  try {
    const result = await PreqinBackendHttpClient.get<IInvFirmCommitment[]>(
      `/investor/commitment/${assetClass}/${firmId}`
    );

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
