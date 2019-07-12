<template>
  <Row type="flex" :gutter="24">
    <Col :span="24">
      <Input search style="width: 200px" v-model="query" @on-search="search"></Input>
      <Select
        v-model="name1"
        filterable
        style="width:200px"
        remote
        :remote-method="sou"
        :loading="loading"
      >
        <Option v-for="(user,index) in usersFilter" :value="user.value" :key="index">{{ user.label }}</Option>
      </Select>
      <!-- <router-link to="/users/new">fdsafdsa</router-link> 二级路由跳转方法一 -->
      <!-- <Button type="primary" to="/users/edit">safdasfd</Button> 二级路由跳转方法二  -->
    </Col>
    <Col :span="24">
      <Table border stripe ref="selection" height="400" :columns="columns" :data="users"></Table>
    </Col>
    <Col :span="12" push="12">
      <Page :total="100" show-elevator show-size @on-change="pp" />
    </Col>
    <Col :span="12" pull="12">
      <Button @click="handleSelectAll(true)" shape="circle">全选</Button>
      <Button type="success" shape="circle" @click="handleSelectAll(false)">全不选</Button>
      <!-- <Input type="text" v-model='user.name' /> -->
    </Col>
  </Row>
</template>
<script>
import {
  Table,
  Row,
  Col,
  Button,
  Input,
  Page,
  Icon,
  Select,
  Option
} from "iview";
// 在上方出现过的标签（首字母大写）均要出现在import和下方components里面
export default {
  components: {
    Row,
    Col,
    Table,
    Button,
    Input,
    Page,
    Icon,
    Select,
    Option
  },
  name: "",
  props: "",
  data() {
    return {
      query: "",
      // value: "",
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          title: "姓名",
          key: "name",
          sortable: true
        },
        {
          title: "年龄",
          key: "age",
          sortable: true
        },
        {
          title: '地址',
          key: "city"
        },
        {
          title: "爱好",
          key: "favs"
        },
        {
          title: "序列",
          key: "id"
        },
        {
          title: "链接",
          key: "url",
          render: (h, params) => {
            return h("img", { attrs: { src: params.row.url } }, "");
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "xxx"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.edit(params.row.id);
                      // （params.row.id）给一个id可以让下方的user_id传数据，
                    }
                  }
                },
                "edit"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.top(params.index);
                    }
                  }
                },
                "top"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => {
                      this.show(params.row.id);
                    }
                  }
                },
                "show"
              ),
              h(
                "Button",
                {
                  on: {
                    click: () => this.user_posts(params.row.id)
                  }
                },
                "全部文章"
              )
            ]);
          }
        }
      ],
      loading: false,
      name1: "",
      usersFilter:[],
      users: [],
      // items: [1, 2, 3, 4, 23, 32, 44],
      ds: ""
    };
  },
  created() {
    this.$http.get("/users").then(res => {
      this.users = res.data.users;
      this.get_selected()//远程搜索json
    });
  },
  methods: {
    selectChange() {
      console.log(this.ds);
      let user = this.users.find(user => {
        return (user.age = this.ds);
      });
      this.users = [user];
    },
    pp(page) {
      this.$http.get(`/users?page=${page}`).then(res => {
        this.users = res.data.users;
      });
    },
    search() {
      if (this.query == "") {
        this.$http.get(`/users?query=${this.query}`).then(res => {
          this.users = res.data.users;
        });
      } else {
        this.users = this.users.filter(val => {
          return val.name.includes(this.query);
        });
      }

      // this.$http.get(`/users?query=${this.query}`).then(res => {
      //   this.users = res.data.users;
      // });
    },
    get_selected () {
      let users1 = this.users.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
      console.log('users1', users1)
      this.usersFilter = users1.filter((val) => {
        return val
      })
      // this.usersFilter = users1.filter(
      //   item =>
      //     item.label.toLoyarnwerCase().indexOf(query.toLowerCase()) > -1 
      // );
      console.log(this.usersFilter)
    },
    sou(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          console.log('远程搜索')
        }, 200);
      }
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    remove(index) {
      let user = this.users[index];
      this.$http.delete("/users/" + user.id).then(res => {
        if (res.data.status === 1) {
          this.users.splice(index, 1);
          alert(res.data.notice);
        } else {
          alert(res.data.notice);
        }
      });
    },
    top(index) {
      let currenTop = this.users[index];
      console.log(currenTop.id);
      this.$http.post("/users/" + currenTop.id + "/top").then(res => {
        // console.log(res);
        if (res.data.status === 1) {
          this.users.splice(index, 1);
          this.users.unshift(currenTop);
          alert(res.data.notice);
        } else {
          alert(res.data.notice);
        }
      });
    },
    edit(user_id) {
      console.log(user_id);
      this.$router.push(`users/${user_id}/edit`);
      // (`/users/${user_id}/edit`);能准确找到需要改动的数据，需要在router里面定义ID
      //  edit(user_id) {
      // this.$router.push(`/users/${user_id}/edit`);二级路由跳转链接方法三
    },
    show(user_id) {
      this.$router.push(`users/${user_id}`);
    },
    user_posts(user_id) {
      console.log(user_id);
      this.$router.push(`userposts/${user_id}/posts`);
    }
  }
    
};
</script>
<style>
table {
  border: 1px black;
  border-collapse: collapse;
}
</style>

