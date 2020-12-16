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

## Clean file/folder picker

Create a context manager to wrap the creation and destruction of a GUI window so that it neither appears when a dialog box is opened nor stops the main script from finishing by running in the background after the dialog is closed

```python
from contextlib import contextmanager
from tkinter import Tk, filedialog

@contextmanager
def dialog():
    try:
        tk = Tk()
        tk.withdraw()  # hide main window

        yield filedialog
    finally:
        tk.destroy()  # close main window
```

### Example

```python
>>> with dialog() as d:
...     folder = d.askdirectory()
...
```

## Strip and replace all white-space in a string

Use the `str.split` method with no arguments and pass the result to `str.join`

```python
replaced = delimiter.join(text.split())
```

### Example

```python
>>> ", ".join("\t  hello \r\n\t   world  \r\n".split())
"hello, world"
```

## Print any iterable with custom separator

Unpack the iterable into the `print` function and use the `sep` keyword argument

```python
print(*things, sep=delimiter)
```

### Example

```python
>>> print(*[123, True, [], "hello"], sep="|")
123|True|[]|hello
```

## Stringify any iterable with custom separator

`map` iterable to the `str` constructor and pass to the `str.join` method

```python
stringified = delimiter.join(map(str, things))
```

### Example

```python
>>> "|".join(map(str, [123, True, [], "hello"]))
'123|True|[]|hello'
```

## Read the header and data of a text file

`map` the `str.strip` method to each line and unpack the header and data

```python
with open(file_name) as file:
    header, *data = map(str.strip, file)
```

### Example

```python
>>> with open("test.csv", "w") as file:
...     file.write("t,e,s,t\n1,2,3,4\n5,6,7,8\n")
...

>>> with open("test.csv") as file:
...     header, *data = map(str.strip, file)
...

>>> header, data
('t,e,s,t', ['1,2,3,4', '5,6,7,8'])
```

## Transpose a matrix

Unpack the matrix into the arguments of `zip`

```python
transposed = zip(*matrix)
```

### Example

```python
>>> list(zip([(1, 2, 3), (4, 5, 6)]))
[(1, 4), (2, 5), (3, 6)]
```

## Find most and least common elements of an iterable

Use the `most_common` method of a `collections.Counter` object and tuple unpacking

```python
from collections import Counter

most, *_, least = Counter(iterable).most_common()
```

### Example

```python
>>> most, *_, least = Counter("abbccc").most_common()

>>> most, least 
(('c', 3), ('a', 1))
```

## Execute a function once in a list comprehension

Store the result of `f(x)` in a list and use a 2nd for loop

> Python 3.8+: use the assignment operator `:=`

```python
ys = [y for x in iterable for y in [f(x)] if y]
 
# Python 3.8+
ys = [y for x in iterable if (y := f(x))]
```

### Example

```python
>>> def f(x):
...     return x > 5
...

>>> [y for x in range(10) for y in [f(x)] if y]
[6, 7, 8, 9]

>>> # Python 3.8+
... [y for x in range(10) if (y := f(x))]
[6, 7, 8, 9]
```

## Remove prefix or suffix from a string

Conditionally slice text if it starts/ends with prefix/suffix

> Python 3.9+: use the `str` methods `removeprefix` and `removesuffix`

```python
no_prefix = text[len(pre) if text.startswith(pre) else None:]
no_suffix = text[:-len(suf) if text.endswith(suf) else None]
 
# Python 3.9+
no_prefix = text.removeprefix(pre)
no_suffix = text.removesuffix(suf)
```

### Example

```python
>>> text = "id_1.txt"
>>> pre, suf = "id_", ".txt"

>>> text[len(pre) if text.startswith(pre) else None:]
'1.txt'
>>> text[:-len(suf) if text.endswith(suf) else None]
'id_1'

>>> # Python 3.9+
... text.removeprefix(pre)
'1.txt'
... text.removesuffix(suf))
'id_1'
```

## Merge 2 dictionaries, latter takes precedence

Unpack the dictionaries into a new dictionary in order

> Python 3.9+: use the union operator

```python
merged = {**dict1, **dict2}
 
# Python 3.9+
merged = dict1 | dict2
```

### Example

```python
>>> {**dict(a=1, b=2), **dict(b=3, d=4)}
{"a": 1, "b": 3, "c": 4}

>>> # Python 3.9+
... dict(a=1, b=2) | dict(b=3, d=4)
{"a": 1, "b": 3, "c": 4}
```

## Print name and `repr` of a variable for debugging

Type the variable name and use the `!r` flag in the format string

> Python 3.8+: use the `=` flag in the format string

```python
print(f"x={x!r}")
 
# Python 3.8+
print(f"{x=}")
```

### Example 

```python
>>> x = "test"
>>> print(f"x={x!r}")
x='test'

>>> # Python 3.8+
... print(f"{x=}")
x='test'
```

## Convert ISO date string into `datetime.datetime`

`split` the date string, `map` to integers, unpack into the `datetime.datetime` constructor. Also works for `datetime.date`

> Python 3.7+: use the `datetime.date.fromisoformat` method

```python
from datetime import datetime

date_obj = datetime(*map(int, date_str.split("-")))

# Python 3.7+
date_obj = datetime.fromisoformat(date_str)
```

### Example

```python
>>> datetime(*map(int, "2020-12-25".split("-")))
datetime.datetime(2020, 12, 25, 0, 0)

>>> # Python 3.7+
... datetime.fromisoformat("2020-12-25")
datetime.datetime(2020, 12, 25, 0, 0)
```

## Flatten iterable of iterables
Unpack into the `itertools.chain` constructor

```python
from itertools import chain

flat = chain(*it_of_its)
```

### Example

```python
>>> list(chain(*[(0, 1), (2, 3, 4), (5, 6, 7, 8)]))
[0, 1, 2, 3, 4, 5, 6, 7, 8]
```

## Interleave iterables with any number of elements

Create a unique object representing a missing value, unpack the iterables into the `itertools.zip_longest` constructor specifying the `fillvalue` argument, unpack into the `itertools.chain` constructor, and filter the values with an address equal to that of the missing value

```python
from itertools import zip_longest, chain

MISSING = object()

interleaved = (
    x for x in chain(*zip_longest(*its, fillvalue=MISSING))
    if x is not MISSING
)
```

### Example

```python
>>> its = ((1, 2, 3), (4,), (5, 6, 7, 8), (9, 10))

>>> list(
...     x for x in chain(*zip_longest(*its, fillvalue=MISSING))
...     if x is not MISSING
... )
[1, 4, 5, 9, 2, 6, 10, 3, 7, 8]
```

# Jinja2

## Join iterable of strings with line breaks

Use the `join` filter with a line break with the `safe` filter applied

{% raw %}
```jinja
{{ iterable|join("<br>"|safe) }}
```
{% endraw %}

### Example

{% raw %}
```jinja
{{ [1, 2, 3]|join("<br>"|safe) }}

<!-- HTML output -->
1<br>2<br>3
```
{% endraw %}

<h1 id="htmljs">HTML+JavaScript</h1>

## Auto-redirect to another URL

Use `window.location.replace` which also removes current page from history

```html
<script>
    window.location.replace(url)
</script>
```

### Example

```html
<script>
    window.location.replace("jax7er.github.io")
</script>

<!-- Redirects to -->
jax7er.github.io
```
