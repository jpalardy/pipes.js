
test("empty Pager is sane", function(p, data) {
    p = new pipe.Pager();

    assert.equalJSON(p.input(), []);
    assert.equalJSON(p.output(), []);
    assert.equal(p.pages(), 0);

    // no exception
    p.change();
});

test("Pager with data (default size)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Pager();

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [20,19,18,17,16,15,14,13,12,11]);
    assert.equal(p.pages(), 2);
});

test("Pager with data (given size)", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Pager(15);

    p.input(data);

    assert.equalJSON(p.input(), data);
    assert.equalJSON(p.output(), [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6]);
    assert.equal(p.pages(), 2);
});

test("Pager with data (page)", function(p, data) {
    data = [10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Pager(3);

    p.input(data);
    assert.equal(p.pages(), 4);

    assert.equal(p.page(), 0);
    assert.equalJSON(p.output(), [10,9,8]);

    p.page(1);
    assert.equal(p.page(), 1);
    assert.equalJSON(p.output(), [7,6,5]);

    p.page(2);
    assert.equal(p.page(), 2);
    assert.equalJSON(p.output(), [4,3,2]);

    p.page(3);
    assert.equal(p.page(), 3);
    assert.equalJSON(p.output(), [1]);

    // page out of range, no changes
    p.page(4);
    assert.equal(p.page(), 3);
    assert.equalJSON(p.output(), [1]);
});

test("Pager page reset (size)", function(p, data) {
    data = [10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Pager(3);

    p.input(data);
    p.page(1);
    assert.equalJSON(p.output(), [7,6,5]);

    p.size(5); // implicit page(0)
    assert.equalJSON(p.output(), [10,9,8,7,6]);
});

test("Pager page reset (input)", function(p, data) {
    data = [10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Pager(3);

    p.input(data);
    p.page(1);
    assert.equalJSON(p.output(), [7,6,5]);

    p.input([14,13,12,11,10,9,8]); // implicit page(0)
    assert.equalJSON(p.output(), [14,13,12]);
});

test("Pager page shortcuts", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Pager(3);

    p.input(data);

    p.last();
    assert.equal(p.page(), 6);
    assert.equalJSON(p.output(), [2,1]);

    // can't go past last
    p.next();
    assert.equal(p.page(), 6);

    // last-1
    p.prev();
    assert.equal(p.page(), 5);
    assert.equalJSON(p.output(), [5,4,3]);

    p.first();
    assert.equal(p.page(), 0);
    assert.equalJSON(p.output(), [20,19,18]);

    // can't go past first
    p.prev();
    assert.equal(p.page(), 0);

    // first+1
    p.next();
    assert.equal(p.page(), 1);
    assert.equalJSON(p.output(), [17,16,15]);
});

test("Pager with onchange callback", function(p, data) {
    data = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    p = new pipe.Pager(3);

    var counter = 0;
    p.onchange = function(lines) {
      counter += 1;
    };

    p.input(data);
    assert.equal(1, counter);

    p.change();
    assert.equal(2, counter);

    p.last();  // +1
    p.next();
    p.prev();  // +1

    p.first(); // +1
    p.prev();
    p.next();  // +1

    assert.equal(6, counter);

    // getters
    p.pages();
    p.page();
    p.size();

    assert.equal(6, counter);

    p.input([10,9,8,7,6,5,4,3,2,1]);
    assert.equal(7, counter);

    p.input([]);
    assert.equal(8, counter);
});

