var expect = require('expect.js');
var Messenger = require('../index.js'),
    $ = require('jquery'),
    messenger,
    message,
    delay = 0,
    node;

mocha.globals('iframe');
mocha.suite.timeout(8000);

describe('Messenger', function() {

    afterEach(function() {
        messenger = null;
        node && node.remove();
        node = null;
    });

    it('子页面传给父页面', function(done) {
        createIframe(function() {
            setTimeout(function() {
                expect(message).to.be('from iframe.');
                done();
            }, delay);
        });
    });

    it('父页面传给子页面', function(done) {
        createIframe(function() {
            messenger.targets['iframe1'].send('from parent.');
            setTimeout(function() {
                expect(seajs.parentMessage).to.be('from parent.');
                done();
            }, delay);
        });
    });

});

function createIframe(callback) {
    node = $('<iframe id="iframe" src="tests/test-iframe.html"></iframe>');
    node.appendTo(document.body);
    window.loaded = callback;
    messenger = new Messenger('parent', 'tests');
    messenger.addTarget(node[0].contentWindow, 'iframe1');
    messenger.listen(function(msg) {
        message = msg;
    });
}

