
var assert = require("assert"),
    sys    = require("sys"),
    pipe   = require("./pipes");

function test(name, f) {
    f();
}

assert.equalJSON = function(actual, expected, message) {
    assert.equal(JSON.stringify(actual),
                 JSON.stringify(expected),
                 message);
};

