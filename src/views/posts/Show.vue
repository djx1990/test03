<template>
  <Row>

    <Row type="flex" :gutter="16">
      <Col :span="0" :offset="0">
        <Button @click="dd">返回主页</Button>
      </Col>
      <Col :span="0" :offset="20">
        <Button @click="delall">删除全部评论</Button>
      </Col>
    </Row>
    <Row type="flex">
      <Col :span="24">
        <h1>{{post.title}}</h1>
      </Col>
      <Divider />
      <Col :span="24">
        <p v-html="post.content"></p>
      </Col>
    </Row>
    <Row>
      <Col :span="0" :offset="22">{{ post.date }}</Col>
    </Row>
    <br>
    <Row>
      <Col :span="0" :offset="22">
        {{ post.like }}
        <Button size="small" @click="like" style="marggin-top:20px" v-if="likeshow">点赞</Button>
        <Button size="small" @click="unlike" style="marggin-top:20px" v-if="unlikeshow">取消点赞</Button>
      </Col>
    </Row>
    <Divider>评论</Divider>
    <Row type="flex">
      <Col style="padding-top: 15px" :span="24" v-for="(item,index) in comments" :key="index">
        {{ item.post_comment }}
        <p>
          {{ content }}
          <Button size="small" @click="commentLike(index)">点赞</Button>
          <!-- <Button>取消点赞</Button> -->
          <Button size="small" @click="del(index)">删除</Button>
          <Button size="small" @click="top(index)">置顶</Button>
        </p>
      </Col>
    </Row>
    <Row type="flex" :gutter="16">
      <Col :span="20" :offset="0" style="padding:15px 0 0 0;">
        <Input
          search
          clearalbe
          enter-button="add"
          v-model="newComment.post_comment"
          placeholder="Enter something..."
          @on-search="add"
        />
      </Col>
    </Row>
  </Row>
</template>
<script>
import { Row, Col, Button, Input, Divider, Carousel, CarouselItem } from "iview";
export default {
  components: {
    Row,
    Col,
    Button,
    Input,
    Divider,
    Carousel,
    CarouselItem
  },
  data() {
    return {
      likeshow: true,
      unlikeshow: false,
      content: "",
      newComment: {
        post_comment: ""
      },
      post: {
        content: "",
        like: ""
      },
      comments: []
    };
  },
  created() {
    this.$http.get(`/posts/${this.$route.params.id}`).then(res => {
      this.post = res.data.post;
    });
    this.$http.get(`/posts/${this.$route.params.id}/comments`).then(res => {
      this.comments = res.data.comments;
    });
  },
  methods: {
    dd() {
      this.$router.push("/posts");
    },
    del(index) {
      let comment = this.comments[index];
      this.$http.delete(`/comments/${comment.id}`).then(res => {
        if (res.data.status === 1) {
          this.comments.splice(index, 1);
          alert(res.data.notice);
        } else {
          alert(res.data.notice);
        }
      });
    },
    top(index) {
      let Top = this.comments[index];
      this.$http
        .put(`/posts/${this.$route.params.id}/comments/${Top.id}/top`)
        .then(res => {
          if (res.data.status === 1) {
            this.comments.splice(index, 1);
            this.comments.unshift(Top);
            alert(res.data.notice);
          } else {
            alert(res.data.notice);
          }
        });
    },
    add() {
      console.log(this.newComment);
      this.$http
        .post(`/posts/${this.$route.params.id}/comments`, {
          comment: this.newComment
        })
        .then(res => {
          console.log(res);
          if (res.data.status === 1) {
            let newComment = Object.assign({}, this.newComment);
            //nueComment=assign中大括号里面的值，assign中的值由大括号的逗号后面的值传递（逗号后面可以给多个值）
            let postComment = this.newComment.post_comment;
            this.comments.push(newComment);
            console.log(postComment);
            postComment = ""; //此处为清空评论框里面的内容

            alert(res.data.notice);
          } else {
            alert(res.data.notice);
          }
        });
    },
    commentLike(index) {
      let dz = this.comments[index];
      this.$http
        .put(`/posts/${this.$route.params.id}/comments/${dz.id}/like`)
        .then(res => {
          if (res.data.status === 1) {
            // this.comment.push(this.content);
            // this.content++;
            alert(res.data.notice);
          } else {
            alert(res.data.notice);
          }
        });
    },
    delall() {
      this.$http
        .delete(`/posts/${this.$route.params.id}/comments/des_all`)
        .then(res => {
          if (res.data.status === 1) {
            this.comments = [];
            //this.comments = []方法一删除全部
            // this.comments.splice(0,this.comments.length);方法二删除全部
            // this.
            alert(res.data.notice);
          } else {
            alert(res.data.notice);
          }
        });
    },
    like() {
      this.$http.put(`/posts/${this.$route.params.id}/like`).then(res => {
        if (res.data.status === 1) {
          alert(res.data.notice);
          (this.likeshow = false), (this.unlikeshow = true);
        } else {
          alert(res.data.notice);
        }
      });
    },
    unlike() {
      this.$http.put(`/posts/${this.$route.params.id}/unlike`).then(res => {
        if (res.data.status === 1) {
          this.likeshow = true;
          this.unlikeshow = false;
          alert(res.data.notice);
        } else {
          alert(res.data.notice);
        }
      });
    }
  }
};
</script>
