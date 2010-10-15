/************************************************************
Pager (less)

A sliding window over a list. Pages do not overlap.

Properties:

- input
- output
- size    ; the maximum length of the output
- page    ; the page

************************************************************/

this.Pager = function(size) {
    if (! (this instanceof arguments.callee)) {
        return new arguments.callee(arguments);
    }

    var self = this;
    self.init(size);
};

this.Pager.prototype = new this.Pipe();

this.Pager.prototype.init = function(size) {
    var self = this;

    self._start = 0;
    self._size  = size || 10;
};

this.Pager.prototype.change = function(field) {
    var self = this;

    if(field == "input" || field == "size") {
        self.page(0);
        return;
    }

    self._output = self._input.slice(self._start, self._start + self._size);

    if(self.onchange) {
        self.onchange(self._output, self.page(), self._size);
    }
};

this.Pager.prototype.pages = function() {
    var self = this;
    return Math.ceil(self._input.length / self._size);
};

// getter/setter
this.Pager.prototype.page = function(i) {
    var self = this;

    if(i === undefined) {
        return Math.ceil(self._start / self._size);
    } else {
        var start = i * self._size;

        if(start === 0 || start > 0 && start < self._input.length) {
            self.set("start", start);
        }
    }
};

// getter/setter
this.Pager.prototype.size = function(n) {
    var self = this;

    if(n === undefined) {
        return self._size;
    } else {
        var size = n;

        if(size >= 0 && size <= self._input.length) {
            self.set("size", size);
        }
    }
};

this.Pager.prototype.first = function() {
    var self = this;
    self.page(0);
};

this.Pager.prototype.last = function() {
    var self = this;
    self.page(self.pages()-1);
};

this.Pager.prototype.prev = function() {
    var self = this;
    self.page(self.page()-1);
};

this.Pager.prototype.next = function() {
    var self = this;
    self.page(self.page()+1);
};

