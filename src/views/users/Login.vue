<template>
  <div style="width:50%;">
    <Form ref="auth" :model="auth" :rules="ruleInline" :label-width="500">
      <FormItem prop="email">
        账号：
        <Input type="text" v-model="auth.email" placeholder="请输入您的邮箱账号"/>
      </FormItem>
      <FormItem prop="password">
        密码：
        <Input type="password" v-model="auth.password"/>
      </FormItem>
      <FormItem>
        <Button @click="login" type="primary" long>登录</Button>
        <Button to="/users/new" type="primary" long>注册</Button>
      </FormItem>
    </Form>
  </div>
</template>·
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
      auth: {
        email: null,
        password: null
      },
      ruleInline: {
        email: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", tigger: "blur" }]
      }
    };
  },
  created () {
    console.log('fdsafds')
  },
  methods: {
    login() {
    //   this.$refs[auth].validata(valid => {
    //     if (valid) {
    //       this.signln();
    //       alert('ss')
    //     } else {
    //       this.$message.error();
    //       alert('sadf')
    //     }
    //   });
    // },
    // signln() {
      console.log("fdsafds");
      this.$http.post(`/users/sign_in`, { auth: this.auth }).then(res => {
        let authorization = res.data.jwt;
        if (!authorization) {
          this.$message.error(res.data.notice);
          return;
        }
        // this.$Message.success("正在登录");
        // if (authorization !== null) {
        //   let env = process.env.NODE_ENV;
        //   console.log(env)
        //   window.localStorage.setItem("authorization", authorization);
        //   if (env === "production") {
        //     this.$http.defaults.headers.common["Authorization"] = authorization;
        //   }
        // this.$store.dispatch("loadUser").then(() => {
        this.$router.push("/App");

        // }
      });
    }
  }
};
</script>