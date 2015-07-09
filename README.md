Atlasboard sweet Package
========================
[![Build Status](https://travis-ci.org/ryancsweet/atlasboard-sweet-package.svg)](https://travis-ci.org/ryancsweet/atlasboard-sweet-package)

## Installation

From the root directory of your Atlasboard wallboard, run the following:

```bash
git submodule add https://github.com/ryancsweet/atlasboard-sweet-package.git packages/sweet
```

to import the package as a **git submodule** and use any of the widgets and jobs in this package.

See also: [Package-Atlassian](https://bitbucket.org/atlassian/atlasboard/wiki/Package-Atlassian), [Package-red6](https://github.com/red6/atlasboard-red6-package)

## Available Widgets

### Sonarqube Treemap
Shows a treemap from a list of [Sonarqube](http://www.sonarqube.org)
resources using lines of code as the surface area and code coverage
as the color. 

![](screenshots/widget-sonarqube-treemap.png?raw=true)

#### Configuration
```JSON
"sonarqube-treemap": {
  "credentials": "sonar key in globalAuth.config",
  "interval": 60000,
  "resources": [
    "Project One", 
    "Project Two", 
    "Project Three", 
    "Project Four", 
    "Project Five"
  ],
  "url": "http://your-sonarqube-server:9000"
}
```
