// Values are Phosphor names; append `:fill` for the fill weight.
export type IconMap = Record<string, string>

export interface IconOverride {
  selector: string
  icon: string
}
