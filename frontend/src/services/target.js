import api from '@/util/api'

export default {

  async getAll () {
    const res = await api().get('/targets')
    return res.data
  }
}
