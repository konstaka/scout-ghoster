import api from '@/util/api'

export default {

  async save (scout) {
    await api().post('/scouts', scout)
  },

  async getAll () {
    const res = await api().get('/scouts')
    return res.data
  },

  async update (id, scout) {
    await api().put(`/scouts/${id}`, scout)
  },

  async delete (scout) {
    await api().delete(`/scouts/${scout._id}`)
  },

  async getCommands () {
    const res = await api().get('/commands/scout')
    return res.data
  }
}
