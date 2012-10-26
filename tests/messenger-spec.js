define(function(require) {

    var Messenger = require('../src/messenger'),
        $ = require('$'),
        messenger,
        message,
        node,
        flag;

    describe('Messenger', function() {

        beforeEach(function() {
            runs(function() {
                flag = false;
                var node = $('<iframe id="iframe" src="test-iframe.html">');
                node.on('load', function() {
                    flag = true;
                });
                node.appendTo(document.body);

                messenger = new Messenger({
                    target: '#iframe',
                    onmessage: function(data) {
                        message = data;
                    }
                });
            });
        });

        afterEach(function() {
            messenger = null;
            node && node.remove();
        });

        test(' 子页面传给父页面', function() {

            waitsFor(function() {
                return flag;
            }, "iframe应该已经载入成功了", 5000);

            runs(function() {
                expect(message).toBe('from iframe.');
            });

        });

        test(' 父页面传给子页面', function() {

            waitsFor(function() {
                // 父页面给子页面发消息
                messenger.send('from parent.');

                return flag;
            }, "iframe应该已经载入成功了", 5000);

            runs(function() {
                expect(window.parentMessage).toBe('from parent.');
            });

        });
    });

});

