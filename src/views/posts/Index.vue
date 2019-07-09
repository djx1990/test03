<template>
  <Row type="flex" :gutter="24">
    <Col :span="24">
      <Input search type="text" style="width:200px" v-model="query" @on-search="search"></Input>
      <Button type="primary" to="posts/new">新建</Button>
    </Col>
    <Col>
      <Table border stripe height="400" :columns="colument1" :data="posts"></Table>
    </Col>
    <Col>
      <Page :total="100" :current="1" simple @on-change="pp"/>
    </Col>
  </Row>
</template>
<script>
import { Row, Table, Col, Toast, Button, Input, Page } from "iview";
export default {
  components: {
    Row,
    Table,
    Col,
    Toast,
    Button,
    Input,
    Page
  },
  data() {
    return {
      page: "",
      query: "",
      colument1: [
        {
          title: "文章名",
          key: "title"
          // render:(h,params)=>{
          //   return h('div',[
          //     h('u',{
          //       style:{
          //         color:'#006644',
          //         cursor:'pointer'
          //       },
          //       on:{
          //         click: ()=>{
          //           this.$router.push(`/content?year=${params.row.year}$month=$params.row.month`)
          //         }
          //       }
          //     },`${this.fenChange(params.row.title)}`)
          //   ])
          // }
        },
        {
          title: "作者",
          key: "writter"
        },
        {
          title: "序号",
          key: "id"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.zhiding(params.index);
                    }
                  }
                },
                "置顶111"
              ),
              h(
                "Button",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.row.id);
                    }
                  }
                },
                "show"
              ),
            ]);
          }
        }
      ],
      posts: []
    };
  },
  created() {
    this.$http.get("/posts").then(res => {
      // console.log(res);
      this.posts = res.data.posts;
    });
  },
  methods: {
    remove(index) {
      let post = this.posts[index];
      this.$http.delete("/posts/" + post.id).then(res => {
        if (res.data.status === 1) {
          this.posts.splice(index, 1);
          alert(res.data.notice);
        } else {
          alert(res.data.notice);
        }
      });
    },
    zhiding(index) {
      let currenTop = this.posts[index];
      console.log(index);
      console.log("this.post", this.post);
      // console.log(currenTop.id);
      this.$http.put(`/posts/${currenTop.id}/top`).then(res => {
        // this.$http.post("/posts/" + currenTop.id + "/top").then(res => {
        if (res.data.status === 1) {
          this.posts.splice(index, 1);
          this.posts.unshift(currenTop);
          alert("success");
        } else {
          alert("fail");
        }
      });
      // .catch(() => {
      //   Toast.fail('服务器繁忙，请稍候再试！')
      // });
    },
    edit(post_id) {
      console.log(post_id);
      this.$router.push(`posts/${post_id}/edit`);
    },
    show(post_id) {
      this.$router.push(`posts/${post_id}`);
    },
    search() {
      if (this.query == "") {
        this.$http.get(`/posts?query=${this.query}`).then(res => {
          this.posts = res.data.posts;
        });
      } else {
        this.posts = this.posts.filter(posts => {
          return posts.title.includes(this.query);
        });
      }
    },
    pp(page) {
      this.$http.get(`/posts?page=${page}`).then(res => {
        this.posts = res.data.posts;
      });
    }
  }
};

</script>

