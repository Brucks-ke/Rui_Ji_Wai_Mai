<template>
  <footer>
    <div
      @click="
        $router.push({
          path: '/msite',
          query: {
            name: $route.query.name,
            lng: $route.query.lng,
            lat: $route.query.lat,
          },
        })
      "
    >
      <img src="../assets/wm2.png" alt="" v-if="$route.path === '/msite'" />
      <img src="../assets/wm.png" alt="" v-else />
      <span>外卖</span>
    </div>
    <div
      @click="
        $router.push({
          path: '/search',
          query: {
            name: $route.query.name,
            lng: $route.query.lng,
            lat: $route.query.lat,
          },
        })
      "
    >
      <img src="../assets/ss2.png" alt="" v-if="$route.path === '/search'" />
      <img src="../assets/ss.png" alt="" v-else />
      <span>搜索</span>
    </div>
    <div
      @click="
        $router.push({
          path: '/order',
          query: {
            name: $route.query.name,
            lng: $route.query.lng,
            lat: $route.query.lat,
          },
        })
      "
    >
      <img src="../assets/dd2.png" alt="" v-if="$route.path === '/order'" />
      <img src="../assets/dd.png" alt="" v-else />
      <span>订单</span>
    </div>
    <div
      @click="
        $router.push({
          path: '/profile',
          query: {
            name: $route.query.name,
            lng: $route.query.lng,
            lat: $route.query.lat,
          },
        })
      "
    >
      <img src="../assets/wd2.png" alt="" v-if="$route.path === '/profile'" />
      <img src="../assets/wd.png" alt="" v-else />
      <span>我的</span>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  border-top: 1px solid #ddd;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.1rem;
  display: flex;
  align-items: center;
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 30%;
    }
  }
}
</style>>

