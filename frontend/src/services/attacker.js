import api from '@/util/api'

export default {

  async save (attacker) {
    await api().post('/attackers', attacker)
  },

  async getAll () {
    const res = await api().get('/attackers')
    return res.data
  },

  async update (id, attacker) {
    await api().put(`/attackers/${id}`, attacker)
  },

  async delete (attacker) {
    await api().delete(`/attackers/${attacker._id}`)
  }
}
