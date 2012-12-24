# 跨域 Iframe 通信演示

---

## 演示

<p>
    我是父页面
    <script>document.write('(' + location.protocol + '//' + location.host + ')');</script>
</p>

<p>
    <input id="message">
    <input type="button" value="发送给子页面" id="send">
</p>

<pre id="output">来自子页面的消息:</pre>

<iframe id="iframe" src="iframe.html" width="500px"></iframe>

## 父页面这么写

````js
seajs.use(['messenger', '$'], function(Messenger, $) {
    window.messenger = new Messenger({
        target: '#iframe',
        onmessage: function(data) {
            output.html(output.html() + ' ' + data);
        }
    });
    
    // 通过点击按钮发送消息
    var send = $('#send');
    var message = $('#message');
    var output = $('#output');
    send.click(function() {
        messenger.send(message[0].value);
        message[0].value = '';
    });
});
````

## 子页面这么写

```js
seajs.use(['messenger', '$'], function(Messenger, $) {
    var messenger = new Messenger({
        target: parent,
        onmessage: function(data) {
            output.html(output.html() + ' ' + data);
        }
    });
    
    // 通过点击按钮发送消息
    var send = $('#send');
    var message = $('#message');
    var output = $('#output');
    send.click(function() {
        messenger.send(message[0].value);
        message[0].value = '';
    });
});
```

## 销毁

<button id="destroy">点我销毁信使</button>

````js
seajs.use('$', function($) {
    $('#destroy').click(function() {
        messenger && messenger.destroy();

        $('#destroy').html('已销毁信使');
    });
});
````

