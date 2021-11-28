import axios, { AxiosInstance } from 'axios'

type Template = any
class ApiService {
  base: AxiosInstance
  constructor() {
    this.base = axios.create({
      baseURL: 'https://api.scenify.io',
    })
  }

  createTemplate(props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/templates', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  downloadTemplate(props: Partial<Template>): Promise<{ source: string }> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/templates/download', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  getTemplates(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/templates')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  getShapes(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/elements')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  updateTemplate(id: number, props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .put(`/templates/${id}`, props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }
}

export default new ApiService()
