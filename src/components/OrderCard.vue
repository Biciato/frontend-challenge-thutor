<template>
  <div class="order-card">
    <div class="order-card-header">
      <span class="order-card-title">{{ order.title }}</span>
      <span class="order-card-price">{{ order.price }}</span>
    </div>
    <div class="order-card-body">
      <p class="order-text"><span>Sabor: </span>{{ order.flavor }}</p>
      <p class="order-text"><span>Descrição: </span>{{ order.description }}</p>
      <div class="order-card-image">
        <img :src="order.image || '/images@2x.png'" alt="Imagem do pedido" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.order-card {
  position: relative;
  width: 60vw;
  margin: 1% 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}
.order-card-header {
  background-color: #e33535;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 1.5vh 2vw 1.5vh 5vw;
}
.order-card-title {
  color: #ffca00;
  font-style: italic;
  font-weight: bold;
  font-size: 1rem;
}
.order-card-image {
  border-radius: 15px;
}
.order-card-image img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 5px;
}
.order-card-price {
  color: #ffffff;
  font-style: italic;
  font-weight: bold;
  font-size: 1rem;
}
.order-card-body {
  padding: 2vh 5vw;
  font-size: 0.8em;
  position: relative;
}
.order-text {
  color: #a03400;
  margin: 1vh 0;
}
span {
  font-style: italic;
  font-weight: bold;
  font-size: 1em;
}
@media (max-width: 576px) {
  .order-card-image {
    position: relative;
  }
}
@media (min-width: 576px) and (max-width: 768px) {
}
@media (min-width: 768px) and (max-width: 992px) {
  .order-card {
    width: 52vw;
  }
  .order-card-header {
    padding-left: 7vw;
  }
  .order-card-body {
    padding-left: 7vw;
  }
  .order-card-image {
    position: absolute;
    width: 30%;
    height: 110%;
    top: -30%;
    left: -20%;
  }
}
@media (min-width: 992px) and (max-width: 1200px) {
  .order-card {
    width: 52vw;
  }
  .order-card-header {
    padding-left: 7vw;
  }
  .order-card-body {
    padding-left: 7vw;
  }
  .order-card-image {
    position: absolute;
    width: 30%;
    height: 110%;
    top: -30%;
    left: -20%;
  }
}
@media (min-width: 1200px) {
  .order-card {
    width: 56vw;
  }
  .order-card-header {
    padding-left: 7vw;
  }
  .order-card-body {
    padding-left: 7vw;
  }
  .order-card-image {
    position: absolute;
    width: 22%;
    height: 110%;
    top: -30%;
    left: -12%;
  }
}
</style>
