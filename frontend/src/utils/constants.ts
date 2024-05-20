import { MantineColor } from '@mantine/core';
import { IAssetClass, IInvestorFirm } from '@/types';

export const investorFirmTypeColorMap: Record<IInvestorFirm['firm_type'], MantineColor> = {
  bank: 'red',
  'asset manager': 'orange',
  'fund manager': 'yellow',
  'wealth manager': 'green',
};

export const assetClassPieChartColorMap: Record<IAssetClass, MantineColor> = {
  hf: 'indigo.6',
  inf: 'red.6',
  nr: 'green.6',
  pd: 'yellow.6',
  pe: 'teal.6',
  re: 'cyan.6',
};

export const assetTypes: Record<IAssetClass, string> = {
  hf: 'Hedge Funds',
  inf: 'Infrastructure',
  nr: 'Natural Resources',
  pd: 'Private Debt',
  pe: 'Private Equity',
  re: 'Real Estate',
};
