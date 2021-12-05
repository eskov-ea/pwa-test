<template>
  <div class="hello">
    <div class="accordion_container">
      <p>It is a new brand image</p>
      <img src="http://witsvuvuzela.com/wp-content/uploads/2016/02/CENSORED.svg_.png" alt="">
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
      posts : []
    }
  },
  methods:{
    ...mapGetters(["GET_LAST_USER_ID"]),
    ...mapMutations(["SAVE_LAST_USER_ID"]),
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
img{
  max-width: 100%;
}
.hello{
  width: 600px;
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
  width: 500px;
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
  width: 500px;
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
</style>
