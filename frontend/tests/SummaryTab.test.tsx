import { screen } from '@testing-library/react';
import { render, userEvent } from './utils';
import { CommitmentTab } from '../src/pages/InvestorFirm/Commitment.tab';
import { IAssetClass, IInvFirmCommitmentModified } from '@/types';

const mockData: Record<IAssetClass, IInvFirmCommitmentModified[]> = {
  hf: [
    {
      id: 1,
      asset_class: 'hf',
      derivedAmount: { USD: 100, EUR: 80 },
      firm_id: 0,
      currency: '',
      amount: '',
    },
    {
      id: 2,
      asset_class: 'hf',
      derivedAmount: { USD: 200, EUR: 160 },
      firm_id: 0,
      currency: '',
      amount: '',
    },
  ],
  pe: [
    {
      id: 3,
      asset_class: 'pe',
      derivedAmount: { USD: 300, EUR: 240 },
      firm_id: 0,
      currency: '',
      amount: '',
    },
    {
      id: 4,
      asset_class: 'pe',
      derivedAmount: { USD: 400, EUR: 320 },
      firm_id: 0,
      currency: '',
      amount: '',
    },
  ],
  pd: [],
  re: [],
  inf: [],
  nr: [],
};

// Mock props
const mockProps = {
  data: mockData,
  currency: 'USD',
};

describe('CommitmentTab', () => {
  it('renders with default data', () => {
    const container = render(<CommitmentTab {...mockProps} />);

    expect(document.querySelector('div[value="hf"]')).toHaveAttribute('data-checked', 'true');

    expect(container.getByText('Id')).toBeInTheDocument();
    expect(container.getByText('Asset Class')).toBeInTheDocument();
    expect(container.getByText('Amount')).toBeInTheDocument();
    expect(container.getByText('1')).toBeInTheDocument();
    // only hedge funds are visible
    expect(container.getByText('100')).toBeInTheDocument();
  });

  it('updates data on select change', async () => {
    const container = render(<CommitmentTab {...mockProps} />);

    // open options
    await userEvent.click(screen.getByRole('textbox'));
    // click pe
    await userEvent.click(screen.getByRole('option', { name: 'Private Equity' }));

    expect(container.getByText('3')).toBeInTheDocument();
    expect(container.getByText('300')).toBeInTheDocument();
  });
});
