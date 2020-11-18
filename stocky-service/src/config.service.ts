import { Injectable } from '@nestjs/common';
import * as configData from './config.json';

@Injectable()
export class ConfigService {

  getValue(category: string, property: string): string {
    return configData[category][property];
  }
}
