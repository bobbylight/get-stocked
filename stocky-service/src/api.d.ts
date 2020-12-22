export interface CandleData {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  v: number[];
  s: CandleDataStatus;
}

export type CandleDataStatus = 'ok' | 'no_data';

export type DataSource = 'finnhub' | 'yahoo';

export interface ErrorResponse {
  statusCode: number;
  message: string;
}

export interface Portfolio {
  securities: Security[];
}

export interface Quote {
  security: string;
  open: number;
  high: number;
  low: number;
  current: number;
  previousClose: number;
  timestamp: number;
  volume?: number;
  source: DataSource;
}

export interface Security {
  ticker: string;
  name: string;
}
