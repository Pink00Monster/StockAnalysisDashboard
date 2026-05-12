import { useEffect, useState } from 'react'
import type { CompanyIncomeStatement } from '../../company';
import { useOutletContext } from 'react-router';
import { getIncomeStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber, formatLargeNonMonetaryNumber } from '../../Helpers/NumberFormatting';


const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Net income deductions",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.netIncomeDeductions),
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.eps),
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.epsDiluted),
  },
  {
    label: "Gross Profit",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.grossProfit),
  },
  {
    label: "Weighted Average Shares Outstanding",
    render: (company: CompanyIncomeStatement) => formatLargeNonMonetaryNumber(company.weightedAverageShsOut),
  },
  {
    label: "Weighted Average Shares Outstanding - Diluted",
    render: (company: CompanyIncomeStatement) => formatLargeNonMonetaryNumber(company.weightedAverageShsOutDil),
  },
];

const IncomeStatement = () => {
  const symbol = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>([]);
  useEffect(() => {
    const IncomeStatementData = async () => {
      const response = await getIncomeStatement(symbol);
      setIncomeStatement(response!.data);
    };
    IncomeStatementData();
  }, [])
  return (
    <>
      {incomeStatement ? <><Table config={configs} data={incomeStatement} /></> : <Spinner /> }
    </>
  )
}

export default IncomeStatement