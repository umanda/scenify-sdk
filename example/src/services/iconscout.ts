// @ts-nocheck
import axios from 'axios'

const iconscoutClient = axios.create({
  baseURL: 'https://api.iconscout.com/v3/',
  headers: {
    'Client-ID': '148500809558785',
    'Client-Secret': 'yOjZGSOOyglJYWH1RsZsXs7MyLOcaaHR'
  }
})

export function getImages(query) {
  return new Promise((resolve, reject) => {
    iconscoutClient
      .get('search', {
        params: {
          query: query,
          product_type: 'item',
          asset: 'illustration',
          price: 'free',
          per_page: 20,
          page: 1,
          formats: ['svg'],
          styles: ['colored-outline'],
          sort: 'color'
        }
      })
      .then(response => {
        const items = response.data.response.items.data
        resolve(items)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getImage(uuid): Promise<string> {
  return new Promise((resolve, reject) => {
    iconscoutClient
      .post(`items/${uuid}/api-download`, {
        format: 'svg'
      })
      .then(response => {
        const imageURL = response.data.response.download.url
        resolve(imageURL)
      })
      .catch(err => {
        reject(err)
      })
  })
}
