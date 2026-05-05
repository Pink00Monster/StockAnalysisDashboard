import { useEffect, useState } from 'react'
import type { CompanyIncomeStatement } from '../../company';
import { useOutletContext } from 'react-router';
import { getIncomeStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';


const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      company.depreciationAndAmortization,
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => company.operatingIncome,
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTax,
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => company.netIncome,
  },
  {
    label: "Net income deductions",
    render: (company: CompanyIncomeStatement) => company.netIncomeDeductions,
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => company.eps,
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) => company.epsDiluted,
  },
  {
    label: "Gross Profit",
    render: (company: CompanyIncomeStatement) => company.grossProfit,
  },
  {
    label: "Weighted Average Shares Outstanding",
    render: (company: CompanyIncomeStatement) => company.weightedAverageShsOut,
  },
  {
    label: "Weighted Average Shares Outstanding - Diluted",
    render: (company: CompanyIncomeStatement) => company.weightedAverageShsOutDil,
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