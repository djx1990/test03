<template>
  <Row type="flex" :gutter="16">
    <Col>
      <Input search style="width:200px" v-model="query" @on-search="search"></Input>
    </Col>
    <Col>
      <Table border stripe style="height:600px" :columns="column" :data="posts"></Table>
    </Col>
  </Row>
</template>
<script>
import { Row, Col, Input, Table } from "iview";
export default {
  components: {
    Row,
    Col,
    Input,
    Table
  },
  data() {
    return {
      query: "",
      column: [
        {
          title: "文章名",
          key: "title"
        },
        {
          title: "作者",
          key: "writter"
        },
        {
          title: "操作",
          key: "Aciton",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  on: {
                    click: () => this.show(params.row.id)
                  }
                },
                "show"
              )
            ]);
          }
        }
      ],
      posts: []
    };
  },
  created() {
    this.$http.get("/posts").then(res => {
      this.posts = res.data.posts;
    });
  },
  methods: {
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
   show(post_id) {
     console.log(post_id)
      this.$router.push(`/posts/${post_id}`);
    },
  }
};
</script>

