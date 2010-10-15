
// invoke with: js -f ../dist/pipes.js -f files.js

var data = [{"filename": "README",       "size": 98,   "type": "file"},
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
            {"filename": "vimrc",        "size": 5254, "type": "file"}];

//-------------------------------------------------

var filter = new Filter(function(item) { return item.type == "file"; });

var sorter = new Sorter("size", {"size":     function(a,b) { return a.size < b.size         ? -1 : 1; },
                                 "filename": function(a,b) { return a.filename < b.filename ? -1 : 1; }});
sorter.ascending(false);

var limiter = new Limiter(5);

//-------------------------------------------------

filter.onchange = function(items) {
    sorter.input(items);
};

sorter.onchange = function(items) {
    limiter.input(items);
};

limiter.onchange = function(items) {
    items.forEach(function(item) { print(item.filename); });
};

//-------------------------------------------------

// shove data into chain
filter.input(data);

print("-------------------------------------------------");

// sort by "filename"
sorter.field("filename");

print("-------------------------------------------------");

// limit 5 -> 10
limiter.size(10);

print("-------------------------------------------------");

// only show filenames starting with "s"
filter.filter(function(item) { return item.filename[0] == "s"; });

