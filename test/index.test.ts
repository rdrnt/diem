import firebase from 'firebase/app';
import 'firebase/firestore';

import * as Diem from '../src';

// The date & timestamp for testing, value is July 22nd 2019

const DEFAULT_DATE = new Date('2019/07/22');
const TEST_TIMESTAMP = firebase.firestore.Timestamp.now();

// Conversion
test('Convert timestamp to date', () => {
  const convertedTimestamp: Date = Diem.timestampToDate(TEST_TIMESTAMP);
  expect(convertedTimestamp instanceof Date);
});

test('Convert date to timestamp', () => {
  const convertedDate = Diem.dateToTimestamp(DEFAULT_DATE);
  expect(convertedDate instanceof firebase.firestore.Timestamp);
});

test('Create a new timestamp', () => {
  const newTimestamp = Diem.createTimestamp();
  expect(newTimestamp);
});

test('Format timestamp', () => {
  // Format the timestamp to show year/month/date
  const formattedTimestamp = Diem.format({
    timestamp: TEST_TIMESTAMP,
    format: 'YYYY/M/D',
  });
  expect(formattedTimestamp === '2019/07/22');
});
