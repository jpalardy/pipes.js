
test("empty Sorter is sane", function(p, data) {
    p = new pipe.Sorter();

    assert.equalJSON(p.input(), []);
    assert.equalJSON(p.output(), []);
    assert.equal(p.ascending(), true);

    // no exception
    p.change();
});

test("Sorter with data (default f)", function(p, data, f) {
    data = [20,19,18,17,16];
    f = function(a,b) { return 1; };
    p = new pipe.Sorter("num", {"num": f});

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [16,17,18,19,20]);
    assert.equal(p.field(), "num");
});

test("Sorter with data (ascending)", function(p, data, f) {
    data = [20,19,18,17,16];
    f = function(a,b) { return 1; };
    p = new pipe.Sorter("num", {"num": f});

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [16,17,18,19,20]);
    assert.equal(p.field(), "num");
    assert.equal(p.ascending(), true);

    p.ascending(false);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), data);
    assert.equal(p.field(), "num");
    assert.equal(p.ascending(), false);
});

test("Sorter with data (field)", function(p, data, f1, f2) {
    data = [20,19,18,17,16];
    f1 = function(a,b) { return 1; };
    f2 = function(a,b) { return a.toString()[1] < b.toString()[1] ? -1 : 1; };
    p = new pipe.Sorter("num", {"num": f1, "2nd_letter": f2});

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [16,17,18,19,20]);
    assert.equal(p.field(), "num");
    assert.equal(p.ascending(), true);

    p.field("2nd_letter");

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [20,16,17,18,19]);
    assert.equal(p.field(), "2nd_letter");
    assert.equal(p.ascending(), true);

    p.field("num");

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [16,17,18,19,20]);
    assert.equal(p.field(), "num");
    assert.equal(p.ascending(), true);

    p.field("num");

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [20,19,18,17,16]);
    assert.equal(p.field(), "num");
    assert.equal(p.ascending(), false);

    p.field("num");

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [16,17,18,19,20]);
    assert.equal(p.field(), "num");
    assert.equal(p.ascending(), true);
});

test("Sorter with data (compators)", function(p, data, f) {
    data = [20,19,18,17,16];
    f = function(a,b) { return 1; };
    p = new pipe.Sorter("num", {"num": f});

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [16,17,18,19,20]);
    assert.equal(p.field(), "num");
    assert.equal(p.ascending(), true);

    f = function(a,b) { return -1; };
    p.comparators({"num": f});

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), data);
    assert.equal(p.field(), "num");
    assert.equal(p.ascending(), true);
});

test("Sorter with onchange callback", function(p, data, f) {
    data = [20,19,18,17,16];
    f = function(a,b) { return 1; };
    p = new pipe.Sorter("num", {"num": f});

    var counter = 0;
    p.onchange = function(lines) {
      counter += 1;
    };

    p.input(data);
    assert.equal(1, counter);

    p.change();
    assert.equal(2, counter);

    p.ascending(false);
    assert.equal(3, counter);

    p.field("num");
    assert.equal(4, counter);

    p.comparators({"num": f});
    assert.equal(5, counter);

    // getters
    p.ascending();
    p.field();
    p.comparators();

    assert.equal(5, counter);

    p.input([10,9,8,7,6,5,4,3,2,1]);
    assert.equal(6, counter);

    p.input([]);
    assert.equal(7, counter);
});

