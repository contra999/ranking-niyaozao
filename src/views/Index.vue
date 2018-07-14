<template>
  <div id="app" v-resize="resize">

    <!-- 抽屉菜单开始 -->
    <mu-drawer :open.sync="open" :docked="docked" :width="drawerWidth" :z-depth="8">
      <mu-list toggle-nested :nested-indent="false" :value="gameId" >
        <!-- <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="home"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>访问论坛</mu-list-item-title>
        </mu-list-item>
        <mu-divider></mu-divider> -->
        <mu-sub-header>厂商 & 游戏</mu-sub-header>
        <!-- <mu-divider></mu-divider> -->
        <mu-list-item button nested v-for="tree of dataTree" :key="tree.id" :open="treeId === tree.id" @toggle-nested="treeId = arguments[0] ? tree.id : ''">
          <mu-list-item-title style="font-size: 16px;font-weight: 500">{{tree.name}}</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" :style="{'transform': `rotate(${treeId === tree.id?180:0}deg)`}" value="keyboard_arrow_down"></mu-icon>
          </mu-list-item-action>
          <mu-list-item button slot="nested" v-for="game of tree.games" :key="game.id" @click="onClickGame(game)" :value="game.id">
            <mu-list-item-action>
              <div class="game-icon" :style="{'background-image': `url(http://ranking.niyaozao.com${game.image ? game.image : '/img/mus.png'})`}"></div>
            </mu-list-item-action>
            <mu-list-item-title style="font-size: 14px; font-weight: 400;">{{game.name}}</mu-list-item-title>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <!-- 抽屉菜单结束 -->

    <!-- 头部导航开始 -->
    <mu-appbar color="primary" class="appbar-header" :style="{'left': left}">
      <mu-button @click="toggle" v-if="!left" icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      {{getTitle}}
      <mu-button :to="{ name: 'Home', params: { userId: 123 },query: { game: 'dodopochai' }}" icon slot="right">
        <mu-icon value="home"></mu-icon>
      </mu-button>
      <mu-menu slot="right">
        <mu-button icon>
          <!-- conter999 -->
          <mu-icon value="account_circle"></mu-icon>
          <!-- <img style="width: 48px; height: 48px" src="./assets/logo.png" alt="" srcset=""> -->
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="openSimpleDialog">
            <mu-list-item-title>登录</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button href="http://www.niyaozao.com/member.php?mod=register" target="_blank">
            <mu-list-item-title>注册</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
      <mu-button href="http://www.niyaozao.com/" target="_blank" flat slot="right">
        访问论坛
      </mu-button>
    </mu-appbar>
    <!-- 头部导航结束 -->

    <!-- 路由组件开始 -->
    <div class="app-content" :style="{'padding-left': left}">
      <mu-container>
        <mu-expand-transition>
          <router-view class="router-view" />
        </mu-expand-transition>
      </mu-container>
    </div>
    <!-- 路由组件结束 -->

    <!-- 登录框开始 -->
    <mu-dialog title="Dialog" width="360" :open.sync="openSimple">
      this is simple Dialog
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">Close</mu-button>
    </mu-dialog>
    <!-- 登录框结束 -->

  </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL, GAME } from '../config/api.js'

export default {
  name: 'Index',
  data() {
    return {
      open: true,
      docked: true,
      openSimple: false,
      dataTree: [],
      drawerWidth: 280,
      gid: '',
      treeId: '',
      title: '欢迎来到全国主流街机STG高分榜'
    }
  },
  created() {
    this.resize()
    this._getDataTree()
  },
  computed: {
    left() {
      // 如果用媒体查询控制样式 left 变化会比 Drawer 的显隐切换更快, 造成不同步
      // return {'padding-left': this.open && this.docked ? '256px' : ''}
      return this.open && this.docked ? this.drawerWidth + 'px' : ''
    },
    gameId() {
      const { gid } = this.$route.params
      if (gid) {
        return gid
      } else {
        return this.gid
      }
    },
    getTitle() {
      const title = this.$route.params.game
      // return title ? title : this.title
      if (title) {
        return title
      } else {
        return this.title
      }
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    resize() {
      if (window.innerWidth <= 900) {
        this.open = false
        this.docked = false
      } else {
        this.open = true
        this.docked = true
      }
    },
    openSimpleDialog() {
      this.openSimple = true
    },
    closeSimpleDialog() {
      this.openSimple = false
    },
    _getDataTree() {
      axios.get(BASE_URL + GAME.getDataTree).then(res => {
        this.dataTree = res.data
      })
    },
    onClickGame({ id, name }) {
      this.$router.push({
        name: 'GameRank',
        params: {
          gid: id,
          game: name
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.toggle-icon
  transition all .45s cubic-bezier(.23, 1, .32, 1)
.game-icon
  width 40px
  height 40px
  border-radius 3px
  background no-repeat center center/cover
.appbar-header
  position: fixed
  left 0
  right 0
  top 0
  z-index 101
  overflow hidden
  transition all .45s cubic-bezier(.23, 1, .32, 1)
  // >>> 用来选择未被打上 tag 的 css
  & >>> .mu-menu-activator
    display flex
.app-content
  padding-top 56px
  transition all .45s cubic-bezier(.23, 1, .32, 1)
  @media (min-width: 600px)
    &
      padding-top 64px
  .router-view
    padding 0 16px
</style>
