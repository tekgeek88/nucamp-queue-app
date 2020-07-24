export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function parseDateTime(dateTime) {
  return new Date(dateTime).toLocaleString('en-US');
}