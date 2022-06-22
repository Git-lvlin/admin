type ProTableProps = {
  
}

type RulesListProps = {
}

type OptionProps = {
  value: string
  label: string
  children?: Option[]
}

type IneerListProps = {
  key: number
}

type OptionsProps = {
  label: string
  value: string
  key: number
}

type EventAnalysisProps = {
  name: string
  event: string
}

type AttrProps = {
  comment: string
  columnName: string
}

type SearchModalProps = {
  setFormData: React.Dispatch<React.SetStateAction>
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

type SelectDateProps = {
  setRangePickerValue: React.Dispatch<React.SetStateAction>
}

export {
   ProTableProps, 
   RulesListProps, 
   OptionProps, 
   IneerListProps, 
   OptionsProps, 
   EventAnalysisProps,
   AttrProps,
   SearchModalProps,
   SelectDateProps
}