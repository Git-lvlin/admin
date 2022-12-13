import PageContainer from "@/components/PageContainer"
import RankingOffice from "./ranking-office"
import CityOfficeDataOverview from "./city-office-data-overview"
import ProportionOfficePerformance from "./proportion-office-performance"

const CityOfficeData = () => {
  return (
    <PageContainer>
      <RankingOffice/>
      <CityOfficeDataOverview/>
      <ProportionOfficePerformance/>
    </PageContainer>
  )
}

export default CityOfficeData