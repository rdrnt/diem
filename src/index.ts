import { format as formatDate, compareAsc } from 'date-fns';

import { Timestamp } from '@firebase/firestore-types';

// https://date-fns.org/docs/Getting-Started

export { Timestamp };

/**
 * Converts a Firestore Timestamp to Date
 *
 *
 * @param timestamp - The Timestamp to convert
 * @returns A Date from the provided Timestamp
 *
 */
export const timestampToDate = (timestamp: Timestamp): Date =>
  timestamp.toDate();

/**
 * Converts a Date to a Firestore Timestamp
 *
 *
 * @param date - The Date to convert
 * @returns A Firestore Timestamp from the provided Date
 *
 */
export const dateToTimestamp = (date: Date): Timestamp =>
  Timestamp.fromDate(date);

/**
 * Creates a Firebase Timestamp of the current date
 *
 *
 * @returns A Timestamp of the current date/time
 *
 */
export const createTimestamp = (): Timestamp => Timestamp.now();

/**
 * Formats a Timestamp for displaying certain values
 *
 *
 * @param timestamp - The Timestamp to format
 * @param formatString - The string format
 * @returns A string representing the formatted Timestamp
 *
 */
export const format = ({
  timestamp,
  format,
}: {
  timestamp: Timestamp;
  format: string;
}): string => formatDate(timestampToDate(timestamp), format);

/**
 * Sorts an array of timestamps in ascending/descending order
 *
 *
 * @param timestamps - The array of dates/timestamps
 * @param ascending - Optional. Defaults to true.
 * @returns A string representing the formatted Timestamp
 *
 */
export const sort = ({
  timestamps,
  ascending = true,
}: {
  timestamps: Timestamp[];
  ascending?: boolean;
}): Timestamp[] => {
  const sortedTimestamps = timestamps.sort(
    (firstTimestamp, secondTimestamp) => {
      const firstDate = timestampToDate(firstTimestamp);
      const secondDate = timestampToDate(secondTimestamp);

      if (firstDate < secondDate) return -1;
      if (firstDate > secondDate) return 1;
      return 0;
    }
  );

  if (!ascending) {
    return sortedTimestamps.reverse();
  }

  return sortedTimestamps;
};

/**
 * Compares the first timestamp/date to the second given timestamp/date
 *
 *
 * @param first - The timestamp/date to compare
 * @param second - The timestamp/date to compare too
 * @returns 1 if the first date is after the second, -1 if the first date is before the second or 0 if dates are equal.
 *
 */
export const compare = ({
  first,
  second,
}: {
  first: Date | Timestamp;
  second: Date | Timestamp;
}): number => {
  if (isTimestamp(first) && isTimestamp(second)) {
    const firstDate = timestampToDate(first);
    const secondDate = timestampToDate(second);
    return compareAsc(firstDate, secondDate);
  } else if (!isTimestamp(first) && !isTimestamp(second)) {
    return compareAsc(first, second);
  } else {
    throw new Error('Must be given two timestamps or two dates');
  }
};

/**
 * A type guard for checking if a variable is a Timestamp
 *
 *
 * @param first - The timestamp/date to check
 * @returns A type predicate
 *
 */
export const isTimestamp = (date: Date | Timestamp): date is Timestamp => {
  return (date as Timestamp).nanoseconds !== undefined;
};
