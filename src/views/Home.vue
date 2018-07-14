<template>
  <div id="app">
    <div class="banner">
      <img class="logo" src="http://ranking.niyaozao.com/img/logo.png" alt="" srcset="">
      <p class="text">欢迎来到全国主流街机STG高分排行榜，在这里你能够查询国内曾经流行或是仍然现存的街机STG游戏的高分玩家和数据。为了契合CAVE加入PC/steam STG大平台，拥有了更加广泛的受众来源的现状，我们决定对排行榜进行改造，让大家可以以一个更直观的方式自行提交成绩，互相竞争，共同进步。请大家提交时自觉遵守STG玩家的道德准则。最后祝各位玩得开心，STILL LOVE YOU！</p>
      <p class="text" style="text-align: right">--ixi91</p>
    </div>
    <div class="last-updated">
      <h2 class="update-title">最新上榜</h2>
      <div class="update-list">
        <div class="update-item">
          <h3><router-link :to="tt">怒首领蜂</router-link></h3>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL, RANK } from '../config/api.js'

export default {
  name: 'Home',
  data() {
    return {
      lastData: []
    }
  },
  computed: {
    tt() {
      return {
        name: 'GameRank',
        params: { gid: 111 }
      }
    }
  },
  created() {
    console.log(this.$route)
    console.log(this)
    console.log('===')
    this._getDataNear()
  },
  methods: {
    _getDataNear() {
      axios.get(BASE_URL + RANK.getDataNear).then(res => {
        this.lastData = res.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#app
  .banner
    text-align center
    margin-top 20px
    .logo
      width 100%
      max-width 320px
    .text
      font-size 17px
      text-align left
      letter-spacing 2px
      line-height 22px
      word-break normal
  .last-updated
    .update-title
      color #2196f3
    // .update-list
    //   .update-item
</style>
