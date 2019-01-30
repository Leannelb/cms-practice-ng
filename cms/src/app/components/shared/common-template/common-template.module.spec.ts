import { CommonTemplateModule } from './common-template.module';

describe('CommonTemplateModule', () => {
  let commonTemplateModule: CommonTemplateModule;

  beforeEach(() => {
    commonTemplateModule = new CommonTemplateModule();
  });

  it('should create an instance', () => {
    expect(commonTemplateModule).toBeTruthy();
  });
});
