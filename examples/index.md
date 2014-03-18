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

````iframe
<p>
  我是子页面
  <script>document.write('(' + location.protocol + '//' + location.host + ')');</script>
</p>

<p>
  <input id="message">
  <input type="button" id="send" value="发送给父页面">
</p>
<pre id="output">来自父页面的消息:</pre>

<script>
seajs.use(['messenger', '$'], function(Messenger, $) {
    var messenger = new Messenger('iframe1', 'demo');
    messenger.addTarget(window.parent, 'parent');

    // 通过点击按钮发送消息
    var send = $('#send');
    var message = $('#message');
    var output = $('#output');
    send.click(function() {
        messenger.targets['parent'].send(message.val());
        //messenger.send();  // 这样会发给所有 targets
        message.val('');
    });

    // 监听消息
    messenger.listen(function(msg) {
        output.html(output.html() + ' ' + msg);
    });
});
</script>
````

## 父页面这么写

````js
seajs.use(['messenger', '$'], function(Messenger, $) {
    var messenger = new Messenger('parent', 'tests');
    messenger.addTarget($('iframe')[0].contentWindow, 'iframe1');

    // 通过点击按钮发送消息
    var send = $('#send');
    var message = $('#message');
    var output = $('#output');
    send.click(function() {
        messenger.targets['iframe1'].send(message.val());
        message.val('');
    });

    // 监听消息
    messenger.listen(function(msg) {
        output.html(output.html() + ' ' + msg);
    });
});
````
