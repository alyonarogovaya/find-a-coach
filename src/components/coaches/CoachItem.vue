<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" :to="coachDetailsLink" link
        >View Details</base-button
      >
      <!-- <base-button :to="coachContactLink" link>Contact</base-button> -->
    </div>
  </li>
</template>

<script>
import BaseBadge from '../UI/BaseBadge.vue';
import BaseButton from '../UI/BaseButton.vue';
export default {
  components: { BaseButton, BaseBadge },
  props: ['id', 'firstName', 'lastName', 'areas', 'rate'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachDetailsLink() {
      return this.$route.path + '/' + this.id;
    },
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
