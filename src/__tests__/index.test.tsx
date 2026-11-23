const mockNative = {
  initialize: jest.fn(),
  connect: jest.fn(),
  eventWithName: jest.fn(),
};

jest.mock('react-native', () => ({
  NativeModules: { Tenjin: mockNative },
  Platform: {
    OS: 'ios',
    select: (options: { default?: string }) => options.default,
  },
}));

type TenjinModule = typeof import('../index');

// index.tsx keeps the init state at module level, so load a fresh copy per test.
function loadTenjin(): TenjinModule['default'] {
  let tenjin: TenjinModule['default'] | undefined;
  jest.isolateModules(() => {
    tenjin = require('../index').default;
  });
  return tenjin!;
}

describe('Tenjin before initialize()', () => {
  let warn: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warn.mockRestore();
  });

  it('warns once and still forwards every call', () => {
    const Tenjin = loadTenjin();

    Tenjin.connect();
    Tenjin.eventWithName('level_up');
    Tenjin.connect();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain(
      "'connect' was called before initialize()"
    );
    expect(warn.mock.calls[0][0]).toContain('may be ignored');
    expect(mockNative.connect).toHaveBeenCalledTimes(2);
    expect(mockNative.eventWithName).toHaveBeenCalledWith('level_up');
  });

  it('does not warn when initialize() is called first', () => {
    const Tenjin = loadTenjin();

    Tenjin.initialize('api-key');
    Tenjin.connect();

    expect(warn).not.toHaveBeenCalled();
    expect(mockNative.initialize).toHaveBeenCalledWith(
      'api-key',
      expect.any(String)
    );
    expect(mockNative.connect).toHaveBeenCalledTimes(1);
  });

  it('returns the same wrapper on every property access', () => {
    const Tenjin = loadTenjin();

    expect(Tenjin.connect).toBe(Tenjin.connect);
    expect(Tenjin.eventWithName).toBe(Tenjin.eventWithName);
  });
});
