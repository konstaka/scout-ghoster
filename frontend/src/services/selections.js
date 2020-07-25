import api from '@/util/api'

export default {

  async get () {
    const res = await api().get('/selections')
    return res.data || []
  },

  async put (selections) {
    await api().put('/selections', { selections: selections || [] })
  }
}
