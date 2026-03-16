export type RelationshipDurationParts = {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  totalHours: number
  totalDays: number
}

const MS_SECOND = 1000
const MS_MINUTE = 60 * MS_SECOND
const MS_HOUR = 60 * MS_MINUTE
const MS_DAY = 24 * MS_HOUR

function addUtcMonths(date: Date, months: number): Date {
  const next = new Date(date.getTime())
  next.setUTCMonth(next.getUTCMonth() + months)
  return next
}

export function getEffectiveEnd(now: Date, endAt: Date): Date {
  return now.getTime() < endAt.getTime() ? now : endAt
}

export function getDurationParts(startAt: Date, endAt: Date): RelationshipDurationParts {
  const startMs = startAt.getTime()
  const endMs = endAt.getTime()

  if (endMs <= startMs) {
    return {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalHours: 0,
      totalDays: 0,
    }
  }

  let months = 0
  let cursor = new Date(startMs)

  while (true) {
    const next = addUtcMonths(cursor, 1)
    if (next.getTime() <= endMs) {
      cursor = next
      months += 1
      continue
    }
    break
  }

  const diffMs = endMs - startMs
  const remainderMs = endMs - cursor.getTime()

  return {
    months,
    days: Math.floor(remainderMs / MS_DAY),
    hours: Math.floor((remainderMs % MS_DAY) / MS_HOUR),
    minutes: Math.floor((remainderMs % MS_HOUR) / MS_MINUTE),
    seconds: Math.floor((remainderMs % MS_MINUTE) / MS_SECOND),
    totalHours: Math.floor(diffMs / MS_HOUR),
    totalDays: Math.floor(diffMs / MS_DAY),
  }
}
