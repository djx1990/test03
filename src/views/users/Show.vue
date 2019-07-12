<template>
  <From>
    <FromItem>
      <Row type="flex" :gutter="12">
        <Col>
          <Button @click="index">返回主页</Button>
        </Col>
      </Row>
    </FromItem>
    <Divider />
    <FromItem>
      <Row type="flex" :gutter="12">
        <Col>头像:</Col>
        <Col v-html="user.url" :span="20"></Col>
      </Row>
    </FromItem>
    <Divider />
    <FromItem>
      <Row type="flex" :gutter="12">
        <Col class='marginTop'>
          <b>名字:</b>
        </Col>
        <Col v-html="user.name" :span="24"></Col>
        <Col>
          <b>年龄:</b>
        </Col>
        <Col v-html="user.age" :span="24"></Col>
        <Col>
          <b>爱好:</b>
        </Col>
        <Col v-html="user.favs" :span="24"></Col>
        <Col>
          <b>城市:</b>
        </Col>
        <Col v-html="user.city" :span="24"></Col>
      </Row>
    </FromItem>
    <Divider />
    <FromItem>
      <Row type="flex" :gutter="12">
        <Col>
         <h3> 个人简介:</h3>
        </Col>
        <Col v-html='user.intro' >
        
        </col>
      </Row>
    </FromItem>
  </From>
</template>
<script>
import { From, FromItem, Button, Row, Col, Divider } from "iview";
export default {
  components: {
    From,
    FromItem,
    Button,
    Row,
    Col,
    Divider
  },
  data() {
    return {
      user: []
    };
  },
  created() {
    this.$http.get(`/users/${this.$route.params.id}`).then(res => {
      this.user = res.data.user;
    });
  },
  methods: {
    index() {
      this.$router.push(`/users`);
    }
  }
};

</script>
<style>
</style>

