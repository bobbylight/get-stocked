export interface DefaultKeyStatistics {
  annualHoldingsTurnover: any;
  enterpriseToRevenue: RawAndFormat;
  beta3Year: any;
  enterpriseToEbitda: RawAndFormat;
  '52WeekChange': RawAndFormat;
  morningStarRiskRating: any;
  forwardEps: RawAndFormat;
  revenueQuarterlyGrowth: any;
  sharesOutstanding: RawAndFormatAndLongFormat;
  fundInceptionDate: any;
  annualReportExpenseRation: any;
  totalAssets: any;
  bookValue: RawAndFormat;
  sharesShort: RawAndFormatAndLongFormat;
  sharesPercentSharesOut: RawAndFormat;
  fundFamily: any;
  lastFiscalYearEnd: RawAndFormat;
  heldPercentInstitutions: RawAndFormat;
  netIncomeToCommon: RawAndFormatAndLongFormat;
  trailingEps: RawAndFormat;
  lastDividendValue: any;
  SandP52WeekChange: RawAndFormat;
  priceToBook: RawAndFormat;
  heldPercentInsiders: RawAndFormat;
  nextFiscalYearEnd: RawAndFormat;
  yield: any;
  mostRecentQuarter: RawAndFormat;
  shortRatio: RawAndFormat;
  sharesShortPreviousMonthDate: RawAndFormat;
  floatShares: RawAndFormatAndLongFormat;
  beta: RawAndFormat;
  enterpriseValue: RawAndFormatAndLongFormat;
  priceHint: RawAndFormatAndLongFormat;
  threeYearAverageReturn: any;
  lastSplitDate: any;
  lastSplitFactor: any;
  legalType: any;
  lastDividendDate: any;
  morningStarOverallRating: any;
  earningsQuarterlyGrowth: any;
  priceToSalesTrailing12Months: any;
  dateShortInterest: RawAndFormat;
  pegRatio: any;
  ytdReturn: any;
  forwardPE: RawAndFormat;
  maxAge: number;
  lastCapGain: any;
  shortPercentOfFloat: RawAndFormat;
  sharesShortPriorMonth: RawAndFormatAndLongFormat;
  category: any;
  fiveYearAverageReturn: any;
}

export interface RawAndFormat {
  raw: number;
  fmt: string;
}

export interface RawAndFormatAndLongFormat extends RawAndFormat {
  longFmt: string;
}

export interface Price {
  quoteSourceName: string;
  regularMarketOpen: RawAndFormat;
  averageDailyVolume3Month: RawAndFormatAndLongFormat;
  exchange: string;
  regularMarketTime: number;
  volume24Hr: any;
  regularMarketDayHigh: RawAndFormat;
  shortName: string;
  averageDailyVolume10Day: RawAndFormatAndLongFormat;
  longName: string;
  regularMarketChange: RawAndFormat;
  currencySymbol: string;
  regularMarketPreviousClose: RawAndFormat;
  postMarketTime: number;
  preMarketPrice: RawAndFormat;
  preMarketTime: number;
  exchangeDataDelayedBy: 0;
  toCurrency: any;
  postMarketChange: RawAndFormat;
  postMarketPrice: RawAndFormat;
  exchangeName: string;
  preMarketChange: RawAndFormat;
  circulatingSupply: any;
  regularMarketDayLow: RawAndFormat;
  priceHint: RawAndFormatAndLongFormat;
  currency: string;
  regularMarketPrice: RawAndFormat;
  regularMarketVolume: RawAndFormatAndLongFormat;
  lastMarket: any;
  regularMarketSource: string;
  openInterest: any;
  marketState: string;
  underlyingSymbol: any;
  marketCap: RawAndFormatAndLongFormat;
  quoteType: string;
  preMarketChangePercent: RawAndFormat;
  volumeAllCurrencies: any;
  postMarketSource: string;
  strikePrice: any;
  symbol: string;
  postMarketChangePercent: RawAndFormat;
  preMarketSource: string;
  maxAge: number;
  fromCurrency: any;
  regularMarketChangePercent: RawAndFormat;
}

export interface FinancialData {
  // TODO:  All the fields
  recommendationKey: string;
}

/**
 * Returned from a call to stock/v2/get-statistics
 */
export interface Statistics {
  defaultKeyStatistics: DefaultKeyStatistics;
  financialsTemplate: {
    code: string;
    maxAge: number;
  }
  price: Price;
  financialData: FinancialData;
  quoteType: any;
  calendarEvents: any;
  summaryDetail: any;
  symbol: string;
  pageViews: {
    shortTermTrend: string;
    midTermTrend: string;
    longTermTrend: string;
    maxAge: number;
  }
  quoteData: any;
  mktmData: any;
}
