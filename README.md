
How to build
-----------------------------

In the main directory of the distribution (the one that this file is in), type
the following to make pipes.js:

    make

Run the tests. Node.js needs to be installed.

    make test

Tests a build of pipes.js against JSLint, looking for potential errors or bits of confusing code. Spidermonkey needs to be
installed. A "jslint" executable needs to be in your path. (something like this: [jslint](http://github.com/jpalardy/dotfiles/blob/master/bin/jslint) )

    make lint

Finally, you can remove all the built files using the command:

    make clean

