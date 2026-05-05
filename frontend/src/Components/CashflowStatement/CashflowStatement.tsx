import React, { useEffect, useState } from 'react'
import type { CompanyCashFlow } from '../../company';
import { useOutlet, useOutletContext } from 'react-router';
import { getCashflowStatement } from '../../api';
import Table from '../Table/Table';

type Props = {}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashProvidedByInvestingActivities,
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashProvidedByFinancingActivities,
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) => company.commonStockIssuance,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => company.freeCashFlow,
  },
];

const CashflowStatement = (props: Props) => {
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
            <p>No data</p>
        )}
    </>
  )
}

export default CashflowStatement