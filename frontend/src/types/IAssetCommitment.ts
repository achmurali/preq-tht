export type IAssetClass = 'pe' | 'pd' | 're' | 'inf' | 'nr' | 'hf';

export interface IInvFirmCommitment {
  id: number;
  asset_class: IAssetClass;
  firm_id: number;
  currency: string;
  amount: string;
}

export interface IInvFirmCommitmentModified {
  id: number;
  asset_class: IAssetClass;
  firm_id: number;
  currency: string;
  amount: string;
  derivedAmount: {
    USD: number;
    EUR: number;
  };
}
