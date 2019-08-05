import firebase from 'firebase/app';
import 'firebase/firestore';

import * as Diem from '../src';

// The date & timestamp for testing, value is July 22nd 2019

const TEST_DATE = new Date('2019/07/22');
const TEST_TIMESTAMP = firebase.firestore.Timestamp.now();

// Conversion
test('Convert timestamp to date', () => {
  const convertedTimestamp: Date = Diem.timestampToDate(TEST_TIMESTAMP);
  expect(convertedTimestamp instanceof Date);
});

test('Convert date to timestamp', () => {
  const convertedDate = Diem.dateToTimestamp(TEST_DATE);
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

describe('Compare', () => {
  test('Timestamps are equal', () => {
    expect(
      Diem.compare({ first: TEST_TIMESTAMP, second: TEST_TIMESTAMP }) === 0
    );
  });

  test('Dates are equal', () => {
    expect(Diem.compare({ first: TEST_DATE, second: TEST_DATE }) === 0);
  });

  test('First date is after second date', () => {
    const firstDate = new Date(TEST_DATE.setMonth(TEST_DATE.getMonth() + 1));
    expect(Diem.compare({ first: firstDate, second: TEST_DATE }) === 1);
  });
});
