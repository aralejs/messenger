# Messenger

---

[![Build Status](https://travis-ci.org/aralejs/messenger.png?branch=master)](https://travis-ci.org/aralejs/messenger)

跨域 Iframe 通信解决方案，兼容主流和 IE 系列浏览器。

<span style="font-size:100px;line-height:0.7;color:rgb(116, 106, 76);">☏</span>

---

## Usage

### 父页面

```js
// 初始化父页面的信使
var messenger = new Messenger('parent', 'MessengerProject');

// 绑定子页面 iframe
messenger.addTarget(iframe1.contentWindow, 'iframe1');
messenger.addTarget(iframe2.contentWindow, 'iframe2');

// 给子页面发消息
messenger.targets['iframe1'].send('发给子页面1的消息');

// 或者给所有子页面发消息
messenger.send('发给所有子页面的消息');
```

### 子页面

```js
// 初始化子页面的信使
// 注意，第二个参数 `MessengerProject` 必须和父页面的信使保持一致，
var messenger = new Messenger('iframe1', 'MessengerProject');

// 给父页面发消息
messenger.targets['parent'].send('发给父页面的消息');
```

## 感谢

本组件源码来自 [https://github.com/biqing/MessengerJS](https://github.com/biqing/MessengerJS) 。

文档亦可参考 [biqing/MessengerJS](https://github.com/biqing/MessengerJS/) 。
