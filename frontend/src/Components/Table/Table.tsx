import React from 'react'
import { testIncomeStatementData } from './testData'

const data = testIncomeStatementData;

type Props = {}

type Company = (typeof data)[0]

const configs = [
    {
        label: "Year",
        render: (company: Company) => company.acceptedDate
    },
    {
        label: "Revenue",
        render: (company: Company) => company.costOfRevenue
    },]

const Table = (props: Props) => {
    const renderedRows = data.map((company) => {
        return (
            <tr key={company.cik}> 
                {configs.map((val:any) => (
                <td className="p-4 whitespace-nowrap text-sm font0normal text-grey-900">{val.render(company)}</td>))}
            </tr>
        )
    })
    const renderedHeaders = configs.map((config: any) => (
  <th 
    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" 
    key={config.label}
  > 
    {config.label} 
  </th>
));

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:6-6 xl:p-8">
        <table>
            <thead className="min-w-full divide=grey-200 m-5">{renderedHeaders}</thead>
            <tbody className="bg-white divide-y divide-gray-200">{renderedRows}</tbody>
        </table>

    </div>
  )
}

export default Table