<template>
  <Form>
    <FormItem>
      <center>
        <Carousel autoplay v-model="value2" loop  style="width:300px; height: 700px">
          <CarouselItem v-for="(item,index) in imgs">
            <!-- <img src="../../assets/4.jpg" alt="" style="width:300px; height:600px" > -->

            <div>
              <img v-bind:src="item.src" alt style="height:600px; width:300px" />
              <p>{{ item.text }}</p>
            </div>
          </CarouselItem>
        </Carousel>
        <!-- <CarouselItem >
              <img src="../../assets/4.jpg" alt="" style="width:300px; height:600px" >
           </CarouselItem>
           <CarouselItem >
             <img src="../../assets/2.jpg" alt="" style="width:300px; height:600px">
        </CarouselItem>
            <CarouselItem >
             <img src="../../assets/4.jpg" alt="" style="width:300px; height:600px">
        </CarouselItem>
            <CarouselItem >
             <img src="../../assets/3.jpg" alt="" style="width:300px; height:600px">
        </CarouselItem>
        </Carousel>-->
      </center>
    </FormItem>
    <FormItem>
      <p>
        标题:
        <Input type="text" v-model="post.title" style="width:100px" />
      </p>
    </FormItem>
    <FormItem>
      <p>
        内容:
        <br />
        <textarea cols="150" rows="10"></textarea>
      </p>
    </FormItem>
    <FormItem>
      <p>
        作者:
        <Input type="text" v-model="post.writter" style="width:100px" />
      </p>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="add">baochun</Button>
    </FormItem>
  </Form>
</template>
<script>
import { Form, FormItem, Button, Carousel, CarouselItem, Input } from "iview";
export default {
  components: {
    Form,
    FormItem,
    Button,
    Carousel,
    CarouselItem,
    Input
  },
  data() {
    return {
      value2: 0,
      // src:require("../../assets/1.jpg"),
      imgs: [
        {
          src: require("../../assets/1.jpg"),
          text: "asdfas"
        },
        {
          src: require("../../assets/3.jpg"),
          text: "ssss"
        },
        {
          src: require(`../../assets/2.jpg`),
          text: "aaaa"
        },
        {
          src: require(`../../assets/4.jpg`),
          text: "vvvv"
        }
      ],
      post: {
        title: "",
        writter: ""
      }
    };
  },
  methods: {
    add() {
      this.$http.post("/posts", this.post).then(res => {
        if (res.data.status === 1) {
          this.$router.push("/posts");
          alert(res.data.notice);
        } else {
          alert(res.data.notice);
        }
      });
    },
    dd(index) {
      if (index === 2) {
        this.$router.push(`/users`);
      } else if (index === 3) {
        this.$router.push(`/posts`);
      }
    }
  }
};
</script>

