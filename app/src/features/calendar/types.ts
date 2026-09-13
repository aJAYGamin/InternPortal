export interface CalendarEvent {
  id: number
  day: number
  month: number
  year: number
  title: string
  color: string
}

export type RepeatFreq = "daily" | "weekly" | "monthly" | "yearly"
export type RepeatEnds = "never" | "on" | "after"

/** One cell of the month grid: `null` pads the week before the 1st */
export type MonthCell = number | null

/** One cell of the date-picker grid, which spills into the neighbouring months */
export interface PickerCell {
  day: number
  month: number
  year: number
  current: boolean
}

export interface CalendarStore {
  events: CalendarEvent[],
  addEvent: (event: Omit<CalendarEvent, "id">) => void,
  removeEvent: (id: number) => void
}
