import api from '@/util/api'

export default {

  async load () {
    const res = await api().get('/operationMeta')
    return res.data
  },

  async save (hittingTime) {
    await api().put('/operationMeta', { hittingTime })
  }
}
