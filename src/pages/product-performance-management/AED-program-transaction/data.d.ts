export type detailDataProps = {
  onlineDopSimpleNum: string,
  onlineDopSimpleAmount: string
  onlineCourseNum: string
  onlineCourseAmount: string
  onlineDcNum: string
  onlineDopNum: string
  onlineDopMustNoNum: string
  onlineDopNoNum: string
  onlineContractNum: string
  noSignContractNum: string
  onlineDcAmount: string
}

export type exportLogProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}