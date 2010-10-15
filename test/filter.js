
test("empty Filter is sane", function(p, data) {
    p = new pipe.Filter();

    assert.equalJSON(p.input(), []);
    assert.equalJSON(p.output(), []);
    assert.equalJSON(p.criteria(), {});

    // no exception
    p.filter();
    p.change();
});

test("Filter with data (default f)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Filter();

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), data);
    assert.equalJSON(p.criteria(), {});
});

test("Filter with data (given f)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Filter(function(i) { return i % 2 === 0; });

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [20,18,16,14,12,10,8,6,4,2]);
    assert.equalJSON(p.criteria(), {});
});

test("Filter with data (criteria)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Filter(function(i, criteria) { return i % criteria.n === 0; });

    p.criteria({n: 3});
    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [18,15,12,9,6,3]);
    assert.equalJSON(p.criteria(), {n: 3});
});

test("Filter with data (filter)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Filter();

    p.criteria({n: 3});
    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), data);
    assert.equalJSON(p.criteria(), {n: 3});

    p.filter(function(i, criteria) { return i % criteria.n === 0; });

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [18,15,12,9,6,3]);
});

test("Filter with onchange callback", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Filter();

    var counter = 0;
    p.onchange = function(lines) {
      counter += 1;
    };

    p.input(data);
    assert.equal(1, counter);

    p.change();
    assert.equal(2, counter);

    p.filter(function() { return false; });
    assert.equal(3, counter);

    p.criteria({n: 3});
    assert.equal(4, counter);

    // getters
    p.criteria();
    p.filter();

    assert.equal(4, counter);

    p.input([10,9,8,7,6,5,4,3,2,1]);
    assert.equal(5, counter);

    p.input([]);
    assert.equal(6, counter);
});

