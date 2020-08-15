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
      selection.scoutName = selection.scout ? selection.scout.player : null
      selection.scoutId = selection.scout ? selection.scout._id : null
      selection.ghostName = selection.ghost ? selection.ghost.player : null
      selection.ghostId = selection.ghost ? selection.ghost._id : null
      await api().put(`/selections/${selection._id}`, selection)
    }
  }
}
