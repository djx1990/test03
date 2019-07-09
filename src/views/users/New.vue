<template>
  <Form>
    <FormItem>
      名字:
      <Input text="text" v-model="users.name"></Input>
    </FormItem>
    <FormItem>
      年龄:
      <Input text="number" v-model="users.age"></Input>
    </FormItem>
    <Button @click="add" type="primary" long>注册</Button>
  </Form>
</template>
<script>
import { Form, FormItem, Input, Button } from "iview";
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button
  },
  data() {
    return {
      users: {
        name: "",
        age: ""
      }
    };
  },
  created() {
    this.$http.get("/users").then(res => {
      this.users = res.data.users;
    });
  },
  methods: {
    add() {
      this.$http.post("/users", { users: this.users }).then(res => {
        if (res.data.status === 1) this.$router.push(`/login`);
        alert(res.data.notice);
      });
    }
  }
};
</script>

