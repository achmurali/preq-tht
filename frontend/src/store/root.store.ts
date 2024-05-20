import { create } from 'zustand';
import { getInvFirmCommitment, getInvestorFirms } from '@/services';
import {
  IAssetClass,
  IInvFirmCommitmentModified,
  IInvestorFirm,
} from '@/types';

type FirmId = string;

interface IStore {
  investors: IInvestorFirm[] | undefined;
  commitment: Record<FirmId, undefined | Record<IAssetClass, IInvFirmCommitmentModified[]>>;
  setInvestors: () => ReturnType<typeof getInvestorFirms>;
  setCommitment: (firmId: FirmId, assetClass: IAssetClass) => void;
}

export const useRootStore = create<IStore>((set) => ({
  investors: undefined,
  commitment: {},
  setInvestors: async () => {
    const result = await getInvestorFirms();

    if (result.success) {
      set(() => ({
        investors: result.data,
        commitment: result.data.reduce<Record<FirmId, undefined>>((acc, curr) => {
          acc[curr.firm_id] = undefined;

          return acc;
        }, {}),
      }));
    }

    return result;
  },
  setCommitment: async (firmId: FirmId) => {
    const types: IAssetClass[] = ['hf', 'inf', 'nr', 'pd', 'pe', 're'];
    const data: Record<IAssetClass, IInvFirmCommitmentModified[]> = types.reduce(
      (acc, type) => {
        acc[type] = [];

        return acc;
      },
      {} as Record<IAssetClass, IInvFirmCommitmentModified[]>
    );

    await Promise.all(
      types.map(async (type) => {
        const result = await getInvFirmCommitment({ assetClass: type, firmId });

        if (result.success) {
          data[type] = result.data.map(
            (res) =>
              ({
                ...res,
                derivedAmount: {
                  USD: Number(res.amount.split('M')[0]),
                  EUR: Math.floor(Number(res.amount.split('M')[0]) * 0.9),
                },
              }) as IInvFirmCommitmentModified
          );
        }
      })
    );

    set((state) => ({
      commitment: { ...state.commitment, [firmId]: data },
    }));
  },
}));
