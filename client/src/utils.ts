export function msToTime(duration: number) {
  let milliseconds = duration % 1000
  let seconds = Math.floor((duration / 1000) % 60)
  let minutes = Math.floor((duration / (1000 * 60)) % 60)

  const f = milliseconds.toFixed(0)
  const ms = f.length === 1 ? '00' + f : f.length === 2 ? '0' + f : f
  const mins = minutes < 10 ? '0' + minutes : minutes
  const secs = seconds < 10 ? '0' + seconds : seconds

  return mins + ':' + secs + '.' + ms
}
