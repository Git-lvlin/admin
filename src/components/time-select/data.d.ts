import { Moment } from 'moment'

export type DateProps = {
  showTime?: boolean | { defaultValue: Moment[]}
  onChange?: (value: RangeValue<Moment>) => void
  value?: RangeValue<Moment>
  beforePlaceholder?: string
  afterPlaceholder?: string
  defaultValue?: string
}