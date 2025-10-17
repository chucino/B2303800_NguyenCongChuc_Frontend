<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Contacts Management Application</a>

    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Contacts <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
</style>
