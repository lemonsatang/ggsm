

<template>
  <div id="wrap" :class="{'scm-min-width': useRoute().name == 'Scm'}">
    <Headers />

    <main id="mainView" :class="{'scm-main-background': useRoute().name == 'Scm'}">
      <router-view :key="$route.path"></router-view>
    </main>

  </div>

  <Footers />
</template>

<script setup>
  import Headers from './components/Headers.vue';
  import Footers from './components/Footers.vue';

  import { useRoute } from 'vue-router'

</script>

<style scoped>
#mainView {
  /* padding-bottom: 10rem; */
  padding-bottom: 4.9rem;
  min-height: calc(100vh - 16.5rem);
}

.scm-main-background {
  background-color: rgba(var(--scm-body), .5);
  
  min-width: 100rem;
}



.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
