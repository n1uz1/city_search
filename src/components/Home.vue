<template>
  <div class="home-container">
    <div class="overlay">
      <div class="text-content">
        <h2>Welcome to City Information Search</h2>
        <p>
          <router-link to="/search" class="btn">Go to Search Page</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityHome'
}
</script>

<style scoped>
.home-container {
  position: relative;
  background-image: url('@/picture/background.png'); /* 图片路径 */
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 添加半透明黑色覆盖层 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-content {
  text-align: center;
}

h2 {
  font-size: 3em;
  margin-bottom: 20px;
}

p {
  font-size: 1.5em;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2em;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #45a049;
}
</style>