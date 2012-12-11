define(function(require) {

    var Messenger = require('../src/messenger'),
        $ = require('$'),
        messenger,
        message,
        delay = 80,
        node;

    describe('Messenger', function() {

        beforeEach(function() {
        });

        afterEach(function() {
            messenger = null;
            node && node.remove();
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

        it('传递object对象', function(done) {
            createIframe(function() {
                messenger.send({test: 'test-text'});
                setTimeout(function() {                
                    expect(seajs.parentMessage.test).to.be('test-text');
                    done();
                }, delay);
            });
        });

    });

    function createIframe(callback) {
        node = $('<iframe id="iframe" src="test-iframe.html"></iframe>');
        node.on('load', function() {
            callback();
        });
        node.appendTo(document.body);
        messenger = new Messenger({
            target: '#iframe',
            onmessage: function(data) {
                message = data;
            }
        });
    }

});

