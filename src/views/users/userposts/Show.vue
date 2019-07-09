<template>
  <Row type="flex" :gutter="16">
    <Col :span="0" :offset="0">
      <Button @click="dd">返回列表</Button>
    </Col>
    <Col :span="0" :offset="18">
      <Button @click="delall">删除全部评论</Button>
    </Col>
    <Divider></Divider>
    <Col>
      <h1>{{ post.title }}</h1>
    </Col>
    <Divider></Divider>
    <Col>{{ post.content }}</Col>
    <Divider>评论</Divider>
    <Col v-for="(item,index) in comments" :span='24' style='margin-top:15px'>
    {{ item.post_comment }}
    <p><Button @click='like'>点赞</Button></p>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Button, Divider } from "iview";
export default {
  components: {
    Row,
    Col,
    Button,
    Divider
  },
  data() {
    return {
      post: {
        title: "",
        content: ""
      },
      comments: []
    };
  },
  created() {
    this.$http.get(`/posts/${this.$route.params.id}`).then(res => {
      this.post = res.data.post;
    }),
      this.$http.get(`/posts/${this.$route.params.id}/comments`).then(res => {
        this.comments = res.data.comments;
      });
  },
  methods: {
    dd() {
      this.$router.push(`/userposts/posts`);
    },
    like(){
      console.log(this.params.id)
      this.$http.put(`/posts/${this.$route.params.id}/comments/${this.post.id}/like`)
    }
  }
};
</script>

