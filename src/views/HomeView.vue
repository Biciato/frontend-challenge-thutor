<template>
  <div
    :style="{ 'background-image': `url(${waveImg}), url(${patternImg})` }"
    class="header-container"
  >
    <img :src="logo" width="280" alt="Logo Image" style="margin-right: 8%" />
    <img :src="pastelImg" width="230" alt="Pastel Image" id="pastel-img" />
    <img :src="pasteisImg" width="150" alt="Pasteis Image" id="pasteis-img" />
    <div class="background-container"></div>
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="form-header">
          <h6>Monte aqui o seu cardápio. O que está esperando?</h6>
          <slider-input />
        </div>
        <div class="wrapper">
          <input
            type="text"
            v-model="form.title"
            placeholder="Título do pedido"
            required
            minlength="3"
            maxlength="60"
            style="width: 38%"
            class="overflow-input"
          />
          <input
            type="text"
            v-model="form.flavor"
            placeholder="Sabor"
            required
            minlength="3"
            maxlength="60"
            style="width: 36%; left: 40%"
            class="overflow-input"
          />
          <input
            type="text"
            v-model.lazy="form.price"
            v-money="money"
            placeholder="R$"
            required
            style="width: 20%; right: 0.15rem"
            class="overflow-input"
          />
          <textarea
            v-model="form.description"
            placeholder="Descrição"
            style="width: 100%; margin-right: 0"
          ></textarea>
          <div class="dropzone-container">
            <div class="drag-drop" @dragover.prevent @drop="handleDrop" @click="openFileInput">
              <div
                class="drop-area"
                :class="{ 'drag-over': isDragOver }"
                @dragenter="handleDragEnter"
                @dragleave="handleDragLeave"
              >
                <div style="text-align: center">
                  <v-icon name="la-file-upload-solid" fill="#a03400" scale="2" />
                  <p v-if="!isDragOver" class="drop-text">
                    Jogue aqui o arquivo de imagem do seu pastel ou clique para localizar a pasta.
                  </p>
                  <p v-else class="drop-text">Jogue aqui</p>
                </div>
                <input type="file" @change="handleFileSelect" style="display: none" />
                <div class="image-preview">
                  <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Preview"
                    style="max-width: 100%; max-height: 100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <button
            type="reset"
            @click="resetForm"
            class="rounded-button"
            style="color: #ffffff; background-color: #e43636"
          >
            Limpar
          </button>
          <button
            type="submit"
            class="rounded-button"
            style="color: #a03400; background-color: #ffca00"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
    <h1>Veja como será apresentado ao cliente</h1>
    <div class="orders">
      <order-card v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import waveImg from '@/assets/wave.svg'
import patternImg from '@/assets/pattern@2x.png'
import logo from '@/assets/Logo.svg'
import pasteisImg from '@/assets/pasteis-img@2x.png'
import pastelImg from '@/assets/pastel-paralax@2x.png'
import { VMoney } from 'v-money'
import axios from 'axios'
import OrderCard from '@/components/OrderCard.vue'
import SliderInput from '@/components/SliderInput.vue'

export default {
  components: {
    OrderCard,
    SliderInput
  },
  data() {
    return {
      form: {
        title: '',
        flavor: '',
        price: '',
        description: '',
        image: null
      },
      logo,
      pastelImg,
      pasteisImg,
      patternImg,
      waveImg,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      },
      isDragOver: false,
      imagePreview: null
    }
  },
  directives: {
    money: VMoney
  },
  computed: {
    ...mapState(['orders'])
  },
  methods: {
    ...mapActions(['addOrder']),
    handleDrop(event) {
      event.preventDefault()
      this.isDragOver = false
      const files = event.dataTransfer.files
      this.handleFiles(files)
    },
    handleDragEnter(event) {
      event.preventDefault()
      this.isDragOver = true
    },
    handleDragLeave(event) {
      event.preventDefault()
      this.isDragOver = false
    },
    handleFileSelect(event) {
      const files = event.target.files
      this.handleFiles(files)
    },
    handleFiles(files) {
      if (files.length === 0) return
      const file = files[0]
      const extension = file.name.split('.').pop().toLowerCase()
      if (extension !== 'jpg' && extension !== 'png') {
        alert('Por favor, selecione um arquivo do tipo .jpg ou .png.')
        return
      }
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo do tipo imagem.')
        return
      }
      this.fileDropped = true
      this.fileName = file.name
      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result
      }
      reader.readAsDataURL(file)
    },
    openFileInput() {
      const fileInput = this.$el.querySelector('input[type="file"]')
      fileInput.click()
    },
    resetForm() {
      this.form = {
        title: '',
        flavor: '',
        price: null,
        description: '',
        image: null
      }
      this.imagePreview = null
    },
    submitForm() {
      axios
        .post('https://660cbb4c3a0766e85dbe89d2.mockapi.io/api/v1/order', this.form)
        .then((response) => {
          console.log('Post request successful:', response.data)
          this.addOrder({ ...this.form, image: this.imagePreview })
          this.resetForm()
        })
        .catch((error) => {
          console.error('Error posting data:', error)
          this.resetForm()
        })
    }
  }
}
</script>

<style>
#pastel-img {
  position: absolute;
  top: -1%;
  z-index: 999;
}
#pasteis-img {
  position: absolute;
  right: 18%;
  top: 15%;
}
.header-container {
  width: 100vw;
  min-height: 100vh;
  background-size:
    100% 43%,
    30%;
  background-repeat: no-repeat, repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
}
.background-container {
  background: transparent
    radial-gradient(closest-side at 50% 50%, #ffffff 0%, #ffffff 67%, #ffffff00 100%) 0% 0% repeat
    padding-box;
  height: 84vh;
  width: 100vw;
  position: absolute;
  bottom: -10%;
}
.form-container {
  position: relative;
  width: 62vw;
  margin-top: 1%;
  padding-bottom: 4vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom, #ffca00 0%, #ffca00 23%, white 23%, white 100%);
}
.form-header {
  background-color: #ffca00;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
}
h6 {
  color: #a03400;
  font-style: italic;
  font-weight: bold;
  letter-spacing: -0.5px;
  padding-left: 4%;
  font-size: 0.8em;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 1.2em 0.4em 0 0.2rem;
  position: relative;
}
.overflow-input {
  position: absolute;
  top: -1.5em;
}
input,
textarea {
  border: 1px solid #e43636;
  border-radius: 5px;
  padding: 0.3em 0.7em;
  margin: 1.3% 0.8%;
  color: #a03400;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 0.8em;
  font-weight: bold;
}
input {
  height: 5vh;
}
::-webkit-input-placeholder {
  color: #a03400;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 0.7em;
  font-weight: bold;
}
::placeholder {
  color: #a03400;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 0.7em;
  font-weight: bold;
}
.dropzone-container {
  width: 100%;
  border: 1px solid #e43636;
  position: relative;
  border-radius: 5px;
  padding: 0.3em 0.7em;
  margin: 1.3% 0 1.3% 0.8%;
}
.drop-area {
  display: flex;
  justify-content: center;
}
.drop-text {
  font-size: 0.7em;
  color: #a03400;
}
.image-preview {
  width: 5vw;
}
.actions {
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  bottom: -0.8em;
}
.rounded-button {
  border-radius: 30px;
  background-color: #ffca00;
  border: none;
  padding: 1.3% 5%;
  margin: 0 2%;
  color: #ffffff;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: bold;
}
.orders {
  width: 62vw;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: transparent
    radial-gradient(closest-side at 50% 50%, #ffffff 0%, #ffffff 67%, #ffffff00 100%) 0% 0% repeat
    padding-box;
}
h1 {
  font-family: sans-serif;
  margin: 10vh 0 5vh 0;
  color: #a03400;
  text-align: center;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: bold;
  position: relative;
  width: 100%;
}

h1:before {
  content: '';
  display: block;
  height: 2px;
  background: #a03400;
  left: 0;
  top: 50%;
  position: absolute;
}

h1:after {
  content: '';
  display: block;
  height: 2px;
  background: #a03400;
  right: 0;
  top: 50%;
  position: absolute;
}
@media (max-width: 576px) {
  #pastel-img {
    display: none;
  }
  .form-container {
    margin-top: 1%;
  }
  .form-header {
    padding: 1.5vh 2vw 3vh 1vw;
  }
  h6 {
    padding-left: 0;
    font-size: 0.8em;
  }
  h1:before {
    width: 0;
  }
  h1:after {
    width: 0;
  }
}
@media (min-width: 576px) and (max-width: 768px) {
  #pastel-img {
    display: none;
  }
  .form-container {
    margin-top: 1%;
  }
  .form-header {
    padding: 2vh 1.5vw 3vh 1.5vw;
  }
  h6 {
    padding-left: 0;
    font-size: 0.8em;
  }
  h1:before {
    width: 0;
  }
  h1:after {
    width: 0;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  #pastel-img {
    display: none;
  }
  .form-header {
    padding: 2vh 1.5vw 3vh 0;
  }
  .actions {
    bottom: -0.9em;
  }
  h1:before {
    width: 16vw;
  }
  h1:after {
    width: 16vw;
  }
}
@media (min-width: 992px) and (max-width: 1200px) {
  #pastel-img {
    left: 9vw;
  }
  .form-header {
    padding: 2vh 1.5vw 3vh 0;
  }
  .actions {
    bottom: -1em;
  }
  h1:before {
    width: 22vw;
  }
  h1:after {
    width: 22vw;
  }
}
@media (min-width: 1200px) {
  #pastel-img {
    left: 11vw;
  }
  .form-header {
    padding: 2vh 1.5vw 3vh 0.6vw;
  }
  .actions {
    bottom: -1.2em;
  }
  h1:before {
    width: 27vw;
  }
  h1:after {
    width: 27vw;
  }
}
</style>
