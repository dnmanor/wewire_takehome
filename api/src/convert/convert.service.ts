import { Injectable } from '@nestjs/common';

@Injectable()
export class ConvertService {
  private readonly OPEN_EXCHANGE_API_URL = `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_APP_ID}`;

  onModuleInit() {
    this.seedRates()
  }

  seedRates() {
    fetch(this.OPEN_EXCHANGE_API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error seeding rates: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const fs = require('fs');
        const path = require('path');
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(
          path.join(dataDir, 'exchange-rates.json'),
          JSON.stringify(data, null, 2),
        );
        console.log('Exchange rates saved successfully');
      })
      .catch((error) => {
        console.error('Error seeding rates:', error);
      });
  }
}
