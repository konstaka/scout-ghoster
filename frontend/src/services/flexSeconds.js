import api from '@/util/api'

export default {

  async get () {
    const res = await api().get('/flexSeconds')
    return res.data
  },

  async put (flexSeconds) {
    await api().put('/flexSeconds', flexSeconds)
  }
}
