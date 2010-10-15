/************************************************************
Sorter (sort)

The sorted version of the input, sorted on arbitrary fields
and strategies.

Sorting by the same field twice toggles ascending.

Properties:

- input
- output
- ascending   ; reverses sorting order
- field       ; what function (key) to use to sort
- comparators ; hash of field -> function to use when sorting

************************************************************/

this.Sorter = function(field, comparators) {
    if (! (this instanceof arguments.callee)) {
        return new arguments.callee(arguments);
    }

    var self = this;
    self.init(field, comparators);
};

this.Sorter.prototype = new this.Pipe();

this.Sorter.prototype.init = function(field, comparators) {
    var self = this;

    self._ascending   = true;
    self._field       = field;
    self._comparators = comparators;
};

this.Sorter.prototype.change = function(field, value, oldValue) {
    var self = this;

    if(field == "field") {
        if(value == oldValue) {
            self.ascending(!self._ascending); // same field -> toggle
        } else {
            self.ascending(true);             // different field -> set
        }
        return;
    }

    self._output = self._input.concat();
    self._output.sort(function(a,b) {
        return (self._ascending ? 1 : -1) * self._comparators[self._field](a,b);
    });

    if(self.onchange) {
        self.onchange(self._output, self._field, self._ascending);
    }
};

// getter/setter
this.Sorter.prototype.field = function(field) {
    var self = this;

    if(field === undefined) {
        return self._field;
    } else {
        self.set("field", field);
    }
};

// getter/setter
this.Sorter.prototype.ascending = function(ascending) {
    var self = this;

    if(ascending === undefined) {
        return self._ascending;
    } else {
        self.set("ascending", ascending);
    }
};

// getter/setter
this.Sorter.prototype.comparators = function(comparators) {
    var self = this;

    if(comparators === undefined) {
        return self._field;
    } else {
        self.set("comparators", comparators);
    }
};

