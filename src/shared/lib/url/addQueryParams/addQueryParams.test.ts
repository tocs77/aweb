import { getQueryParams } from './addQueryParams';
describe('Query url test', () => {
  it('should return a query string for one param', () => {
    expect(getQueryParams({ test: 'value' })).toBe('?test=value');
  });
  it('should return a query string', () => {
    expect(getQueryParams({ a: 1, b: 2 })).toBe('?a=1&b=2');
  });
  it('should return a query string without undefined', () => {
    expect(getQueryParams({ a: 1, b: undefined })).toBe('?a=1');
  });
});
