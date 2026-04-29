import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import type { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';

type Props = {}

const CompanyPage = (props: Props) => {
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
          </CompanyDashboard>
      </div>
    ) : (
      <div className="flex items-center justify-center w-full h-screen">  Company not found. </div>
    )}
    </>
  )
}

export default CompanyPage