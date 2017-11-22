export class RecognizerSettings {
  private static readonly AZURE_ENDPOINT = 'azureEndpoint';
  private static readonly AZURE_KEY = 'azureKey';
  private static readonly AWS_REGION = 'awsRegion';
  private static readonly AWS_ACCESS_KEY_ID = 'awsAccessKeyId';
  private static readonly AWS_SECRET_ACCESS_KEY = 'awsSecretAccessKey';
  private static readonly GOOGLE_KEY = 'googleKey';

  public get azureEndpoint() {
    return localStorage.getItem(RecognizerSettings.AZURE_ENDPOINT) || '';
  }

  public set azureEndpoint(value: string) {
    localStorage.setItem(RecognizerSettings.AZURE_ENDPOINT, value);
  }

  public get azureKey() {
    return localStorage.getItem(RecognizerSettings.AZURE_KEY) || '';
  }

  public set azureKey(value: string) {
    localStorage.setItem(RecognizerSettings.AZURE_KEY, value);
  }

  public get awsRegion() {
    return localStorage.getItem(RecognizerSettings.AWS_REGION) || '';
  }

  public set awsRegion(value: string) {
    localStorage.setItem(RecognizerSettings.AWS_REGION, value);
  }

  public get awsAccessKeyId() {
    return localStorage.getItem(RecognizerSettings.AWS_ACCESS_KEY_ID) || '';
  }

  public set awsAccessKeyId(value: string) {
    localStorage.setItem(RecognizerSettings.AWS_ACCESS_KEY_ID, value);
  }

  public get awsSecretAccessKey() {
    return localStorage.getItem(RecognizerSettings.AWS_SECRET_ACCESS_KEY) || '';
  }

  public set awsSecretAccessKey(value: string) {
    localStorage.setItem(RecognizerSettings.AWS_SECRET_ACCESS_KEY, value);
  }

  public get googleKey() {
    return localStorage.getItem(RecognizerSettings.GOOGLE_KEY) || '';
  }

  public set googleKey(value: string) {
    localStorage.setItem(RecognizerSettings.GOOGLE_KEY, value);
  }
}
