export function formatDate(time: string): string {
  return new Date(time).toDateString().
    split(' ').
    slice(1).
    join(' ');
}