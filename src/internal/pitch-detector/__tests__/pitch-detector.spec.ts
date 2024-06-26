import { NativeModules } from 'react-native';

import { PitchDetector } from '..';

const Module = NativeModules.PitchDetectorModule;
const asyncMockThrow = <T>(error: T) =>
  jest.fn().mockImplementation(() => {
    throw error;
  });

describe('PitchDetector', () => {
  beforeEach(() => jest.clearAllMocks());

  it.each([
    ['start', 1],
    ['isRecording', 1],
    ['stop', 1],
  ])(
    'should call %s method %s time(s) from native module',
    async (method: string, times: number) => {
      const spy = jest.spyOn(Module, method as any);

      await Object(PitchDetector)[method]();

      expect(spy).toBeCalledTimes(times);
    }
  );

  it.each([
    ['hasPermissions', 'start'],
    ['getDefaultConfig', 'start'],
  ])(
    'should call %s method when %s method will be called',
    async (target: string, method: string) => {
      const spy = jest.spyOn(PitchDetector, target as any);

      await Object(PitchDetector)[method]();

      expect(spy).toBeCalledTimes(1);
    }
  );

  it.each([
    ['addListener', 'addListener'],
    ['removeAllListeners', 'removeAllListeners'],
    ['removeAllListeners', 'removeListener'],
  ])(
    'should call %s method from event emitter when %s method will be called',
    async (target: string, method: string) => {
      const spy = jest.spyOn(Object(PitchDetector).event, target as any);

      await Object(PitchDetector)[method](1);

      expect(spy).toBeCalledTimes(1);
    }
  );

  it.each([['start'], ['stop'], ['isRecording']])(
    'should throw error when native %s method fail',
    async (method: string) => {
      const error = new Error('Some error message');
      const spy = jest.spyOn(console, 'warn');

      Object(PitchDetector).module[method] = asyncMockThrow(error);

      await Object(PitchDetector)[method]();

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(error);
    }
  );
});
