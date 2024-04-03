<template>
  <div class="cl-toggle-switch">
    <span>Comida</span>
    <label class="cl-switch">
      <input type="checkbox" />
      <span></span>
    </label>
    <span style="margin-left: 1vw">Bebida</span>
  </div>
</template>

<script>
export default {}
</script>
<style>
span {
  color: #a03400;
  font-size: 0.6rem;
}
.cl-toggle-switch {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cl-switch {
  position: relative;
  display: inline-block;
}
.cl-switch > input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  z-index: -1;
  position: absolute;
  right: 6px;
  top: -8px;
  display: block;
  margin: 0;
  border-radius: 50%;
  background-color: rgb(0, 0, 0, 0.38);
  outline: none;
  opacity: 0;
  transform: scale(1);
  pointer-events: none;
  transition:
    opacity 0.3s 0.1s,
    transform 0.2s 0.1s;
}
.cl-switch > span::before {
  content: '';
  float: right;
  display: inline-block;
  margin: 5px 0 5px 10px;
  border-radius: 7px;
  width: 1.5rem;
  height: 1vh;
  background-color: #ffffff;
  vertical-align: top;
  transition:
    background-color 0.2s,
    opacity 0.2s;
}
.cl-switch > span::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 16px;
  border-radius: 50%;
  width: 2vh;
  height: 2vh;
  background-color: #e43636;
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  transition:
    background-color 0.2s,
    transform 0.2s;
}
.cl-switch > input:checked {
  right: -10px;
}

.cl-switch > input:checked + span::after {
  transform: translateX(16px);
}
.cl-switch:hover > input {
  opacity: 0.04;
}

.cl-switch > input:focus {
  opacity: 0.12;
}

.cl-switch:hover > input:focus {
  opacity: 0.16;
}
.cl-switch > input:active {
  opacity: 1;
  transform: scale(0);
  transition:
    transform 0s,
    opacity 0s;
}
.cl-switch > input:disabled {
  opacity: 0;
}

.cl-switch > input:disabled + span::before {
  background-color: #ffffff;
}

.cl-switch > input:checked:disabled + span::before {
  background-color: #ffffff;
}

.cl-switch > input:checked:disabled + span::after {
  background-color: #ffffff;
}
</style>
