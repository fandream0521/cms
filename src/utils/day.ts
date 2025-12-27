import dayjs from 'dayjs'

export function offset8hours(time: string) {
  const day = dayjs(time)
  return day.add(8, 'hour').format('YYYY-MM-DD HH:mm:ss')
}
