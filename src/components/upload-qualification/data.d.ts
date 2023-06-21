export type Props ={
    title?: string;
    msgDetail: {
        auditStatus: number;
        auditStatusDesc: string;
        qlfNumber: string;
        name: string;
        goodsQlfId: number;
        gcId1: number;
        gcId2: number;
        gcId3: number;
        gcDesc: string;
        qlfImg: string;
        goodsNum: string;
        typeDesc: string;
        goodsQlfImg?: string;
        intro: string;
        // 其他属性
    };
    setVisible: (visible: boolean) => void;
    visible: boolean;
    callback: (success: boolean) => void;
    // 其他属性
    }
  
export type Values={ 
    articleType: string[]; 
    qlfImg: string; 
    qlfNumber: string; 
    goodsQlfId: string; 
    supId: string; 
    gc: string 
}

export type FromWrapProps={
    value: string;
    onChange: (success: boolean) => void;
    content: (value: string, onChange: (success: boolean) => void) => JSX.Element;
    right: () => JSX.Element;
}