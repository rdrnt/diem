import { format as formatDate } from 'date-fns';
import firebase from 'firebase/app';
import 'firebase/firestore';

export type Timestamp = firebase.firestore.Timestamp;

const Timestamp = firebase.firestore.Timestamp;

// https://date-fns.org/docs/Getting-Started

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
