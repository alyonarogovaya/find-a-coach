<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <h3>
        Page can not be found - see our
        <router-link :to="'/coaches'">coaches</router-link>
      </h3>
    </base-card>
  </section>
</template>

<style scoped>
h3 {
  display: inline-block;
}
</style>
