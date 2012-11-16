# Messenger

---

[![Build Status](https://secure.travis-ci.org/aralejs/messenger.png)](https://travis-ci.org/aralejs/messenger)

跨域 Iframe 通信解决方案，兼容 IE 系列浏览器。

---

## API

### target `selector`

收发信息的目标页面。


### onmessage `function`

接受消息的处理函数，第一个参数为收到的信息。

## 方法

### send `function`

使用 send 方法来给目标页面发送信息，接受一个 string 参数。

```js
messenger.send('The Message.');
```

## 最佳实践

### 父页面

```js
// target 参数为 iframe
var messenger = new Messenger({
    target: '#iframe',
    onmessage: function(msg) {
        console.log(msg);
    }
});
// 给子页面发消息
messenger.send('发给子页面的消息');
```

### 子页面

```js
// target 参数为 parent
var messenger = new Messenger({
    target: parent,
    onmessage: function(msg) {
        console.log(msg);
    }
});
// 给父页面发消息
messenger.send('发给父页面的消息');
```

## 感谢

本组件源码来自 [https://github.com/biqing/MessengerJS](https://github.com/biqing/MessengerJS) 。
