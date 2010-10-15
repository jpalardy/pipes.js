/************************************************************
Pipe (cat)

Mostly a base class.

Encapsulates the idea of holding a list which can be changed. It
provides an output of the list which is just a reference to the
input. Subclasses could filter, trim, sort, or modify the input to
produce any desired output. Pipes are meant to be stateful chains
of command-line pipes.

Properties:

- input    ; the list that was fed in
- output   ; the relevant transformation of the input

************************************************************/

this.Pipe = function() {
    if (! (this instanceof arguments.callee)) {
        return new arguments.callee(arguments);
    }

    var self = this;
    self.init();
};

this.Pipe.prototype.init = function() {
    var self = this;
    self._input  = []; // lines coming in the pipe
    self._output = []; // lines coming out of pipe
};

// getter/setter
this.Pipe.prototype.input = function(lines) {
    var self = this;

    if(lines === undefined) {
        return self._input;
    } else {
        self.set("input", lines);
    }
};

// getter
this.Pipe.prototype.output = function() {
    var self = this;
    return self._output;
};

this.Pipe.prototype.set = function(field, value) {
    var self = this;

    var oldValue = self["_" + field];
    self["_" + field] = value;

    self.change(field, value, oldValue);
};

this.Pipe.prototype.change = function(field) {
    var self = this;

    // PASSTHROUGH
    self._output = self._input;

    if(self.onchange) {
        self.onchange(self._output);
    }
};

