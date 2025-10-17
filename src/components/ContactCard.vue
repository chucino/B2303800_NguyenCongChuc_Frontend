<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Name:</strong>
      {{ contact.name }}
    </div>
    <div class="p-1">
      <strong>E-mail:</strong>
      {{ contact.email }}
    </div>
    <div class="p-1">
      <strong>Address:</strong>
      {{ contact.address }}
    </div>
    <div class="p-1">
      <strong>Phone:</strong>
      {{ contact.phone }}
    </div>
    <div class="p-1">
      <strong>Favorite Contact:</strong>
      <i v-if="contact.favorite" class="fas fa-check text-success"></i>
      <i v-else class="fas fa-times text-danger"></i>
    </div>
  </div>
</template>
<style scoped>
.p-1 {
  padding: 0.25rem;
}
</style>
