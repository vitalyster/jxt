'use strict';

var test = require('tape');
var jxt = require('../');


var Parent = jxt.define({
    name: 'parent',
    namespace: 'parent',
    element: 'test'
});

var OtherParent = jxt.define({
    name: 'otherparent',
    namespace: 'otherparent',
    element: 'test'
});


var Foo1 = jxt.define({
    name: 'foo',
    namespace: 'test',
    element: 'foo-1',
    fields: {
        val1: jxt.attribute('val')
    }
});

var Foo2 = jxt.define({
    name: 'foo',
    namespace: 'test',
    element: 'foo-2',
    fields: {
        val2: jxt.attribute('val')
    }
});


jxt.extend(Parent, OtherParent);
jxt.extend(Parent, Foo1);
jxt.extend(OtherParent, Foo2);


test('JXT names are scoped to parent objects', function (t) {
    var xml = new Parent({
        foo: {
            val1: 'foo-1'
        },
        otherparent: {
            foo: {
                val2: 'foo-2'
            }
        }
    });

    t.equal(xml.foo.val1, 'foo-1');
    t.equal(xml.otherparent.foo.val2, 'foo-2');
    t.end();
});
