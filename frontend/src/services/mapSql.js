import api from '@/util/api'

export default {

  async fetch () {
    const res = await api().get('/mapSql')
    if (res && res.data && res.data.villages) {
      return res.data.villages
    } else return false
  }
}
