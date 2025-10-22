export class ColsModel {
  field: string
  header: string
  nameClass?: string
  iconName?: string
  type?: string
  visible?: boolean
  width?: string
  minWidth?: string
  maxLength?: number
  filterable?: boolean
  
  constructor(
    field: string,
    header: string,
    nameClass?: string,
    type?: string,
    visible: boolean = true,
    maxLength?: number
  ) {
    this.field = field
    this.header = header
    this.nameClass = nameClass
    this.type = type
    this.visible = visible
    this.maxLength=maxLength
  }
}
