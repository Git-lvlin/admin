import { ProFormCheckbox } from '@ant-design/pro-form'

import type { FC } from 'react'
import type { giftListProps } from './data'

const GiftList: FC<{fieldsName: (string | number)[] | string, data: giftListProps[]}> = ({ fieldsName, data }) => {

  return (
    <ProFormCheckbox.Group
      name={fieldsName}
      label="指定的健康礼包"
      layout='horizontal'
      options={data}
    />
  )
}

export default GiftList