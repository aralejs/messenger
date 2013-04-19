define(function(require) {

    var expect = require('expect');
    var Messenger = require('../src/messenger'),
        $ = require('$'),
        messenger,
        message,
        delay = 60,
        node;

    mocha.globals('iframe');

    describe('Messenger', function() {

        beforeEach(function() {
        });

        afterEach(function() {
            messenger = null;
            node && node.remove();
            node = null;
        });

        it(' 子页面传给父页面', function(done) {
            createIframe(function() {
                setTimeout(function() {
                    expect(message).to.be('from iframe.');
                    done();
                }, delay);
            });
        });

        it(' 父页面传给子页面', function(done) {
            createIframe(function() {
                messenger.send('from parent.');
                setTimeout(function() {
                    expect(seajs.parentMessage).to.be('from parent.');
                    done();
                }, delay);
            });
        });

    });

    function createIframe(callback) {
        node = $('<iframe id="iframe" src="test-iframe.html"></iframe>');
        node.appendTo(document.body);
        node[0].contentWindow.loadMessenger = callback;
        messenger = new Messenger({
            target: '#iframe',
            onmessage: function(data) {
                message = data;
            }
        });
    }

});

