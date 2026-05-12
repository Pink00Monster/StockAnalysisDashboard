import { useEffect, useState } from 'react'
import type { CompanyCashFlow } from '../../company';
import { useOutletContext } from 'react-router';
import { getCashflowStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';


const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByInvestingActivities),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByFinancingActivities),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.commonStockIssuance),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashflowStatement = () => {
    const symbol = useOutletContext<string>();
    const [cashflowStatement, setCashflowStatement] = useState<CompanyCashFlow[]>();
    useEffect(() => {
        const fetchCashflowStatement = async () => {
            const response = await getCashflowStatement(symbol!);
            setCashflowStatement(response!.data);
        }
        fetchCashflowStatement();
    }, [])
    return (
    <>
        {cashflowStatement ? (
            <Table config={config} data={cashflowStatement} />
        ) : (
            <Spinner />
        )}
    </>
  )
}

export default CashflowStatement