System.config({
  "paths": {
    "*": "*.js",
    "squared/*": "lib/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "javascript-state-machine": "npm:javascript-state-machine@2.3.2",
    "ndarray": "npm:ndarray@1.0.16",
    "pixi.js": "npm:pixi.js@2.2.3",
    "tinycolor2": "npm:tinycolor2@1.1.1",
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.0.1"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.0": {
      "process": "npm:process@0.10.0"
    },
    "npm:buffer@3.0.1": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.4",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:ndarray@1.0.16": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "iota-array": "npm:iota-array@1.0.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    },
    "npm:pixi.js@2.2.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.0"
    },
    "npm:tinycolor2@1.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    }
  }
});

