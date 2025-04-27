// Format ISO timestamp to relative time (e.g., "2 hours ago")
export const formatDistanceToNow = (isoTimestamp: string): string => {
  const date = new Date(isoTimestamp);
  const now = new Date();
  
  // Calculate the time difference in milliseconds
  const diffMs = now.getTime() - date.getTime();
  
  // Convert to minutes, hours, days
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 1) {
    return 'just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }
};