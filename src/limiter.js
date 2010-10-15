/************************************************************
Limiter (head -n)

A subset of the input, always from the beginning. Cap can
be turned on/off to become a passthrough.

Properties:

- input
- output
- size    ; the maximum length of the output
- cap     ; whether the size property is enforced

************************************************************/

this.Limiter = function(size) {
    if (! (this instanceof arguments.callee)) {
        return new arguments.callee(arguments);
    }

    var self = this;
    self.init(size);
};

this.Limiter.prototype = new this.Pipe();

this.Limiter.prototype.init = function(size) {
    var self = this;

    self._size = size || 10;
    self._cap  = true;
};

this.Limiter.prototype.change = function(field) {
    var self = this;

    if(self._cap) {
        self._output = self._input.slice(0, self._size);
    } else {
        self._output = self._input;
    }

    if(self.onchange) {
        self.onchange(self._output, self._size, self._cap);
    }
};

// getter/setter
this.Limiter.prototype.size = function(size) {
    var self = this;

    if(size === undefined) {
        return self._size;
    } else {
        if(size >= 0) {
            self.set("size", size);
        }
    }
};

// getter/setter
this.Limiter.prototype.cap = function(cap) {
    var self = this;

    if(cap === undefined) {
        return self._cap;
    } else {
        self.set("cap", cap);
    }
};

