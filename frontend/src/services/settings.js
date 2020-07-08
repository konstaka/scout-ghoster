import api from '@/util/api'

export default {

  async get () {
    const res = await api().get('/settings')
    return res.data
  }
}
