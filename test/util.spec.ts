import { Architecture, RunningPrivileged } from '../src/util';

test('check architecture', () => {
  expect(process.arch).toEqual(Architecture());
});

test('check if running privileged', () => {
  expect(RunningPrivileged()).toEqual(true);
});
