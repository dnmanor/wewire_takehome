export const MockExchangeService = {
  getExchangeRate: jest.fn().mockImplementation(async (from: string, to: string) => {
 
    return ''
  }),
}; 