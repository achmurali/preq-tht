export interface IInvestorFirm {
  firm_id: number;
  firm_name: string;
  AUM: number;
  date_added: string;
  last_updated: string;
  established_at: string;
  firm_type: 'bank' | 'asset manager' | 'wealth manager' | 'fund manager';
  city: string;
  country: string;
  address: string;
  postal_code: string;
}
