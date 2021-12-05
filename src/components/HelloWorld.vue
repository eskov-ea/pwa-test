<template>
  <div class="hello">
    <div class="image_container">
      <p>Чтобы {{this.showImage ? 'скрыть' : 'показать'}} картинку - жмякни кнопку</p>
      <button class="image_btn" @click="imageToggle">{{this.showImage ? 'Спрятать' : 'Показать'}}</button>
      <div class="image_wrapper">
        <img class="image"
          :class="this.showImage ? 'image_show' : 'image_hide'"
           src="../assets/CENSORED.svg_.png" alt="">
      </div>
    </div>
    <div class="input_data">
      <h1
        :class="this.GET_LAST_USER_ID() && this.isActive ? 'notification' : 'non_active'"
      >
        Восстановленны данные с последнего посещения. id пользователя: {{GET_LAST_USER_ID()}}
      </h1>

      <p class="lab">Введите id пользователя, чтобы загрузить его посты:</p>
      <p class="note">*Доступные пользователь с номером 1 - 10</p>
      <input v-model="this.userId" type="number">
      <button
        @click="fetchPosts(this.userId)"
      >
        Запросить!
      </button>
    </div>


    <div v-if="this.isLoading" class="prealoder">
      <h1>Loading...</h1>
    </div>
    <div v-else class="conteiner">
      <div
          class="item"
          v-for="post in this.posts"
      >
        <p>{{post.title}}</p>
        <p>{{post.body}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'HelloWorld',
  components: {},
  props: {
    msg: String
  },
  data(){
    return {
      isLoading: false,
      isActive: true,
      userId: '',
      posts : [],
      showImage: false
    }
  },
  methods:{
    ...mapGetters(["GET_LAST_USER_ID"]),
    ...mapMutations(["SAVE_LAST_USER_ID"]),
    imageToggle(){
      this.showImage = ! this.showImage
    },
    async fetchPosts(id){
      if(!id) {
        alert('Введите id пользователя!')
      } else {
        this.isLoading = true;
        this.SAVE_LAST_USER_ID(id);
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
        const data = await res.json();
        this.posts = data;
        this.isLoading = false;
      }

    }
  },
  created() {
    this.fetchPosts(this.GET_LAST_USER_ID())
  },
  mounted(){
    setTimeout( () => {
      this.isActive = false
    }, 2000)
  }
}
</script>

<style scoped>
.image_btn{
  width: 300px;
  height: 60px;
  background-color: rgba(250, 250, 250, 1);
  color: #42b983;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 10px;
  border: 5px solid #42b983;
  transition: all 0.5s ease 0s;
  margin: 10px;
}
.image_wrapper{
  position: relative;
  width: 100%;
  max-width: 600px;
}
.image_btn:hover{
  background-color: rgba(66, 185, 131, 0.1);
  color: #3ca274;
  transform: scale(1.05);
  transition: all 0.5s ease 0s;
  cursor: pointer;
}
.image{
  position: absolute;
  max-width: 100%;
  left: 0;
  top: 0;
}
.image_hide{
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
}
.image_show{
  opacity: 1;
  visibility: visible;
  transition: all 0.4s ease;
  position: relative;
}
.hello{
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.lab{
  font-size: 16px;
  font-weight: 400;
  margin: 10px 0;
  padding: 0;
}
.notification{
  opacity: 1;
  visibility: visible;
  width: 100%;
  max-width: 500px;
  height: 150px;
  margin: 0 auto 30px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 300;
  background-color: #f7fffe;
}
.non_active{
  opacity: 0;
  visibility: hidden;
  height: 0;
}
.note{
  font-size: 14px;
  font-weight: 300;
  margin: 0;
  padding: 0;
}
.item{
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  background-color: #ebf1ff;
  padding: 10px;
  text-align: left;
  border-radius: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container{
  margin-bottom: 100px;
}
.input_data input{
  height: 25px;
  margin: 5px 0;
}
.input_data button{
  height: 31px;
  margin: 5px 0;
}
@media screen and (max-width: 768px) {
  .image_btn{
    width: 200px;
    font-size: 14px;
    height: 40px;
  }
  .notification{
    width: 100%;
    max-width: 400px;
    height: 100px;
    margin: 0 auto 10px auto;
    font-size: 16px;
  }
  .note{
    font-size: 12px;
  }
}
</style>
