<template>
  <div class="page text-center mt-5">
    <h2>Oops! Page not found 😢</h2>
    <p>
      The page you’re looking for doesn’t exist.
      <br />
      Go back to
      <router-link to="/">the home page</router-link>.
    </p>
  </div>
</template>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
}
</style>
<script>
export default {
  name: "NotFound",
};
</script>
