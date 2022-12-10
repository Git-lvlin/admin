import PageContainer from "@/components/PageContainer"
import RankingOffice from "./ranking-office"
import CityOfficeDataOverview from "./city-office-data-overview"

const CityOfficeData = () => {
  return (
    <PageContainer>
      <RankingOffice/>
      <CityOfficeDataOverview/>
    </PageContainer>
  )
}

export default CityOfficeData