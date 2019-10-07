
'use strict';

module.exports = {
    "recurseDepth": 20,
    "source": {
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": ".+\\.(test|spec).ts",
        "include": ["./server/dist"]
    }
};

/* DEFAULT CONFIG
{
    "plugins": [],
    "recurseDepth": 10,
    "source": {
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
*/