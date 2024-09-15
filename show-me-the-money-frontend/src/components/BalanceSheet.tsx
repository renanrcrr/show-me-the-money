import React, { useEffect, useState } from 'react';
import { getBalanceSheet } from '../services/api';

interface BalanceSheetRow {
  RowType: string;
  Cells?: Array<{ Value: string }>;
  Rows?: BalanceSheetRow[];
  Title?: string;
}

const BalanceSheet: React.FC = () => {
  const [data, setData] = useState<BalanceSheetRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBalanceSheet();
        if (result && result.Reports && result.Reports[0] && Array.isArray(result.Reports[0].Rows)) {
          setData(result.Reports[0].Rows);
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-blue-500">Loading data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-4xl font-bold text-center mb-4">Balance Sheet Report</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2">Value 1</th>
            <th className="border px-4 py-2">Value 2</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              {row.Rows && row.Rows.length > 0 && row.Title ? (
                <>
                  <tr>
                    <td colSpan={4} className="text-left font-bold bg-gray-100 px-4 py-2 text-center">
                      {row.Title}
                    </td>
                  </tr>
                  {row.Rows.map((innerRow, innerIndex) => (
                    <tr key={innerIndex} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">
                        {innerRow.Cells && innerRow.Cells[0]?.Value.includes('Total')
                          ? 'Summary'
                          : innerIndex + 1}
                      </td>
                      <td className="border px-4 py-2">
                        {innerRow.Cells && innerRow.Cells[0] && innerRow.Cells[0].Value}
                      </td>
                      <td className="border px-4 py-2">
                        {innerRow.Cells && innerRow.Cells[1] && innerRow.Cells[1].Value}
                      </td>
                      <td className="border px-4 py-2">
                        {innerRow.Cells && innerRow.Cells[2] && innerRow.Cells[2].Value}
                      </td>
                    </tr>
                  ))}
                </>
              ) : null}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheet;
