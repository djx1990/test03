<template>
  <Form>
    <FormItem>
      <Button @click="save">保存</Button>
    </FormItem>
    <Divider />
    <FormItem>
      名字：
      <Input type="text" v-model="user.name" />
    </FormItem>
    <FormItem>
      年龄：
      <Input type="text" v-model="user.age" />
    </FormItem>
    <FormItem>
      爱好：
      <Input type="text" v-model="user.favs" />
    </FormItem>
    个人简介：
    <textarea cols="100" rows="10" v-html="user.intro"></textarea>
  </Form>
</template>
<script>
import { Form, FormItem, Input, Button, Divider } from "iview";
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button,
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
  // 为了传递数据，使input框填满内容，既原来的内容在相应的input框内
  methods: {
    save() {
      this.$http
        .put(`/users/${this.$route.params.id}`, { user: this.user })
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