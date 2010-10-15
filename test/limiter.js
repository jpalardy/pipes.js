
test("empty Limiter is sane", function(p) {
    p = new pipe.Limiter();

    assert.equalJSON(p.input(), []);
    assert.equalJSON(p.output(), []);

    // no exception
    p.change();
});

test("Limiter with data (default size)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Limiter();

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [20,19,18,17,16,15,14,13,12,11]);
});

test("Limiter with data (given size)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Limiter(3);

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [20,19,18]);
});

test("Limiter with data (size)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Limiter();

    p.input(data);
    assert.equalJSON(p.output(), [20,19,18,17,16,15,14,13,12,11]);

    p.size(5);
    assert.equalJSON(p.output(), [20,19,18,17,16]);

    p.size(0);
    assert.equalJSON(p.output(), []);

    p.size(10);
    assert.equalJSON(p.output(), [20,19,18,17,16,15,14,13,12,11]);
});

test("Limiter with data (cap)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Limiter();

    p.input(data);
    assert.equalJSON(p.output(), [20,19,18,17,16,15,14,13,12,11]);

    p.cap(false);
    assert.equalJSON(p.output(), data);

    p.cap(true);
    assert.equalJSON(p.output(), [20,19,18,17,16,15,14,13,12,11]);
});

test("Limiter with onchange callback", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Limiter(3);

    var counter = 0;
    p.onchange = function(lines) {
      counter += 1;
    };

    p.input(data);
    assert.equal(1, counter);

    p.change();
    assert.equal(2, counter);

    p.size(0);
    p.size(5);

    assert.equal(4, counter);

    p.cap(false);
    p.cap(true);

    assert.equal(6, counter);

    // getters
    p.size();
    p.cap();

    assert.equal(6, counter);

    p.input([]);
    assert.equal(7, counter);
});

