Pipes.js
================================

What is this?
-----------------------------

Pipes.js is used to create long-lasting data structures in a browser.

You create a chain of "pipes". Here's a typical example:

    data -> filter -> sorter -> pager -> DOM

You configure the "onchange" of each pipe to propagate the data down the chain. Finally, the
last pipe receives the final result and updates the DOM. At any point in the chain, you can
perform DOM updates or any arbitrary code.

Have the UI (a form, links, whatever is appropriate) update the properties of the chain and
the changes propagate automatically to the DOM.



A Live Example
-----------------------------

First, check [this page](http://bookpiles.ca/jonathan/books)

The chain looks like:

    data -> filter (query) -> filter (status) -> limiter (20) -> DOM

You can see [how I connected everything](http://bookpiles.ca/javascripts/ownerships.js).

Finally, these objects are live: go to a page with more than 5 books, open a JavaScript console on the page and try:

    bookLimiter.size(5);

Changes you make update the data and get reflected in the view.



A Spidermonkey Example
-----------------------------

Consider this command-line: (5 largest file in a directory)

    ls -l | grep '^-' | awk '{print $5, $NF}' | sort -nr | head -n 5 | awk '{print $2}'

Let's aim to create something like that in JavaScript.

Given JSON data like:

    [{"filename": "README",       "size": 98,   "type": "file"},
     {"filename": "bash",         "size": 272,  "type": "directory"},
     {"filename": "bash_logout",  "size": 8,    "type": "file"},
     {"filename": "bash_profile", "size": 14,   "type": "file"},
     {"filename": "bashrc",       "size": 585,  "type": "file"},
     {"filename": "bin",          "size": 578,  "type": "directory"},
     {"filename": "gitconfig",    "size": 238,  "type": "file"},
     {"filename": "inputrc",      "size": 400,  "type": "file"},
     {"filename": "irbrc",        "size": 524,  "type": "file"},
     {"filename": "rdebugrc",     "size": 41,   "type": "file"},
     {"filename": "rtorrent.rc",  "size": 185,  "type": "file"},
     {"filename": "screenrc",     "size": 382,  "type": "file"},
     {"filename": "share",        "size": 102,  "type": "directory"},
     {"filename": "ssh",          "size": 102,  "type": "directory"},
     {"filename": "tsocks.conf",  "size": 38,   "type": "file"},
     {"filename": "vim",          "size": 408,  "type": "directory"},
     {"filename": "vimrc",        "size": 5254, "type": "file"}]

We need a chain like this:

    data -> filter -> sorter -> limiter -> DOM (or other output)

Check the [example file](http://github.com/jpalardy/pipes.js/blob/master/examples/files.js).



How to build
-----------------------------

In the main directory (the one that this file is in), type
the following to make pipes.js:

    make

Run the tests. Node.js needs to be installed.

    make test

Tests a build of pipes.js against JSLint, looking for potential
errors or bits of confusing code. Spidermonkey needs to be
installed. A "jslint" executable needs to be in your path.
(something like this:
[jslint](http://github.com/jpalardy/dotfiles/blob/master/bin/jslint)
)

    make lint

Finally, you can remove all the built files using the command:

    make clean

