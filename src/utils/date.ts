const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date: string): string => {
  const dateArr = date.split("T")[0].split("-");
  const year = dateArr[0];
  const month = months[parseInt(dateArr[1]) - 1];
  return `${month} ${year}`;
};
