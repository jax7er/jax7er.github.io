---
layout: page
permalink: /snippets/
title: Snippets
---

# Introduction

This page provides a set of useful code snippets with examples. They are not intended to be rewrites of the documentation, instead they are more like mini recipes that can be used to cleanly or efficiently solve a specific problem or perform a single task.

## Contents

- [Python 3](#python3)
- [Jinja2](#jinja2)
- [HTML/JavaScript](#htmljs)

# Python 3

### Strip and replace all occurrences of any amount of white-space in a string

Use the `str.split` method with no arguments and pass the result to `str.join`

```python
replaced = delimiter.join(text.split())

# e.g.
# where: text = "\t\t  hello \r\n\t\t   world    \r\n"
#        delimiter = ", "
# replaced = "hello, world"
```

### Print iterable with non-string elements with custom separator

Unpack the iterable into the `print` function and use the `sep` keyword argument

```python
print(*things, sep=delimiter)
 
# e.g.
# where: things = [123, True, [], "hello"]
#        delimiter = "|"
# prints: 123|True|[]|hello
```

### Stringify iterable with non-string elements with custom separator

`map` iterable to the `str` constructor and pass to the `str.join` method

```python
stringified = delimiter.join(map(str, things))
 
# e.g.
# where: delimiter = "|"
#        things = [123, True, [], "hello"]
# stringified = "123|True|[]|hello"
```

### Read the header and data of a text file

`map` the `str.strip` method to each line and unpack the header and data

```python
with open(file_name) as file:
    header, *data = map(str.strip, file)
 
# e.g.
# where: ./test.csv -> "t,e,s,t\n1,2,3,4\n5,6,7,8"
#        file_name = "test.csv"
# header == "t,e,s,t"
# data == ["1,2,3,4", "5,6,7,8"]
```

### Transpose a matrix

Unpack the matrix into the arguments of `zip`

```python
transposed = zip(*matrix)
 
# e.g.
# where: matrix = [[1, 2, 3], [4, 5, 6]]
# list(transposed) == [(1, 4), (2, 5), (3, 6)]
```

### Find most and least common elements of an iterable

Use the `most_common` method of a `collections.Counter` object and tuple unpacking

```python
from collections import Counter
most, *_, least = Counter(iterable).most_common()
 
# e.g.
# where: iterable = "a b b c c c".split()
# most == ("c", 3)
# least == ("a", 1)
```

### Only execute an expensive function once in a list comprehension

Store the result of `f(x)` in a list and use a 2nd for loop

```python
ys = [y for x in iterable for y in [f(x)] if y]
 
# Python 3.8+, use the assignment operator
ys = [y for x in iterable if (y := f(x))]
 
# e.g.
# where: f = lambda x: x and str(x)
#        iterable = ["", -1, 0, 1, True, False]
# ys == ["-1", "1", "True"]
```

### Remove prefix or suffix from a string

Conditionally slice text if it starts/ends with prefix/suffix

> Python 3.9: use the `str` methods `removeprefix` and `removesuffix`

```python
no_prefix = text[len(pre):] if text.startswith(pre) else text[:]
no_suffix = text[:-len(suf)] if text.endswith(suf) else text[:]
 
# Python 3.9
no_prefix = text.removeprefix(pre)
no_suffix = text.removesuffix(suf)
 
# e.g.
# where: pre = "id_"
#        suf = ".txt"
#        text = "id_1.txt"
# no_prefix == "1.txt"
# no_suffix == "id_1"
```

### Merge 2 dictionaries, latter takes precedence

Unpack the dictionaries into a new dictionary in order

> Python 3.9: use the union operator

```python
merged = {**dict1, **dict2}
 
# Python 3.9
merged = dict1 | dict2
 
# e.g.
# where: dict1 = {"a": 1, "b": 2}
#        dict2 = {"b": 3, "c": 4}
# merged == {"a": 1, "b": 3, "c": 4}
```

### Print name and representation of a variable for debugging

Type the variable name and use the `!r` flag in the format string

> Python 3.8: use the `=` flag in the format string

```python
print(f"x={x!r}")
 
# Python 3.8
print(f"{x=}")
 
# e.g. 
# where: x = "test"
# prints: x='test'
```

### Convert ISO format date string into datetime.date object

`split` the date string, `map` to integers, unpack into the `datetime.date` constructor

> Python 3.7: use the `datetime.date.fromisoformat` method

```python
from datetime import date

date_obj = date(*map(int, date_str.split("-")))

# Python 3.7
date_obj = date.fromisoformat(date_str)
 
# e.g.
# where: date_str = "2020-11-12"
# date_obj == datetime.date(2020, 11, 12)
```

### Flatten list of lists with any number of elements

Unpack into the `itertools.chain` constructor

```python
from itertools import chain
flat = chain(*list_of_lists)
 
# e.g.
# where: list_of_lists = [[1], [2, 3], [4, 5, 6]]
# list(flat) == [1, 2, 3, 4, 5, 6]
```

### Interleave two lists with any number of elements

Create `zip_longest` object, unpack into `chain` constructor, `filter` `None` values

```python
from itertools import zip_longest, chain
interleaved = filter(None, chain(*zip_longest(list1, list2)))
 
# e.g.
# where: list1 = [1, 2, 3]
#        list2 = [4, 5, 6, 7, 8]
# list(interleaved) == [1, 4, 2, 5, 3, 6, 7, 8]
```

# Jinja2

### Join iterable of strings with line breaks

Use the `join` filter with a line break with the `safe` filter applied

{% raw %}
```jinja
{{ iterable|join("<br>"|safe) }}
 
<!-- e.g.
  where: iterable = [1, 2, 3]
  generates: 1<br>2<br>3
-->
```
{% endraw %}

<h1 id="htmljs">HTML+JavaScript</h1>

### Auto-redirect to another URL

Use `window.location.replace` which also removes current page from history

```html
<script>
    window.location.replace(url)
</script>
 
<!-- e.g.
  where: url = "/results"
  redirects to: .../results
-->
```
