<template>
  <div @click="tt">
    {{path}}
  </div>
</template>

<script>
export default {
  name: 'GameRank',
  computed: {
    path() {
      return this.$route.params.gid
    }
  },
  created() {
    this.$route.params.game = '123'
  },
  updated() {
    this.$route.params.game = '345'
    console.log(this.$route)
  },
  methods: {
    // 手动改 URL 进入此页面的一律回主页
    redirect() {
      // const { game } = this.$route.params
      // game || this.$router.redirect
      console.log(this.$router.redirect)
    },
    tt() {
      this.$router.push({
        name: 'GameRank',
        params: {gid: 312},
        query: {
          game: '13 234 345'
        }
      })
      console.log(this.$route)
    }
  }
}
</script>

<style scoped>

</style>
