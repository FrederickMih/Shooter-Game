import fetchMock from 'jest-fetch-mock';
import 'regenerator-runtime/runtime';
import { getScores, addScore } from '../api/score';

fetchMock.enableMocks();
beforeEach(() => {
  fetch.resetMocks();
});

test('fail to receive object data', () => {
  getScores('wrong key').then((data) => {
    expect(data).not.toBe('object');
  });
});

test('fail to post data, without username as parameter', () => {
  addScore().then((data) => {
    expect(data).not.toEqual({
      message: 'Leaderboard score created correctly.',
    });
  });
});
