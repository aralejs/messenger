define(function(require) {

    var Messenger = require('../src/messenger'),
        $ = require('$'),
        messenger,
        message,
        node;

    describe('Messenger', function() {


        beforeEach(function() {
            messenger = new Messenger({
                target: '#iframe',
                onmessage: function(data) {
                    message = data;
                }
            });
        });

        afterEach(function() {
            messenger = null;
            node && node.remove();
        });

        it(' 子页面传给父页面', function() {
            createIframe(function() {
                expect(message).toBe('from iframe.');
            });
        });

        it(' 父页面传给子页面', function() {
            createIframe(function() {
                messenger.send('from parent.');
                expect(window.parentMessage).toBe('from parent.');
            });
        });

        it('传递object对象', function() {
            createIframe(function() {
                messenger.send({test: 'test-text'});
                expect(window.parentMessage.test).toBe('test-text');
            });
        });

    });

    function createIframe(callback) {
        node = $('<iframe id="iframe" src="test-iframe.html">');
        node.on('load', function() {
            callback();
        });
        node.appendTo(document.body);
    }

});

