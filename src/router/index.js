import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import GameRank from '@/views/GameRank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: {name: 'Home'}
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '欢迎来到全国主流街机STG高分榜'
      }
    },
    {
      path: '/rank/:gid',
      name: 'GameRank',
      component: GameRank
    }
  ]
})
