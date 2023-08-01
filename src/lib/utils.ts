const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });
export function formatBigNumber(num: number) {
  return numberFormatter.format(num);
}

/**
 * Formats a unix timestamp into how long ago was it
 * @param timestamp an Unix timestamp
 * @returns a string that is human readable
 */

export function getTimeAgo(timestamp: number) {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const { label, seconds } = intervals[i];
    const intervalCount = Math.floor(diffInSeconds / seconds);

    if (intervalCount >= 1) {
      return (
        intervalCount === 1 ?
        `${intervalCount} ${label} ago` :
        `${intervalCount} ${label}s ago`
      );
    }
  }

  return "just now";
}
