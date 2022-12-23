import PageContainer from "@/components/PageContainer"
import RankingOffice from "./ranking-office"
import CityOfficeDataOverview from "./city-office-data-overview"
import ProportionOfficePerformance from "./proportion-office-performance"
import DataDetail from "./data-detail"

const CityOfficeData = () => {
  return (
    <PageContainer>
      <RankingOffice/>
      <CityOfficeDataOverview/>
      <ProportionOfficePerformance/>
      <DataDetail/>
    </PageContainer>
  )
}

export default CityOfficeData