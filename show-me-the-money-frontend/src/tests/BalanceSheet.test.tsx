import { render, screen, waitFor } from '@testing-library/react';
import BalanceSheet from '../components/BalanceSheet';
import { getBalanceSheet } from '../services/api';

jest.mock('../services/api', () => ({
  getBalanceSheet: jest.fn(),
}));

describe('BalanceSheet Component', () => {
  it('should display loading message while data is being fetched', async () => {
    (getBalanceSheet as jest.Mock).mockResolvedValueOnce({
      Reports: [{ Rows: [] }],
    });

    render(<BalanceSheet />);

    expect(screen.getByText('Loading data...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
    });
  });

  it('should display the total value in the summary row', async () => {
    (getBalanceSheet as jest.Mock).mockResolvedValueOnce({
      Reports: [
        {
          Rows: [
            {
              Title: 'Bank',
              Rows: [
                {
                  Cells: [
                    { Value: 'Total Bank' },
                    { Value: '$104076.70' },
                    { Value: '$104049.60' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    render(<BalanceSheet />);

    await waitFor(() => {
      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText('Total Bank')).toBeInTheDocument();
      expect(screen.getByText('$104076.70')).toBeInTheDocument();
      expect(screen.getByText('$104049.60')).toBeInTheDocument();
    });
  });
});
