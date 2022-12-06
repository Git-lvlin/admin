# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).











<template>
  <div>
    <div class="littletime">2022-11-30</div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe-cell v-for="item in content" :key="item.id">
        <van-cell>
          <!-- {{item}} -->
          <div class="box">
            <div class="pic">
              <img :src="item.header" alt="" />
            </div>
            <div class="uname" ref="enter"><!-- 李常华 -->{{ item.name }}</div>
            <div class="timer">
              <!-- 2022年11月10日 12:59:59 -->{{ item.cdate }}
            </div>
            <!-- <view class="del" >删除</view> -->
          </div>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" @click="show(item)" />
        </template>
      </van-swipe-cell>
    </van-list>

    <van-dialog v-model:show="show" title="移除客户" show-cancel-button confirmButtonText="移除" confirm="pid,member">
      <span class="text"
        >移除后该协作人员将无法继续管理项目您是否确定移除?</span
      >
    </van-dialog>

    <van-button type="primary" block class="btn" @click="add()"
      >+添加协作人员</van-button
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCoopers } from "../service.js";
import { addCoopers } from "../service.js";
import { deleteCoopers } from "../service.js";
onMounted(() => {
  getData();
});

const show = ref(false);

const content = ref("");
const route = useRoute();
const getData = () => {
  let params = {
    pid: route.query.pid,
    page: 0,
    size: 10,
  };
  getCoopers(params)
    .then((res) => {
      console.log(res, "dgfjdfj");
      content.value = res.content;
    })
    .catch((res) => {
      console.log(res, "catch");
    });
};

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 1; i++) {
      list.value.push(list.value.length + 0);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 8) {
      finished.value = true;
    }
  }, 1000);
};
</script>

<style>
.btn {
  position: fixed;
  left: 0px;
  bottom: 50px;
}
.littletime {
  text-align: left;
  padding-left: 5px;
  color: rgba(128, 128, 128, 1);
}
.box {
  display: flex;
  align-items: center;
  position: relative;
  /* transform: all 0.4s;
        transform: translateX(72px);
        margin-left: -72px; */
}
.uname {
  margin: 0 10px;
  color: rgba(0, 0, 0, 1);
}
img {
  width: 36px;
  height: 36px;
}
.timer {
  position: absolute;
  right: 20px;
  color: rgba(173, 173, 173, 1);
}
/* .del{
      background-color: red;
      width: 72px;
      height: 52px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      position: absolute;
      right:0;
      padding-left: -4px;
      
    } */
.van-button {
  height: 62px;
}
.text {
  width: 200px;
  height: 20px;
  padding: 0 20px;
}
</style>