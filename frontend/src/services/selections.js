import api from '@/util/api'

export default {

  async post (selection) {
    await api().post('/selections', selection)
  },

  async get () {
    const res = await api().get('/selections')
    return res.data || []
  },

  async put (selections) {
    await api().put('/selections', { selections: selections || [] })
  },

  async delete (selectionId) {
    if (selectionId) {
      await api().delete(`/selections/${selectionId}`)
    }
  },

  async updateSelection (selection) {
    if (selection._id) {
      if (selection.scout) {
        selection.scoutName = selection.scout.player
        selection.scoutId = selection.scout._id
      }
      if (selection.ghost) {
        selection.ghostName = selection.ghost.player
        selection.ghostId = selection.ghost._id
      }
      await api().put(`/selections/${selection._id}`, selection)
    }
  }
}
