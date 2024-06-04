<template>
  <header class="header">
    <nav class="nav">
      <router-link class="nav-link" :class="{ active: isActive('/') }" to="/">Pokedex</router-link>
      <router-link class="nav-link" :class="{ active: isActive('/party') }" to="/party">Party</router-link>
      <router-link class="nav-link" :class="{ active: isActive('/trainer') }" to="/trainer">Trainer Card</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    isActive(route) {
      return this.$route.path === route;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 97px;
  background-color: white;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.nav-link {
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  color: black;
  font-weight: 700;
}

.nav-link.active {
  text-decoration: underline;
}
</style>
