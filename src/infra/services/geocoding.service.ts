import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { EnvService } from '@/infra/env/env.service'

@Injectable()
export class GeocodingService {
  constructor(private env: EnvService) {}

  async getCoordinates(address: string): Promise<{ lat: number; lon: number }> {
    const url = this.env.get('GOOGLE_MAP_URL')
    const uri = encodeURIComponent(address)
    const key = this.env.get('GOOGLE_MAPS_API_KEY')

    const response = await axios.get(`${url}${uri}&key=${key}`)

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location
      return { lat: location.lat, lon: location.lng }
    } else {
      throw new Error('Invalid address')
    }
  }
}
