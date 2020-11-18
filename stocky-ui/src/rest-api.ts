import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Portfolio } from '../../stocky-service/src/models/portfolio';
import { ErrorResponse } from '../../stocky-service/src/models/error-response';
import { Quote } from '../../stocky-service/src/models/quote';
import CandleData from '../../stocky-service/src/models/candle-data';

export class RestApi {

  /**
   * Grabs the error response from the server, so we don't have to return an Axios-specific construct.
   *
   * @param {AxiosError} error The error received from the server.
   * @return The error response.
   */
  private static axiosErrorToErrorResponse(error: AxiosError): ErrorResponse {

    // AxiosError's data's payload is an ErrorResponse, but it is not a generic type
    // for some reason.  That's fine, we take extra care for non ErrorResponses too.

    if (error.response) {
      if (error.response.data.statusCode && error.response.data.message) {
        return error.response.data;
      }
      return { message: error.message, statusCode: error.response.status };
    }

    console.error(`No response information in error: ${JSON.stringify(error)}`);
    return { message: error.message, statusCode: 0 };
  }

  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      headers: {
        // Stops Spring Boot from challenging authenticated URLs with
        // "WWW-Authenticate: Basic header" (which triggers basic auth modal)
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }

  public getCandles(ticker: string): Promise<CandleData> {
    return this.instance.get(`stocks/${ticker}/candles`)
      .then((response: AxiosResponse<CandleData>) => {
        return response.data;
      });
  }

  public getPortfolio(): Promise<Portfolio> {
    return this.instance.get('portfolio')
      .then((response: AxiosResponse<Portfolio>) => {
        return response.data;
      });
  }

  public getPrice(ticker: string): Promise<Quote> {
    return this.instance.get(`stocks/${ticker}/quote`)
      .then((response: AxiosResponse<Quote>) => {
        return response.data;
      });
  }
}

export default new RestApi();
