/************************************************************
Filter (grep)

A selection of the input, based on arbitrary criteria.

Properties:

- input
- output
- filter   ; a predicate function to decide inclusion in the output
- criteria ; a hash passed to each iteration of the filter function

************************************************************/

this.Filter = function(f) {
    if (! (this instanceof arguments.callee)) {
        return new arguments.callee(arguments);
    }

    var self = this;
    self.init(f);
};

this.Filter.prototype = new this.Pipe();

this.Filter.prototype.init = function(f) {
    var self = this;

    self._criteria = {};
    self._filter   = f || function() { return true; };
};

this.Filter.prototype.change = function(field) {
    var self = this;

    self._output = [];
    for(var i=0, n=self._input.length; i<n; i++) {
        if(self._filter(self._input[i], self._criteria)) {
            self._output.push(self._input[i]);
        }
    }

    if(self.onchange) {
        self.onchange(self._output, self._criteria);
    }
};

// getter/setter
this.Filter.prototype.criteria = function(criteria) {
    var self = this;

    if(criteria === undefined) {
        return self._criteria;
    } else {
        self.set("criteria", criteria);
    }
};

// getter/setter
this.Filter.prototype.filter = function(filter) {
    var self = this;

    if(filter === undefined) {
        return self._filter;
    } else {
        self.set("filter", filter);
    }
};

