import api from '@/util/api'

export default {

  async getAll () {
    const res = await api().get('/targets')
    return res.data
  },

  async getFilter () {
    const res = await api().get('/targets/filter')
    return res.data
  },

  async updateFilter (coordId, isVisible) {
    await api().put(`/targets/filter/${coordId}`, { isVisible })
  }
}
