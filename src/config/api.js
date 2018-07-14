export const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : 'http://ranking.niyaozao.com/frontapi/api.php'
export const GAME = {
  getDataTree: '/game/getDataTree'
}
export const RANK = {
  getDataNear: '/rank/getDataNear'
}
