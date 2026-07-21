import { useEffect, useState } from 'react'
import type { CompanyKeyMetrics } from '../../company';
import { useOutletContext } from 'react-router';
import { getKeyMetrics } from '../../api';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';
import { formatLargeNonMonetaryNumber, formatRatio } from '../../Helpers/NumberFormatting';
import StockComment from '../StockComment/StockComment';


const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => formatLargeNonMonetaryNumber(company.marketCap),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) =>  formatRatio(company.returnOnEquityTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) => formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cash Flow (FCF) Yield",
    render: (company: CompanyKeyMetrics) => formatRatio(company.freeCashFlowYieldTTM),
    subTitle:
      "Free Cash Flow Yield compares a company's free cash flow per share to its market price per share",
  },
  {
    label: "CapEx to Depreciation ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.capexToDepreciationTTM),
    subTitle:
      "CapEx to Depreciation ratio indicates how much of a company's capital expenditures are being depreciated",
  },
  {
    label: "Stock-based compensation (SBC) to revenue",
    render: (company: CompanyKeyMetrics) => formatRatio(company.stockBasedCompensationToRevenueTTM),
    subTitle: 
    "The Stock-Based Compensation to Revenue ratio measures the percentage of revenue used to pay employees in equity compensation",
  },
  {
    label: "Average Receivables",
    render: (company: CompanyKeyMetrics) => formatLargeNonMonetaryNumber(company.averageReceivablesTTM),
    subTitle:
      "Average Receivables is a financial metric representing the mean amount of credit extended to customers",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) => formatLargeNonMonetaryNumber(company.grahamNumberTTM),
    subTitle:
      "This is the upperbound of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "Operating cycle",
    render: (company: CompanyKeyMetrics) => formatRatio(company.operatingCycleTTM),
    subTitle:
      "The operating cycle is the time (in days) a company takes to acquire inventory, sell it, and collect cash from customers",
  },
];

const CompanyProfile = () => {
  const symbol = useOutletContext<string>();
  const [companKeyMetrics, setcompanyKeyMetrics] = useState<CompanyKeyMetrics>();
  useEffect(() => {
    const CompanyKeyMetricsData = async () => {
      const value = await getKeyMetrics(symbol);
      setcompanyKeyMetrics(value?.data[0]);
    }
    CompanyKeyMetricsData();
  },[])
  return (
    <>
      {companKeyMetrics ? (
        <div className="flex flex-col">
          <RatioList data={companKeyMetrics} config={tableConfig} />
          <StockComment stockSymbol={symbol} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default CompanyProfile