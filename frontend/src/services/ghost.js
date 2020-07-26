import api from '@/util/api'

export default {

  async save (ghost) {
    await api().post('/ghosts', ghost)
  },

  async getAll () {
    const res = await api().get('/ghosts')
    return res.data
  },

  async update (id, ghost) {
    await api().put(`/ghosts/${id}`, ghost)
  },

  async delete (ghost) {
    await api().delete(`/ghosts/${ghost._id}`)
  },

  async getCommands () {
    const res = await api().get('/commands/ghost')
    return res.data
  }
}
