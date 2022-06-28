import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function getRelativeDateFromNow(
  date?: Date | string | number,
  defaultValue?: string
) {
  if (!date) return defaultValue ?? '-'
  return dayjs().from(date)
}
