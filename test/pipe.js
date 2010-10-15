
test("empty Pipe is sane", function(p) {
    p = new pipe.Pipe();

    assert.equalJSON(p.input(), []);
    assert.equalJSON(p.output(), []);

    // no exception
    p.change();
});

test("Pipe with data", function(p, data) {
    data = [5,4,3,2];
    p = new pipe.Pipe();

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), data);
});

test("Pipe with onchange callback", function(p, data) {
    data = [5,4,3,2];
    p = new pipe.Pipe();

    var counter = 0;
    p.onchange = function(lines) {
      counter += 1;
    };

    p.input(data);
    assert.equal(1, counter);

    p.change();
    assert.equal(2, counter);
});

