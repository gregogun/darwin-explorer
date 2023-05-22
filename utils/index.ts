import { formatDistance } from "date-fns";

export const timeAgo = (date: number) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};
