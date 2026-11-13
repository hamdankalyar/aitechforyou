import type { Article } from "@/lib/articles";

export const pythonAdvancedArticles: Article[] = [
  {
    "slug": "python-main-method",
    "title": "Main method",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 02, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "16",
    "sections": [
      {
        "heading": "The main Method",
        "paragraphs": [
          "Once you start writing more comprehensive **Python** programs, you’ll want to include a main method in your code.",
          "The purpose of checking for the **main method** is to make sure that the code in your main method is only run when it’s executed as a stand-alone program.",
          "Because of how **Python**’s import system works, if someone else imports your Python program, any code in it is executed on import.",
          "We’ll talk more about imports and modules on day two, but let’s look at a quick example.",
          {
            "text": "Let’s say we had a **Python** file named name_lib.py",
            "code": "def name_length(name):\n    return len(name)\n\ndef upper_case_name(name):\n    return name.upper()\n\ndef lower_case_name(name):\n    return name.lower()\n\nname = \"Nina\"\nlength = name_length(name)\nupper_case = upper_case_name(name)\n\nprint(f\"The length is {length} and the uppercase version is: {upper_case}\")"
          },
          {
            "text": "If we ran this code, we’d see exactly what we expect.",
            "code": "(env) $ python name_lib.py\nname_lib.py\nThe length is 4 and the uppercase version is: NINA"
          }
        ]
      },
      {
        "heading": "Writing Reusable Code",
        "paragraphs": [
          "We went through all this trouble of writing a useful name library.",
          "What if someone else wanted to use our library in their own code by importing it?",
          {
            "text": "Let’s say someone else wrote their own program, in other_program.py",
            "code": "import name_lib\n\nmy_name = \"Fred\"\n\nmy_length = name_lib.name_length(my_name)\nmy_lower_case = name_lib.lower_case_name(my_name)\n\nprint(f\"In my code, my length is {my_length} and my lower case name is: {my_lower_case}\")"
          },
          {
            "text": "If we ran this, we’d see the following result:",
            "code": "(env) $ python other_program.py\n\nThe length is 4 and the uppercase version is: NINA\nIn my code, my length is 4 and my lower case name is: fred"
          },
          "If I’m Fred, I just wanted to use this cool library.",
          "But all of a sudden, I’m seeing information about Nina!",
          "To prevent this from happening, we want to write a conditional that will only run our code if we’re the ones running the program directly.",
          "To do that, we’ll need to check if **__name__** == __main__.",
          "Let’s unwrap that.",
          "**__name__** is a special variable that’s set by Python that tells it where it was called from.",
          "We can tell it’s a special variable because it starts and ends with __.",
          "That’s a hint that you don’t want to change the value of this variable, or it could adversely affect the execution of your **Python** program.",
          "In **Python**, __ is also called double underscore, or dunder.",
          {
            "text": "Let’s comment out our original print, and add the following line to the end of name_lib.py:",
            "code": "# Note: add to the bottom of name_lib.py\n\n# print(f\"The length is {length} and the uppercase version is: {upper_case}\")\nprint(f\"The value of __name__ is: {__name__}\")"
          },
          "Now, let’s run name_lib.py again.",
          {
            "text": "We should see:",
            "code": "(env) $ python name_lib.py\nThe value of __name__ is: __main__"
          },
          "We’re getting somewhere.",
          "When we run this file directly, we’ll see that **__name__** has the value of __main__.",
          {
            "text": "What if we run our other program again?",
            "code": "(env) $ python other_program.py\nThe value of __name__ is: name_lib"
          },
          "When we “run” our library by importing it, we’ll see that it’s **__name__** is set to the name of the file that it’s in, minus the .py extension.",
          "In this case, **__name__** is set to name_lib."
        ]
      },
      {
        "heading": "Putting Code in a main Conditional",
        "paragraphs": [
          "To avoid running our code when it’s imported by other modules, we put it in a conditional statement, and explicitly check if **__name__** == \"__main__\".",
          {
            "text": "Let’s update name_lib.py, and put our own code inside of the conditional check.",
            "code": "def name_length(name):\n    return len(name)\n\ndef upper_case_name(name):\n    return name.upper()\n\ndef lower_case_name(name):\n    return name.lower()\n\nif __name__ == \"__main__\":\n    name = \"Nina\"\n    length = name_length(name)\n    upper_case = upper_case_name(name)\n\n    print(f\"The length is {length} and the uppercase version is: {upper_case}\")"
          },
          {
            "text": "Now, if we run other_program.py, we’ll see:",
            "code": "(env) $ python other_program.py\nIn my code, my length is 4 and my lower case name is: fred"
          },
          "Much better!",
          "Using a **main method** is a common pattern that you’ll see in Python programs, and it comes in handy for being able to write programs that work both on their own and when imported into other programs."
        ]
      }
    ]
  },
  {
    "slug": "python-string-split",
    "title": "String split",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 09, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "17",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "the **split()** method in Python is used to divide a string into a list of substrings based on a specified delimiter.",
          "If no **delimiter** is provided, it defaults to splitting on any whitespace (spaces, tabs, or newlines).",
          "Here’s how it works:"
        ]
      },
      {
        "heading": "Basic Usage",
        "paragraphs": [
          {
            "text": "",
            "code": "text = \"hello world\"\nresult = text.split()  # Splits by whitespace\nprint(result)\n "
          },
          {
            "text": "Output:",
            "code": "['hello', 'world']\n "
          }
        ]
      },
      {
        "heading": "Using a Custom Delimiter",
        "paragraphs": [
          {
            "text": "You can specify a **delimiter** to split the string:",
            "code": "text = \"apple,banana,grape\"\nresult = text.split(\",\")  # Splits by comma\nprint(result)\n "
          },
          {
            "text": "Output:",
            "code": "['apple', 'banana', 'grape']\n "
          }
        ]
      },
      {
        "heading": "Without a Delimiter",
        "paragraphs": [
          {
            "text": "If there’s no **delimiter** in the string or the delimiter is not found, the entire string becomes a single element in the list:",
            "code": "text = \"helloworld\"\nresult = text.split(\",\")  # No comma in the string\nprint(result)\n "
          },
          {
            "text": "Output:",
            "code": "['helloworld']\n "
          }
        ]
      },
      {
        "heading": "Splitting into Characters",
        "paragraphs": [
          "If you want to split the string into individual characters, you don’t use split.",
          {
            "text": "Instead, you can use **list()** or a comprehension:",
            "code": "text = \"hello\"\nresult = list(text)  # Converts into a list of characters\nprint(result)\n "
          },
          {
            "text": "Output:",
            "code": "['h', 'e', 'l', 'l', 'o']"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-string-join",
    "title": "String join",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 09, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "18",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "The **join()** method in Python is used to combine the elements of a list (or any iterable) into a single string, with a specified delimiter placed between each element."
        ]
      },
      {
        "heading": "Basic Usage",
        "paragraphs": [
          {
            "text": "The syntax is:",
            "code": "delimiter.join(iterable)\n "
          },
          "**delimiter**: The string that will be placed between each element (e.g., space, comma, etc.).",
          "**iterable**: The list (or other iterable, like a tuple) whose elements will be joined."
        ]
      },
      {
        "heading": "Example 1: Joining a List with a Space",
        "paragraphs": [
          {
            "text": "",
            "code": "words = ['hello', 'world']\nresult = \" \".join(words)  # Joins with a space\nprint(result)\n "
          },
          {
            "text": "Output:",
            "code": "hello world\n "
          }
        ]
      },
      {
        "heading": "Example 2: Joining with a Custom Delimiter",
        "paragraphs": [
          {
            "text": "",
            "code": "fruits = ['apple', 'banana', 'grape']\nresult = \", \".join(fruits)  # Joins with a comma and space\nprint(result)\n "
          },
          {
            "text": "Output:",
            "code": "apple, banana, grape\n "
          }
        ]
      },
      {
        "heading": "Example 3: Joining Characters into a String",
        "paragraphs": [
          {
            "text": "If you have a list of characters, you can use **join()** to combine them into a single string:",
            "code": "chars = ['h', 'e', 'l', 'l', 'o']\nresult = \"\".join(chars)  # Joins with no space (empty string as delimiter)\nprint(result)\n "
          },
          {
            "text": "Output:",
            "code": "hello\n "
          }
        ]
      },
      {
        "heading": "Example 4: Joining with No Separator",
        "paragraphs": [
          {
            "text": "You can also use an empty string (\"\") as the **delimiter** to combine elements without any separator:",
            "code": "numbers = ['1', '2', '3']\nresult = \"\".join(numbers)\nprint(result)\n "
          },
          {
            "text": "Output:",
            "code": "123\n "
          }
        ]
      },
      {
        "heading": "Important Notes:",
        "paragraphs": [
          "All elements in the list (or **iterable**) must be strings.",
          "If they are not, you'll get a **TypeError**.",
          {
            "text": "To fix this, you can convert non-string elements to strings first:",
            "code": "items = [1, 2, 3]\nresult = \"-\".join(map(str, items))  # Convert integers to strings\nprint(result)\n "
          },
          {
            "text": "Output:",
            "code": "1-2-3\n "
          },
          "The **join()** method does not modify the original list; it creates and returns a new string."
        ]
      }
    ]
  },
  {
    "slug": "python-generator-expression",
    "title": "Generator expression",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 09, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "19",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**Generator expressions** are a little more advanced.",
          "A generator is a type of **iterable** object - like a list, you can iterate through each element - however, unlike a list, generators evaluate elements on demand, instead of assembling them all at once.",
          "A **generator comprehension** looks just like a list comprehension, except we use parenthesis instead of brackets.",
          {
            "text": "For example, to get a list of the square of every even number between 0 and 10, we could do:",
            "code": "# List comprehension\n>>> list_comp = [x ** 2 for x in range(10) if x % 2 == 0]\n\n>>> print(list_comp)\n[0, 4, 16, 36, 64]\n\n# Generator expression\n\n>>> gen_exp = (x ** 2 for x in range(10) if x % 2 == 0)\n\n>>> print(gen_exp)\n<generator object <genexpr> at 0x10d48cc00>\n\n>>> for num in gen_exp:\n...    print(num)\n...\n0\n4\n16\n36\n64"
          },
          "**Generator comprehensions** can be beneficial in circumstances where you want to iterate over very large lists without storing the entire list in memory.",
          "For example, if you tried to assemble a list of every number between 0 and 10 ** 8 (10 to the 8th power), Python will try to assemble the entire list in memory.",
          {
            "text": "Using the timeit library to create this list only once, we can see how long this takes:",
            "code": ">>> list_comp = \"[num for num in range(0, 10 ** 8)]\"\n>>> import timeit\n>>> timeit.timeit(list_comp, number=1)\n7.578090285999998\n# Over 7 seconds just to assemble one huge list\n# Let's do the same with a generator comprehension instead:\n>>> gen_comp = \"(num for num in range(0, 10 ** 8))\"\n>>> timeit.timeit(gen_comp, number=1)\n9.919999996554907e-06\n>>> timeit.timeit(gen_comp, number=10000000)\n7.211805443999992"
          },
          "As you can see, assembling the generator is almost instantaneous, in fact we can run the **generator expression** over 10 million times in less time than it takes to assemble the full list once, and the generator will take far less memory."
        ]
      }
    ]
  },
  {
    "slug": "python-slicing",
    "title": "Slicing",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 15, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "20",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**Slicing** is a easy way to create sub-lists from larger lists.",
          "Remember that a string is just a list of characters.",
          {
            "text": "For example:",
            "code": ">>> my_string = \"Hello, world!\"\n\n>>> my_string[7:12] # from 7 to 12\n'world'"
          }
        ]
      },
      {
        "heading": "Lopsided Slicing",
        "paragraphs": [
          "You can also leave out one of the numbers in the **slice**.",
          "Leaving out the first number is equivalent to using a zero - you can think of this as “from the beginning.”",
          "Leaving out the last number is equivalent to using the length of the list you’re **slicing** - you can think of this as “until the end.”",
          {
            "text": "For example:",
            "code": ">>> my_string = \"Hello, world!\"\n\n>>> my_string[:5] # from zero to 5\n'Hello'\n\n>>> my_string[7:] # from 7 to the end\n'world!'"
          },
          "You can also leave out both sides of the **slice**!",
          "You can think of this as “from the beginning, until the end.” Why?",
          {
            "text": "This is an easy way to copy a list!",
            "code": ">>> my_new_string = my_string[:]\n>>> my_new_string\n'Hello, world!'"
          }
        ]
      },
      {
        "heading": "Negative Indexing",
        "paragraphs": [
          "A **negative number** on the left side will wrap around to the other side of your list.",
          "A **negative number** on the right side is equivalent to the length of the list minus your number.",
          {
            "text": "For example:",
            "code": ">>> my_string = \"Hello, world!\"\n\n>>> my_string[-6:] # from the end - 6 to the end\n'world!'\n\n>>> my_string[-10:-4] # from the end - 10 to the end - 4\n'lo, wo'"
          },
          "You can also use just a single **negative number** to get an item counting backwards from the end of a list.",
          {
            "text": "For example, to get the last item from a list:",
            "code": ">>> my_list = [1, 3, 3, 7]\n\n>>> my_list[-1]\n\n>>> 7"
          }
        ]
      },
      {
        "heading": "Stride or Step",
        "paragraphs": [
          "**Python** slices also have a third, optional argument, called “step” or “stride”, separated by a second colon.",
          "This lets you skip elements of a list or even reverse them.",
          {
            "text": "For example:",
            "code": ">>> my_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n>>> my_list[::2] # move forward by 2, or skip every other index\n[0, 2, 4, 6, 8]\n\n>>> my_list[::-1] # move backward by 1, and easy way to reverse a list\n[9, 8, 7, 6, 5, 4, 3, 2, 1,0]\n>>> my_list[1:7:2] # get every other index between 1 and 7\n[1, 3, 5]"
          },
          "You can use a **slice** to get a subset of items from any data type that maintains an order, such as a list or tuple, but not from any non-ordered data types, such as dict or set."
        ]
      }
    ]
  },
  {
    "slug": "python-zip-function",
    "title": "zip function",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 15, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "21",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "It’s often necessary to iterate over multiple lists simultaneously.",
          {
            "text": "Suppose we’re keeping score of a game and we have two lists, one for names and one for scores:",
            "code": ">>> names = [\"Bob\", \"Alice\", \"Eve\"]\n\n>>> scores = [42, 97, 68]"
          },
          {
            "text": "The **zip function** takes any number of iterable arguments and steps through all of them at the same time until the end of the shortest iterable has been reached:",
            "code": ">>> for name, score in zip(names, scores):\n\n>>>    print(f\"{name} had a score of {score}.\")\n\n...\nBob had a score of 42.\n\nAlice had a score of 97.\n\nEve had a score of 68."
          },
          {
            "text": "What will the above loop print after removing the last element from scores?",
            "code": ">>> scores.pop(-1)\n\n68\n\n>>> for name, score in zip(names, scores):\n\n>>>    print(f\"{name} had a score of {score}.\")\n\n...\nBob had a score of 42.\nAlice had a score of 97."
          },
          "The loop terminates even though there are more values in names.",
          "Here, Eve isn’t included because scores only has two elements.",
          "We can also use **zip()** to quickly and easily create a dict from two lists.",
          {
            "text": "For example:",
            "code": ">>> scores = [42, 97, 68]\n\n>>> score_dict = dict(zip(names, scores))\n\n>>> print(score_dict)\n\n{'Bob': 42, 'Alice': 97, 'Eve': 68}"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-oop",
    "title": "OOP",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 17, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "22",
    "sections": []
  },
  {
    "slug": "python-classes",
    "parentSlug": "python-oop",
    "title": "Classes",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 17, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "23",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "Every thing or object in **Python** is an instance of a class.",
          "The number 42 is an **instance** of the class int.",
          "The string Hello, world is an **instance** of the str (or string) class.",
          "These **classes**, in turn, are subclasses of the master object class.",
          "It seems you found the concept of **classes** and instances in Python confusing.",
          "Let me break it down **step** by step and explain each part clearly:"
        ]
      },
      {
        "heading": "1. What is a Class?",
        "paragraphs": [
          "A **class** is a blueprint or template for creating objects.",
          "Think of it as a recipe that defines the structure and behavior (properties and methods) that its objects will have.",
          {
            "text": "Example:",
            "code": "class Car:\n    runs = True  # This is a class variable (shared by all instances of Car)\n\n    def start(self):\n        if self.runs:\n            print(\"Car is started. Vroom vroom!\")\n        else:\n            print(\"Car is broken :(\")\n "
          }
        ]
      },
      {
        "heading": "2. What is an Instance?",
        "paragraphs": [
          "An **instance** is a specific object created from a class.",
          "When you create an **instance**, you are making a unique object that can have its own data.",
          {
            "text": "Example:",
            "code": "my_car = Car()  # my_car is an instance of the Car class\n "
          }
        ]
      },
      {
        "heading": "3. Class vs Instance Variables",
        "paragraphs": [
          "**Class Variable**: Shared by all instances of the class.",
          "Changing it in one place can affect all **instances** unless overridden.",
          "**Instance Variable**: Specific to the instance and doesn’t affect other instances.",
          {
            "text": "Example:",
            "code": "my_car.runs = False  # This creates an instance variable for my_car\n "
          }
        ]
      },
      {
        "heading": "4. The self Keyword",
        "paragraphs": [
          "**self** is a reference to the current instance of the class.",
          "It allows you to access **instance variables** and methods.",
          {
            "text": "Example:",
            "code": "my_car.start()  # self refers to my_car inside the start() method\n "
          }
        ]
      },
      {
        "heading": "5. How self Works",
        "paragraphs": [
          "When you call a method on an **instance**, Python automatically passes the instance as the first argument to the method.",
          "This is why we always include **self** as the first parameter in instance methods.",
          {
            "text": "Example:",
            "code": "my_car.start()  # Equivalent to Car.start(my_car)\n "
          }
        ]
      },
      {
        "heading": "6. Class vs Instance Behavior",
        "paragraphs": [
          "When you call start() on:",
          "An **Instance** (e.g., my_car.start()):",
          "**self** refers to that specific instance (my_car).",
          "If runs is set as an **instance variable**, the method will use it.",
          "If no **instance variable** is found, the method will fall back to the class variable.",
          "The **Class** (e.g., Car.start()):",
          "Since **self** is missing, Python throws an error because it doesn’t know which instance to use."
        ]
      },
      {
        "heading": "Visual Summary",
        "paragraphs": [
          {
            "text": "Creating an **instance**:",
            "code": "my_car = Car()\nmy_car.runs  # Uses the class variable (True by default)\n "
          },
          {
            "text": "Overriding the **class variable**:",
            "code": "my_car.runs = False  # Creates an instance variable only for my_car\n "
          },
          {
            "text": "Creating another **instance**:",
            "code": "my_other_car = Car()\nmy_other_car.runs  # Still uses the class variable (True)\n "
          },
          {
            "text": "Error when calling on **class**:",
            "code": "Car.start()  # Raises TypeError because `self` is not provided\n "
          }
        ]
      },
      {
        "heading": "Example",
        "paragraphs": [
          {
            "text": "",
            "code": "# car.py\nclass Car:\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model\n    \n    def start(self):\n        print(f\"{self.make} {self.model} is starting. Vroom vroom!\")\n\n# main.py\nfrom car import Car  # Import the Car class from car.py\n \n# Create an instance of the Car class\nmy_car = Car(make=\"Toyota\", model=\"Corolla\")\nmy_car.start()"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-methods",
    "parentSlug": "python-oop",
    "title": "Methods",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 19, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "24",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**Classes** can also have class methods - methods that are shared among all instances of a certain type.",
          "As with variables, they can be overriden in a specific **instance** or subclass.",
          {
            "text": "Let’s add a **class method** to our Car class:",
            "code": "class Car:\n\n    runs = True\n\n    number_of_wheels = 4\n\n    \n @classmethod\n    def get_number_of_wheels(cls):\n  \n      return cls.number_of_wheels\n\n\n    def start(self):\n\n        if self.runs:\n            print(\"Car is started. Vroom vroom!\")\n  \n      else:\n            print(\"Car is broken :(\")"
          },
          {
            "text": "And call it:",
            "code": ">>> my_car = Car()\n\n>>> print(f\"Cars have {Car.get_number_of_wheels()} wheels.\")\nCars have 4 wheels.\n# Of course, we can override this in our instance:\n\n>>> my_car.number_of_wheels = 6\n# And when we access our new instance variable:\n\n>>> print(f\"My car has {my_car.number_of_wheels} wheels.\")\nMy car has 6 wheels.\n# But, when we call our class method on our instance:\n\n>>> print(f\"My car has {my_car.get_number_of_wheels()} wheels.\")\nMy car has 4 wheels."
          },
          "Why?",
          "Because get_number_of_wheels() is a **class method**, and when it’s called, the class (Car) gets passed in, and the value of Car.number_of_wheels is returned.",
          "Although we can access the **instance variable** (with a value of 6), the get_number_of_wheels() class method still returns the class variable, which is 4."
        ]
      },
      {
        "heading": "Bonus",
        "paragraphs": [
          "You don’t have to instantiate everything by hand, you can instantiate objects in for loops or even comprehensions.",
          "This is useful for running a function on a list of objects.",
          {
            "text": "For example, to convert a list of number-strings into a list of integers, you could do:",
            "code": ">>> my_ints = [int(str_num) for str_num in [\"1\", \"2\", \"3\"]]\n>>> print(my_ints)\n[1, 2, 3]"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-str-and-repr",
    "parentSlug": "python-methods",
    "title": "__str__ and __repr__",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 19, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "25",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "magic methods that come in handy for debugging, **__str__()** and __repr__().",
          "Both functions return a string representation of an object. **__str__()** should return readable end-user output,",
          "**__repr__()** should return the Python code necessary to rebuild the object.",
          "**__str__()** maps to the built-in function str() and __repr__() maps to the built-in function repr().",
          {
            "text": "For example, we’ll use the datetime library to generate a datetime object for right now:",
            "code": ">>> import datetime\n>>> now = datetime.datetime.now()\n>>> str(now)\n'2019-03-16 21:04:01.396256'\n>>> repr(now)\n'datetime.datetime(2019, 3, 16, 21, 4, 1, 396256)'"
          },
          "You can see that **str()** has returned a human-readable date/time, and repr() has returned a string that represents the Python code we would need to run to recreate this object.",
          {
            "text": "We can, of course, set our own **__str__()** and __repr__() methods in our custom classes:",
            "code": "class Car:\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model\n\n    def __str__(self):\n        return f\"<<Car object: {self.make} {self.model}>>\"\n\n    def __repr__(self):\n        return f\"Car('{self.make}', '{self.model}')\"\n>>> my_car = Car(\"Ford\", \"Thunderbird\")\n>>> print(f\"This object is a {str(my_car)}\")\nThis object is a <<Car object: Ford Thunderbird>>\n>>> print(f\"To reproduce it, type: {repr(my_car)}\")\nTo reproduce it, type: Car('Ford', 'Thunderbird')"
          },
          "**str()** and repr() automatically call the __str__() and __repr__() methods if they exist.",
          "Direct calls to **__str__()** and __repr__() are redundant because Python handles this for you.",
          "Always prefer **str()** and repr() for a more Pythonic and consistent approach."
        ]
      }
    ]
  },
  {
    "slug": "python-init",
    "parentSlug": "python-methods",
    "title": "__init__",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 19, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "26",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**Classes** can have an optional magic method called __init__() that gets run when you instantiate an instance of a class.",
          "You can use the **__init__()** method to do any special thing you want to happen when your instance is instantiated, including setting instance variables. __init__ can take arguments, too.",
          "Methods that are bracketed by underscores are sometimes called “magic methods.”",
          {
            "text": "For example:",
            "code": "class Car:\n    runs = True\n\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model\n\n    def start(self):\n        if self.runs:\n            print(f\"Your {self.make} {self.model} is started. Vroom vroom!\")\n        else:\n            print(f\"Your {self.make} {self.model} is broken :(\"\n>>> my_car = Car(\"Ford\", \"Thunderbird\")\n>>> my_car.start()\nYour Ford Thunderbird is started. Vroom vroom!"
          },
          "Here, we accept two required variables, make and model in our **__init__()** method, and set instance variables of the same names using self.",
          "Later, when we call start(), we can grab **self**.make and self.model from the bound instance and use them in our string."
        ]
      }
    ]
  },
  {
    "slug": "python-type-isinstance-and-issubclass",
    "parentSlug": "python-methods",
    "title": "type, isinstance, and issubclass",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 19, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "27",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**Python** comes with some built-in functions for inspecting classes and types:",
          "the **type()** function returns the type of the object you pass it, or it’s class.",
          {
            "text": "For example:",
            "code": ">>> type(42)\n<class 'int'>\n>>> type(\"Hello world!\")\n<class 'str'>\n>>> type(my_car)\n<class '__main__.Car'>"
          },
          "The **isinstance()** function takes an object and a class, and returns True if the object you pass it is an instance of the class.",
          {
            "text": "For example:",
            "code": ">>> isinstance(42, int)\nTrue\n>>> isinstance(\"Hello world!\", str)\nTrue\n>>> isinstance(my_car, float)\nFalse\n>>> isinstance(my_car, Car)\nTrue"
          },
          "The **issubclass** function takes two classes, and returns True if the first class is a subclass of the second.",
          {
            "text": "For example:",
            "code": "# bool is a subclass of int\n>>> issubclass(bool, int)\nTrue\n# int is a subclass of object\n>>> issubclass(int, object)\nTrue\n# technically, everything is a subclass of object\n>>> issubclass(bool, object)\nTrue"
          }
        ]
      }
    ]
  },
  {
    "slug": "python-inheritance",
    "title": "Inheritance",
    "excerpt": "",
    "topic": "Python",
    "date": "Jan 19, 2025",
    "readTime": "",
    "accent": "blue",
    "number": "28",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          "**Class** inheritance is a very useful Object-oriented Programming construct for sharing and reusing code.",
          "**Inheritance** makes it possible to break up and organize your code into a hierarchy, from generic to specific.",
          "Parent (generic) **class** properties are available in child classes, but child properties are NOT available in parent",
          "Earlier, we saw that bool is a sub**class** of int, thus, it inherited the properties and methods of the int class, and then extended it to be more specific to booleans.",
          "We can do the same with our own **classes**, too.",
          {
            "text": "In a file called **vehicle**.py, let’s create a parent Vehicle class, and have our Car class be a subclass.",
            "code": "class Vehicle:\n    def __init__(self, make, model, fuel=\"gas\"):\n        self.make = make\n        self.model = model\n        self.fuel = fuel\n\n\nclass Car(Vehicle):\n    def __init__(self, make, model, fuel=\"gas\"):\n        super().__init__(make, model, fuel)"
          },
          "When we instantiate a **Car** instance, the interpreter calls __init__(), where we pass in two arguments (make and model) and an optional 3rd (fuel, which defaults to “gas”).",
          "In **__init__()**, we call super().__init__(), which resolves to our parent class, Vehicle, and runs its __init__ function, where the variables are stored.",
          "Note that even though the variables are stored at the **Vehicle** level, they are instance variables because self is bound to my_car, which is a Car, which is a Vehicle.",
          "Don’t forget to import your **Vehicle** and Car classes.",
          {
            "text": "Behold:",
            "code": ">>> from vehicle import Vehicle, Car\n>>> my_car = Car(\"Ford\", \"Thunderbird\")\n>>> print(type(my_car))\n<class '__main__.Car'>\n>>> print(my_car.fuel)\ngas\n>>> print(isinstance(my_car, Car))\nTrue\n>>> print(isinstance(my_car, Vehicle))\nTrue\n>>> print(issubclass(Car, Vehicle))\nTrue"
          }
        ]
      },
      {
        "heading": "Overriding Variables in a Subclass",
        "paragraphs": [
          "We can, of course, use a sub**class** to override variables that belong to a parent class.",
          {
            "text": "Let’s update our **vehicle**.py file:",
            "code": "class Vehicle:\n    number_of_wheels = 4\n\n    def __init__(self, make, model, fuel=\"gas\"):\n        self.make = make\n        self.model = model\n        self.fuel = fuel\n\nclass Car(Vehicle):\n\n    def __init__(self, make, model, fuel=\"gas\"):\n        super().__init__(make, model, fuel)\n\nclass Truck(Vehicle):\n    number_of_wheels = 6\n\n    def __init__(self, make, model, fuel=\"diesel\"):\n        super().__init__(make, model, fuel)\n\nclass Motorcycle(Vehicle):\n    number_of_wheels = 2\n>>> my_truck = Truck(\"Ford\", \"F350\")\n>>> print(type(my_truck))\n<class '__main__.Truck'>\n>>> print(my_truck.fuel)\ndiesel\n>>> print(my_truck.number_of_wheels)\n6"
          },
          "Note how our **Truck**’s class variable number_of_wheels overrode the parent class Vehicle’s number_of_wheels (or, to be more specific, the interpreter found number_of_wheels in a closer scope, the Truck class, and did not need to continue searching up the hierarchy).",
          "Likewise, **Motorcycle** overrides just the number_of_wheels variable to equal 2.",
          "Notice there is no **__init__()** function in Motorcycle - the number_of_wheels variable is overridden but instantiating a Motorcycle just goes straight to the Vehicle.__init__() method."
        ]
      },
      {
        "heading": "Multiple Inheritance in Python",
        "paragraphs": [
          "Can **Python** classes inherit from multiple parent classes?",
          "Yes, this is called multiple **inheritance**.",
          "It’s not as commonly used for simple programs, but you’ll see it more often as you start using libraries.",
          "One common use case for multiple **inheritance** in Python is for a type of class called a Mixin.",
          "**Mixin** classes tend to be used to quickly and easily add additional properties and methods into a class.",
          "This type of design pattern encourages code with composable architecture."
        ]
      }
    ]
  },
  {
    "slug": "python-reference",
    "title": "Reference",
    "excerpt": "",
    "topic": "Python",
    "date": "Dec 30, 2024",
    "readTime": "",
    "accent": "blue",
    "number": "29",
    "sections": [
      {
        "heading": "",
        "paragraphs": [
          {
            "text": "",
            "block": {
              "type": "link",
              "text": "https://www.learnpython.dev/",
              "href": "https://www.learnpython.dev/"
            }
          }
        ]
      }
    ]
  }
];
