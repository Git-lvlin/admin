import type { ActionType } from "@ant-design/pro-table"

export type ConsumerOrderPage={
    deviceImei: string;
    id: string;
    occupantId: string;
    orderAmount: string;
    orderSn: string;
    payType: string;
    deviceUseTime: number;
    createTime: string;
    payTypeStr: string;
    storeNo: string;
    storeName: string;
    memberPhone: string;
    occupationMode: number;
    isShopkeeper: boolean;
    occupationModeStr: string;
}


export type SubsidyOrderItem = {
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
	leaseStatus: number;
	contractUrl: string;
	bindStatus: number;
	leaseDeadline: string;
}

export type ModalFormProps = {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	id?: string
	type?: number
	refs: MutableRefObject<ActionType>
	user?: string
	phone?: string
	status?: number
	expire?: string
	onclose?: function
}

export type PropsDivide = {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	id?: string
	imei?: string
	user?: string
	type: number
}

export type OptProps = {
	remark?: string
	type?: number
	amount?: number,
	useTime?: string
}

export type ModificationProps = {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
	imei?: string
	phone?: string
}

export type InfoProps = {
	useTime?: string
	amount?: number
	dayAmount?: number
	deadlineDate?: string
	nowDate?: string
	sumDay?: number
	remark?: string
	packageType?: number
}
