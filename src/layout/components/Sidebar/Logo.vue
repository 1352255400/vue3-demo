<template>
  <div class="sidebar-logo-container"
       :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse"
                   key="collapse"
                   class="sidebar-logo-link"
                   to="/">
        <img v-if="logoMini"
             :src="logoMini"
             class="sidebar-logo" />
        <h1 v-else
            class="sidebar-title">定星科技</h1>
      </router-link>
      <router-link v-else
                   key="expand"
                   class="sidebar-logo-link"
                   to="/">
        <img v-if="logo"
             :src="logo"
             class="sidebar-logo" />
        <h1 class="sidebar-title">定星科技</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';

const props = defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
});

const state = reactive({
  isCollapse: props.collapse,
  logo: new URL(`../../../assets/logo.png`, import.meta.url).href,
  logoMini: new URL(`../../../assets/logo.jpg`, import.meta.url).href
});

const { logo,logoMini } = toRefs(state);
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      max-width: 210px;
      height: 40px;
      float: left;
      margin-left: 23px;
      margin-top: 7px;
      vertical-align: middle;
    }

    & .sidebar-title {
      width: 120px;
      float: left;
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      margin-left: 12px;
      text-align: left;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
      margin-left: 7px;
    }
  }
}
</style>
