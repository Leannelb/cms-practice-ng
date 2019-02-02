import { CleanersModule } from './cleaners.module';

describe('CleanersModule', () => {
  let cleanersModule: CleanersModule;

  beforeEach(() => {
    cleanersModule = new CleanersModule();
  });

  it('should create an instance', () => {
    expect(cleanersModule).toBeTruthy();
  });
});
