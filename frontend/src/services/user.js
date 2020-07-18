import api from '@/util/api'

export default {

  async getUser () {
    const res = await api().get('/user')
    return res.data
  }
}
