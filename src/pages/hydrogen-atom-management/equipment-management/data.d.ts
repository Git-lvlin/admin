import type { ActionType } from "@ant-design/pro-table"

export type EquipmentItem = {
  contractId: string;
	createTime: number;
	fileUrl: string;
	id: string;
	imei: string;
	leaseAmountSum: number;
	leaseDaySum: number;
	leasePaySum: number;
	memberId: string;
	memberPhone: string;
	occupationMode: number;
	orderAmount: string;
	scanAmountSum: string;
	scanTimeSum: string;
	startSum: number;
	status: number;
	storeNo: string;
	leaseStatus: string;
	contractUrl: string;
}

export type ModalFormProps = {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	id?: string
	type?: number
	refs: MutableRefObject<ActionType>
	user?: string
	phone?: string
}

export type PropsDivide = {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	id?: string
	imei?: string
	user?: string
	type: number
}
