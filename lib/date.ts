export const formatDate = (date: string): string => {
  // Month Year format (e.g., "December 2025")
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });
};

export const formatDateComplete = (date: string): string => {
  // Full date format (e.g., "December 6, 2025")
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (date: string): string => {
  // Full datetime with timezone (e.g., "December 6, 2025, 2:30 PM GMT+8")
  const dateObj = new Date(date);
  return dateObj.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

export const formatDateRange = (startDate: string, endDate: string | null): string => {
  // Date range using Month Year format
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : null;

  if (end && end !== start) {
    return `${start} - ${end}`;
  }
  return start;
};

export const formatDateRangeWithPresent = (startDate: string, endDate: string | null): string => {
  // Date range for timelines with "Present" (e.g., "December 2025 - Present")
  const start = new Date(startDate);
  const startYear = start.getFullYear();
  const startMonth = start.toLocaleDateString(undefined, { month: "long" });

  if (!endDate) {
    return `${startMonth} ${startYear} - Present`;
  }

  const end = new Date(endDate);
  const endYear = end.getFullYear();
  const endMonth = end.toLocaleDateString(undefined, { month: "long" });

  if (startYear === endYear) {
    return `${startMonth} - ${endMonth} ${startYear}`;
  }

  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
};
