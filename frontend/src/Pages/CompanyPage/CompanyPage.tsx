import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import type { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';
import Spinner from '../../Components/Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';


const CompanyPage = () => {
  let {symbol} = useParams(); 
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>();
  
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const response = await getCompanyProfile(symbol!);
      setCompanyProfile(response?.data[0]);
    }
    fetchCompanyProfile();
  },[])
  return (
    <>
    {companyProfile ? (
      <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard symbol={symbol!}>
            <Tile title="Company Name" subTitle={companyProfile?.companyName} />
            <Tile title="Price" subTitle={formatLargeMonetaryNumber(companyProfile?.price)} />
            <Tile title="Sector" subTitle={companyProfile?.sector} />
            <Tile title="Market Cap" subTitle={formatLargeMonetaryNumber(companyProfile?.marketCap)} />
            <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
              {companyProfile?.description}
            </p>
          </CompanyDashboard>
      </div>
    ) : (
      <Spinner />
    )}
    </>
  )
}

export default CompanyPage