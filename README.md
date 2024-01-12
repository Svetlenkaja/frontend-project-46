## Study project "Difference generator"

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Svetlenkaja/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Svetlenkaja/frontend-project-46/actions)
### My tests and linter status:
[![Actions Status](https://github.com/Svetlenkaja/frontend-project-46/actions/workflows/diff.yml/badge.svg)](https://github.com/Svetlenkaja/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/46b2fa90e524c35834ec/maintainability)](https://codeclimate.com/github/Svetlenkaja/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/46b2fa90e524c35834ec/test_coverage)](https://codeclimate.com/github/Svetlenkaja/frontend-project-46/test_coverage)

### Compares two configuration files and shows a difference.

The Utility supports the following file formats: JSON, YML, YAML.
You can format the difference in three styles: stylish (default), plain and json.

This package can use in two mode:
- run from cli
- install package as dependency and import code
```
import genDiff from '@hexlet/code';
```

### Setup

- clone the repository 

``` 
$ git clone <url>
```

- move to directory project 

```
$ cd frontend-project-46
```

- install the package and all its dependencies

```sh
$ make install
```

### Run in CLI

```
Usage: gendiff [options] <filepath1> <filepath2>
```

#### Options:

  -V, --version        output the version number

  -f, --format         output format (<'stylish'>, 'plain', 'json')

  -h, --help           display help for command


#### Examples:

```
gendiff file1.json file2.json
```

<a href ="https://asciinema.org/a/ddhDEpvprqQnhKbWHWzsoCLhb" target="_blank"><img src="https://asciinema.org/a/ddhDEpvprqQnhKbWHWzsoCLhb.svg"/></a>
```
gendiff file1.yml file2.yml
```
<a href ="https://asciinema.org/a/NMoKve3ZFxzvzwVvCxFacGIok" target="_blank"><img src="https://asciinema.org/a/NMoKve3ZFxzvzwVvCxFacGIok.svg"/></a>

```
gendiff './__fixtures__/file1.json' './__fixtures__/file2.json'
```
<a href ="https://asciinema.org/a/Z9TOZcncW0Thj4NkZx5MSaQS4" target="_blank"><img src="https://asciinema.org/a/Z9TOZcncW0Thj4NkZx5MSaQS4.svg"/></a>


```
gendiff -f plain './__fixtures__/file1.json' './__fixtures__/file2.json'
```

<a href ="https://asciinema.org/a/BKAM1vXJ5aEdYC80NDHFN8lFs" target="_blank"><img src="https://asciinema.org/a/BKAM1vXJ5aEdYC80NDHFN8lFs.svg"/></a>

```
gendiff --format json './__fixtures__/file1.json' './__fixtures__/file2.json'
```

<a href ="https://asciinema.org/a/PDDgrgOBFC8JFmbSb9ahNVCLd" target="_blank"><img src="https://asciinema.org/a/PDDgrgOBFC8JFmbSb9ahNVCLd.svg"/></a>


### License

ISC

**Free Software**