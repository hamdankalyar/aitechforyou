import type { Article } from "@/lib/articles";

export const pythonBasicsArticles: Article[] = [
  {
    "slug": "python-basic-setup",
    "title": "Basic Setup",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 23, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "01",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          {
            "text": "In the folder first make the **env**",
            "code": "source venv/bin/activate"
          },
          {
            "text": "Activate the **env**",
            "code": "source venv/bin/activate"
          },
          "Make the **requirements.txt** file and put libraries in it",
          {
            "text": "Install the libraries by running this command",
            "code": "pip install -r requirements.txt"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-libraries",
    "title": "Libraries",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 23, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "02",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**ipykernel**: A library that provides a Jupyter kernel for Python, enabling interactive computing with notebooks.",
          "**numpy**: A fundamental library for numerical computing in Python, offering support for arrays, matrices, and various mathematical operations.",
          "**pandas**: A powerful data manipulation and analysis library for Python, offering data structures like DataFrames for tabular data.",
          "**matplotlib**: A plotting library for creating static, interactive, and animated visualizations in Python.",
          "**seaborn**: A data visualization library built on Matplotlib, providing an easy way to create informative and aesthetically pleasing statistical graphics.",
          "**flask**: A lightweight Python web framework for building web applications with minimal setup and complexity.",
          "**memory_profiler**: A Python module for monitoring memory usage during code execution, especially useful for optimization.",
          "**streamlit**: A Python library for building interactive, web-based data apps quickly and easily without extensive front-end development."
        ]
      }
    ]
  },
  {
    "slug": "python-important-to-note",
    "title": "Important to note",
    "excerpt": "",
    "topic": "Python",
    "date": "Dec 30, 2024",
    "readTime": "",
    "accent": "blue",
    "number": "03",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**No-Value**, None, or Null Value",
          "**Variables** types are objects under the hood",
          "Everthing inside the python is the **object**",
          "There is **complex numbers** in py x = 42j",
          {
            "text": "**String Formatting** (f formating)",
            "code": " name = \"Nina\"\ngreeting = f\"Hello, {name}\"\nprint(greeting)"
          },
          "If a function doesn’t have a **return statement**, it implicitly returns None."
        ]
      }
    ]
  },
  {
    "slug": "python-list",
    "title": "List",
    "excerpt": "",
    "topic": "Python",
    "date": "Dec 31, 2024",
    "readTime": "",
    "accent": "blue",
    "number": "04",
    "sections": [
      {
        "heading": "list (array)",
        "paragraphs": [
          {
            "text": "",
            "block": {
              "type": "table",
              "caption": "",
              "columns": [
                "type",
                "list"
              ],
              "rows": [
                [
                  "use",
                  "Used for storing similar items, and in cases where items need to be added or removed."
                ],
                [
                  "creation",
                  "[] or list() for empty list, or [1, 2, 3] for a list with items."
                ],
                [
                  "search methods",
                  "my_list.index(item) or item in my_list"
                ],
                [
                  "search speed",
                  "Searching in an item in a large list is slow. Each item must be checked."
                ],
                [
                  "common methods",
                  "len(my_list), append(item) to add, insert(index, item) to insert in the middle, pop() to remove."
                ],
                [
                  "order preserved?",
                  "Yes. Items can be accessed by index."
                ],
                [
                  "mutable?",
                  "Yes"
                ],
                [
                  "in-place sortable?",
                  "Yes. my_list.sort() will sort the list in-place. my_list.sort(reverse=True) will sort the list in-place in descending order. my_list.reverse() will reverse the items in my_list in-place."
                ]
              ]
            }
          }
        ]
      },
      {
        "heading": "Adding, Removing, Changing, and Finding Items in lists cheat sheet",
        "paragraphs": [
          {
            "text": "",
            "block": {
              "type": "table",
              "caption": "",
              "columns": [
                "action",
                "method",
                "returns",
                "possible errors"
              ],
              "rows": [
                [
                  "check length",
                  "len(my_list)",
                  "int",
                  ""
                ],
                [
                  "add: to the end",
                  "my_list.append(item)",
                  "-",
                  ""
                ],
                [
                  "insert: at position",
                  "my_list.insert(pos, item)",
                  "-",
                  ""
                ],
                [
                  "update: at position",
                  "my_list[pos] = item",
                  "- -",
                  "IndexError if pos is >= len(my_list)"
                ],
                [
                  "extend: add items from another list",
                  "my_list.extend(other_list)",
                  "-",
                  ""
                ],
                [
                  "is item in list?",
                  "item in my_list",
                  "True or False",
                  ""
                ],
                [
                  "index of item",
                  "my_list.index(item)",
                  "int",
                  "ValueError if item is not in my_list"
                ],
                [
                  "count of item",
                  "my_list.count(item)",
                  "int",
                  ""
                ],
                [
                  "remove an item",
                  "my_list.remove(item)",
                  "-",
                  "ValueError if item not in my_list"
                ],
                [
                  "remove the last item, or an item at an index",
                  "my_list.pop() or my_list.pop(pos)",
                  "item",
                  "IndexError if pos >= len(my_list)"
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "python-list-comprehensions",
    "parentSlug": "python-list",
    "title": "List comprehensions",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 02, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "05",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "List comprehensions are a unique way to create **lists** in Python.",
          "A **list comprehension** consists of brackets containing an expression followed by a for clause, then zero or more for or if clauses.",
          "The expressions can be any kind of **Python object**.",
          {
            "text": "List comprehensions will commonly take the form of [<value> for <vars> in <iter>].",
            "code": "names = [\"Nina\", \"Max\", \"Rose\", \"Jimmy\"]\nmy_list = [] # empty list\nfor name in names:\n    my_list.append(len(name))\nprint(my_list)\n[4, 3, 4, 5]"
          },
          {
            "text": "This above code will convert to below one",
            "code": "names = [\"Nina\", \"Max\", \"Rose\", \"Jimmy\"]\nmy_list = [len(name) for name in names]\nprint(my_list)\n[4, 3, 4, 5]"
          },
          {
            "text": "We can also use comprehensions to perform operations, and the **lists** we assemble can be composed of any type of Python object.",
            "code": "names = [\"Nina\", \"Max\", \"Rose\", \"Jimmy\"]\nmy_list = [(\"length\", len(name) * 2) for name in names]\nprint(my_list)"
          },
          "In the above example, we assemble a list of **tuples** - each tuple contains the element “length” as well as each number from the len() function multiplied by two."
        ]
      },
      {
        "heading": "Conditionals",
        "paragraphs": [
          "You can also use **conditionals** (if statements) in your list comprehensions.",
          {
            "text": "For example, to quickly make a list of only the even lengths, you could do:",
            "code": ">>> names = [\"Nina\", \"Max\", \"Rose\", \"Jimmy\"]\n>>> my_list = [len(name) for name in names if len(name) % 2 == 0]\n>>> print(my_list)\n[4, 4]"
          },
          "Here, we check divide every string length by 2, and check to see if the remainder is 0 (using the **modulo operator**)."
        ]
      },
      {
        "heading": "String Joining with a List Comprehension",
        "paragraphs": [
          "Back in our exercise on converting between types, we introduced the **string.join()** function.",
          "You can call this function on any string, pass it a list, and it will spit out a string with every element from the list “joined” by the string.",
          {
            "text": "For example, to get a comma-delimited list of numbers, you might be tempted to do:",
            "code": ">>> my_string = \",\".join([0, 1, 2, 3, 4])\nTraceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nTypeError: sequence item 0: expected str instance, int found"
          },
          "Unfortunately, you can’t join a list of numbers without first converting them to **strings**.",
          {
            "text": "But you can do this easily with a **list comprehension**:",
            "code": ">>> my_list = [0, 1, 2, 3, 4]\n>>> my_string = \",\".join([str(num) for num in my_list])\n>>> print(my_string)\n0,1,2,3,4"
          }
        ]
      },
      {
        "heading": "sum, min, max",
        "paragraphs": [
          "Some mathematical functions, such as **sum**, min, and max, accept lists of numbers to operate on.",
          {
            "text": "For example, to get the **sum** of numbers between zero and five, you could do:",
            "code": "my_sum = sum([0, 1, 2, 3, 4])\nprint(my_sum)"
          },
          "But remember, anywhere you can use a list, you can use a **list comprehension**.",
          "Say you want to get **sum**, minimum, and maximum of every number between 0 and 100 that is evenly divisible by 3?",
          {
            "text": "No sense typing out a whole list in advance, just use a comprehension:",
            "code": ">>> my_sum = sum([num for num in range(0, 100) if num % 3 == 0])\n>>> print(my_sum)\n1683\n>>> my_min = min([num for num in range(0, 100) if num % 3 == 0])\n>>> print(my_min)\n0\n>>> my_max = max([num for num in range(0, 100) if num % 3 == 0])\n>>> print(my_max)\n99"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-tuples",
    "title": "Tuples",
    "excerpt": "",
    "topic": "Python",
    "date": "Dec 31, 2024",
    "readTime": "",
    "accent": "blue",
    "number": "06",
    "sections": [
      {
        "heading": "tuple (constant array/list)",
        "paragraphs": [
          {
            "text": "",
            "block": {
              "type": "table",
              "caption": "",
              "columns": [
                "type",
                "tuple"
              ],
              "rows": [
                [
                  "use",
                  "Used for storing a snapshot of related items when we don’t plan on modifying, adding, or removing data."
                ],
                [
                  "creation",
                  "() or tuple() for empty tuple. (1, ) for one item, or (1, 2, 3) for a tuple with items."
                ],
                [
                  "search methods",
                  "my_tuple.index(item) or item in my_tuple"
                ],
                [
                  "search speed",
                  "Searching for an item in a large tuple is slow. Each item must be checked."
                ],
                [
                  "common methods",
                  "Can’t add or remove from tuples."
                ],
                [
                  "order preserved?",
                  "Yes. Items can be accessed by index."
                ],
                [
                  "mutable?",
                  "No"
                ],
                [
                  "in-place sortable?",
                  "No"
                ]
              ]
            }
          }
        ]
      },
      {
        "heading": "Uses",
        "paragraphs": [
          "A good use of a **tuple** might be for storing the information for a row in a spreadsheet.",
          "That data is information only.",
          "We don’t necessarily care about updating or manipulating that data.",
          "We just want a **read-only snapshot**.",
          "**Tuples** are an interesting and powerful datatype, and one of the more unique aspects of Python.",
          "Most other programming languages have ways of representing **lists** and dictionaries, but only a small subset contain tuples.",
          "Use them to your advantage."
        ]
      }
    ]
  },
  {
    "slug": "python-sets",
    "title": "Sets",
    "excerpt": "",
    "topic": "Python",
    "date": "Dec 31, 2024",
    "readTime": "",
    "accent": "blue",
    "number": "07",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**Sets** are a datatype that allows you to store other immutable types in an unsorted way.",
          "An item can only be contained in a **set** once.",
          "There are no **duplicates** allowed.",
          "The benefits of a **set** are: very fast membership testing along with being able to use powerful set operations, like union, difference, and intersection."
        ]
      },
      {
        "heading": "cheat sheet",
        "paragraphs": [
          {
            "text": "",
            "block": {
              "type": "table",
              "caption": "",
              "columns": [
                "type",
                "set"
              ],
              "rows": [
                [
                  "use",
                  "Used for storing immutable data types uniquely. Easy to compare the items in sets."
                ],
                [
                  "creation",
                  "set() for an empty set ({} makes an empty dict) and {1, 2, 3} for a set with items in it"
                ],
                [
                  "search methods",
                  "item in my_set"
                ],
                [
                  "search speed",
                  "Searching for an item in a large set is very fast."
                ],
                [
                  "common methods",
                  "my_set.add(item), my_set.discard(item) to remove the item if it’s present, my_set.update(other_set)"
                ],
                [
                  "order preserved?",
                  "No. Items can’t be accessed by index."
                ],
                [
                  "mutable?",
                  "Yes. Can add to or remove from sets."
                ],
                [
                  "in-place sortable?",
                  "No, because items aren’t ordered."
                ]
              ]
            }
          }
        ]
      },
      {
        "heading": "Empty sets",
        "paragraphs": [
          "Let’s create our first few sets.",
          "The first thing we might try to do is create an empty **set** with {}, but we’ll come across a hurdle."
        ]
      }
    ]
  },
  {
    "slug": "python-dictionaries",
    "title": "Dictionaries",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 01, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "08",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**Dictionaries** are a useful type that allow us to store our data in key, value pairs.",
          "**Dictionaries** themselves are mutable, but, dictionary keys can only be immutable types.",
          "We use **dictionaries** when we want to be able to quickly access additional data associated with a particular key.",
          "A great practical application for **dictionaries** is memoization.",
          "Let’s say you want to save computing power, and store the result for a function called with particular **arguments**.",
          "The **arguments** could be the key, with the result stored as the value.",
          "Next time someone calls your function, you can check your **dictionary** to see if the answer is pre-computed.",
          "Looking for a **key** in a large dictionary is extremely fast.",
          "Unlike **lists**, we don’t have to check every item for a match."
        ]
      },
      {
        "heading": "dictionary cheat sheet",
        "paragraphs": [
          {
            "text": "",
            "block": {
              "type": "table",
              "caption": "",
              "columns": [
                "type",
                "dict"
              ],
              "rows": [
                [
                  "use",
                  "Use for storing data in key, value pairs. Keys used must be immutable data types."
                ],
                [
                  "creation",
                  "{} or dict() for an empty dict. {1: \"one\", 2: \"two\"} for a dict with items."
                ],
                [
                  "search methods",
                  "key in my_dict"
                ],
                [
                  "search speed",
                  "Searching for a key in a large dictionary is fast."
                ],
                [
                  "common methods",
                  "my_dict[key] to get the value by key, and throw a KeyError if key is not in the dictionary. Use my_dict.get(key) to fail silently if key is not in my_dict. my_dict.items() for all key, value pairs, my_dict.keys() for all keys, and my_dict.values() for all values."
                ],
                [
                  "order preserved?",
                  "Sort of. As of Python 3.6 a dict is sorted by insertion order. Items can’t be accessed by index, only by key."
                ],
                [
                  "mutable?",
                  "Yes. Can add or remove keys from dicts."
                ],
                [
                  "in-place sortable?",
                  "No. dicts don’t have an index, only keys."
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "python-dictionary-comprehensions",
    "parentSlug": "python-dictionaries",
    "title": "Dictionary Comprehensions",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 09, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "09",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**Dictionary comprehensions** are a quick and easy way of assembling dictionaries in Python.",
          "They work just like **list comprehensions**, and look almost the same.",
          "They use **curly braces** instead of square brackets, and they contain two variables (for key and value), separated by a colon.",
          {
            "text": "For example, to assemble a dict in which the keys are numbers between 0 and 10, and the values are the same number squared, we could do:",
            "code": ">>> squares = {num:num * num for num in range(10)}\n>>> print(squares)\n{0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81}"
          },
          {
            "text": "Or we could use **f-strings** to assemble a dict to keep game scores:",
            "code": ">>> scores = {f\"player-{num}\":0 for num in range(0, 5)}\n>>> print(scores)\n{'player-0': 0, 'player-1': 0, 'player-2': 0, 'player-3': 0, 'player-4': 0}"
          },
          "In the above example, the **f-string** gets turned into the dict keys (player-0, etc.) and each value is set to 0.",
          "You can also operate on **tuples** for setting keys and values.",
          {
            "text": "For example, we’ll use a **list comprehension** to create a list of tuples, then turn the tuples into dict keys and values:",
            "code": ">>> my_list = [(f\"player-{num}\", num * 2) for num in range(0, 5)]\n>>> print(my_list)\n[('player-0', 0), ('player-1', 2), ('player-2', 4), ('player-3', 6), ('player-4', 8)]\n>>> scores = {key:value for (key, value) in my_list}\n>>> print(scores)\n{'player-0': 0, 'player-1': 2, 'player-2': 4, 'player-3': 6, 'player-4': 8}"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-boolean",
    "title": "Boolean",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 01, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "10",
    "sections": [
      {
        "heading": "Truthiness",
        "paragraphs": [
          "Evaluating expression to be **True** or False will help us control the flow of our program."
        ]
      },
      {
        "heading": "cheat sheet",
        "paragraphs": [
          {
            "text": "",
            "block": {
              "type": "table",
              "caption": "",
              "columns": [
                "type",
                "truthiness",
                ""
              ],
              "rows": [
                [
                  "int",
                  "0 is False, all other numbers are True (including negative)",
                  ""
                ],
                [
                  "containers - list, tuple, set, dict",
                  "empty container evaluates to False, container with items evaluates to True)",
                  ""
                ],
                [
                  "None",
                  "False",
                  ""
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "python-equality-vs-identity",
    "title": "Equality vs Identity",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 01, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "11",
    "sections": [
      {
        "heading": "Equality Cheat Sheet",
        "paragraphs": [
          {
            "text": "",
            "block": {
              "type": "table",
              "caption": "",
              "columns": [
                "Operator",
                "Means"
              ],
              "rows": [
                [
                  "==",
                  "equals"
                ],
                [
                  "!=",
                  "not-equals"
                ]
              ]
            }
          },
          "The **equality operators** val1 == val2 (val1 equals val2) and val1 != val2 (val1 doesn’t equal val2) compare the contents of two different values and return a boolean.",
          {
            "text": "**Equality** works like you’d expect it to for simple data types.",
            "code": ">>> a = 1\n>>> b = 1\n>>> a == b\nTrue\n>>> a != b\nFalse\n\n>>> a = \"Nina\"\n>>> b = \"Nina\"\n>>> a == b\nTrue\n>>> a != b\nFalse"
          },
          "**Equality** for container types is interesting.",
          "Even though a and b are two different **lists**, their contents are still the same.",
          {
            "text": "So compared two **lists** containing the same values with == will return True.",
            "code": ">>> a = [1, 2, 3]\n>>> b = [1, 2, 3]\n>>> a == b\nTrue\n>>> a != b\nFalse"
          }
        ]
      },
      {
        "heading": "Identity Cheat Sheet",
        "paragraphs": [
          {
            "text": "",
            "block": {
              "type": "table",
              "caption": "",
              "columns": [
                "Operator",
                "Means"
              ],
              "rows": [
                [
                  "is",
                  "is the same object in memory? (not equality!)"
                ],
                [
                  "is not",
                  "is not the same object in memory? (not equality!)"
                ]
              ]
            }
          },
          "This is something that trips up Python beginners, so make sure you remember that equality (**==**, !=) is not the same as identity (is, not is).",
          "The is keywords tests if the two compared **objects** are stored in the same memory location.",
          {
            "text": "I won’t go into too much detail into why, but remember not to use is when what you actually want to check for is equality.",
            "code": ">>> a = [1, 2, 3]\n>>> b = [1, 2, 3]\n\n>>> a == b  # Testing for equality. a and b contain the same values\nTrue\n>>> a is b  # Testing for identity. a and b are NOT the same object.\nFalse"
          },
          {
            "text": "When you’re first starting out, the only place you’ll want to use the is keyword is to explicitly compare a value to the built-in types of **None**, True, or False.",
            "code": ">>> a = True\n>>> a is True\nTrue\n\n>>> b = False\n>>> b is False\nTrue\n>>> b is not True   # Opposite of is b True. aka is b False?\nTrue\n\n>>> c = None\n>>> c is None\nTrue\n>>> c is not None\nFalse"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-loop",
    "title": "loop",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 01, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "12",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          {
            "text": "",
            "code": "colors = [\"Red\", \"Green\", \"Blue\", \"Orange\"]\nfor color in colors:\n    print(f\"The color is: {color}\")\nThe color is: Red\nThe color is: Green\nThe color is: Blue\nThe color is: Orange"
          },
          "this is **loop** in python"
        ]
      },
      {
        "heading": "Looping over a dictionary",
        "paragraphs": [
          "Remember, a **dictionary** is composed of key, value pairs.",
          "When we **loop** over a dictionary with the for item in my_dict syntax, we’ll end up looping over just the keys.",
          {
            "text": "We can use **tuple unpacking** along with the my_dict.items() list to loop over both the keys and the values at the same time.",
            "code": ">>> for color, hex_value in hex_colors.items():\n...    print(f\"For color {color}, the hex value is: {hex_value}\")\n\nFor color Red, the hex value is: #FF0000\nFor color Green, the hex value is: #008000\n\nFor color Blue, the hex value is: #0000FF"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-range",
    "parentSlug": "python-loop",
    "title": "Range()",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 01, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "13",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "The **range function** in python produces a sequence of integers from an optional and inclusive start, to a defined and exclusive finish.",
          "**range()** can be called with start and stop parameters, range(1,4) where stop is exclusive",
          "You can also pass an a third optional **step parameter** in.",
          "Let’s say I quickly wanted to print out all the **even numbers** from 2 to 10.",
          {
            "text": "I would call **range(2, 11, 2)**.",
            "code": "for num in range(2, 11, 2):\n    print(f\"The number is: {num}\")\nThe number is: 2\nThe number is: 4\nThe number is: 6\nThe number is: 8\nThe number is: 10"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-enumerate",
    "parentSlug": "python-loop",
    "title": "enumerate()",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 01, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "14",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "The function takes a **sequence**, like a list, and it returns a list of tuples, containing the index of the item in the sequence, and the sequence itself.",
          {
            "text": "Because **enumerate()** returns a structure that looks like a list of tuples under the hood, we can take advantage of tuple unpacking in the for loop.",
            "code": "for index, item in enumerate(colors):\n    print(f\"Item: {item} is at index: {index}.\")"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-if-else",
    "title": "If - else",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 01, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "15",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          {
            "text": "",
            "code": "a = 5\nif a > 10:\n    print(\"Greater than 10\")\nelif a < 10:\n    print(\"Less than 10\")\nelif a < 20:\n    print(\"Less than 20\")\nelse:\n    print(\"Dunno\")"
          }
        ]
      }
    ]
  }
];
