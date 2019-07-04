import { format } from 'date-fns';
import { Timestamp } from '@firebase/firestore-types';

export type Timestamp = Timestamp;

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
export const formatTimestamp = ({
  timestamp,
  formatString,
}: {
  timestamp: Timestamp;
  formatString: string;
}): string => format(timestampToDate(timestamp), formatString);
