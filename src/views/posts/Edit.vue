<template>
  <Form>
    <FormItem>
    <Row type='flex' :gutter='16'>
   <Col :span='24'> 
   <p>标题:</p>
    <input type="text" v-model="post.title">
    </Col :span="24">
    <Col> 
    <p>作者:</p>
    <input type="text" v-model="post.writter">
     </Col >
     <Col :span='24'> 
     <p>内容:</p>
     <textarea v-model="post.content" cols="200" rows="10"></textarea>
     </Col >
     <Col :span="24" style="margin-top:15px"> 
    <Button type="primary" @click="save">baochun</Button>
     </Col>
    </Row>
    </FormItem>
  </Form>
</template>
<script>
import { Form, FormItem, Row, Col, Button } from 'iview';
export default {
  components:{
    Form,
    FormItem,
    Row,
    Col,
    Button
  },
  data() {
    return {
      post: {
        title: "",
        writter: "",
        content:''
      }
    };ya
  },
  created() {
    this.$http.get(`/posts/${this.$route.params.id}`).then(res => {
      this.post = res.data.post;
    });
  },
  methods: {
    save() {
      this.$http
        .put(`/posts/${this.$route.params.id}`, { post: this.post })
        .then(res => {
          if (res.data.status === 1) {
            this.$router.push("/posts");
            alert(res.data.notice);
          } else {
            alert(res.data.notice);
          }
        });
    }
  }
};
</script>

