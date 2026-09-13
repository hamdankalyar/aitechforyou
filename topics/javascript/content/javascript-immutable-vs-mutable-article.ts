import type { ArticleSection } from "@/lib/articles";

export const javascriptImmutableMutableSections: ArticleSection[] = [
  {
    id: "primitive-values", heading: "Values: primitives are immutable",
    paragraphs: [
      { text: "**Mutable vs. immutable** needs two separate questions:", bullets: [
        "**The value or its items:** Can we change the existing value in place?",
        "**The variable or its reference:** Can we assign a different value to the variable?",
      ] },
      "**Immutable** means the existing value cannot be changed in place.",
      { text: "**All seven primitive types** have immutable values:", bullets: [
        "**String**.", "**Number**.", "**Boolean**.", "**Null**.", "**Undefined**.", "**Symbol**.", "**BigInt**.",
      ] },
      "**A string's characters** cannot be replaced by assigning to an index.",
      {
        text: "**Index 1** is the second character.",
        bullets: ["**The example** tries to replace the lowercase e with an uppercase E."],
        code: 'let a = "hello";\na[1] = "E"; // Cannot change a character in the string\nconsole.log(a); // hello',
      },
      { text: "**The attempted change** is ignored in this non-strict example.", bullets: [
        "**In strict mode,** it throws a TypeError.",
      ] },
      {
        text: "**Primitive variables** can hold the same value independently.",
        code: 'let student1 = "Halina";\nlet student2 = "Halina";\nconsole.log(student1); // Halina\nconsole.log(student2); // Halina',
      },
      "**Reassigning student1** would not affect student2.",
    ],
    blocks: [{ type: "primitive-memory-diagram" }],
  },
  {
    id: "reassignment", heading: "Reassigning a variable does not mutate the old value",
    paragraphs: [
      {
        text: "**Reassignment** gives a variable a new value.",
        code: 'let a = "hello";\na = "world"; // Assigns a new string\nconsole.log(a); // world',
      },
      { text: "**Before and after reassignment:**", block: { type: "reassignment-memory-diagram" } },
      { text: "**The string \"hello\"** was not changed.", bullets: [
        "**a** now holds the new string \"world\".",
      ] },
    ],
  },
  {
    id: "mutable-items", heading: "Values: object properties and array items are mutable",
    paragraphs: [
      "**Mutable** means the existing value can change in place without creating a new object.",
      "**Objects and arrays** allow their properties and items to change.",
      {
        text: "**An object property** can receive a different value.",
        bullets: ["**The assignment** changes the existing object."],
        code: 'let student = { name: "Halina" };\nstudent.name = "Ali"; // Changes the property\nconsole.log(student.name); // Ali',
      },
      { text: "**Before and after changing the property:**", block: { type: "object-mutation-diagram" } },
      { text: "**student.name = \"Ali\"** edits the object's property.", bullets: [
        "**student** still refers to the same object.",
      ] },
      {
        text: "**An array index** can receive a different item.",
        bullets: ["**Unlike the string example,** this changes the existing array."],
        code: 'let a = [1, 2, 3];\na[1] = 5; // Changes the second item\nconsole.log(a); // [1,5,3]',
      },
      { text: "**Before and after changing the item:**", block: { type: "array-mutation-diagram" } },
      { text: "**a[1] = 5** edits the array's contents.", bullets: [
        "**a** still refers to the same array.",
      ] },
      {
        text: "**push() and concat()** work differently:",
        bullets: [
          "**push()** changes the original array.",
          "**concat()** creates and returns a new array.",
        ],
        code: 'let oldArray = [1, 2, 3];\noldArray.push(4); // Mutates oldArray\nlet newArray = oldArray.concat([5, 6]); // Creates a new array\nconsole.log(newArray); // [1,2,3,4,5,6]\nconsole.log(oldArray); // [1,2,3,4]',
      },
    ],
  },
  {
    id: "reference-types", heading: "References: where is an object's data stored?",
    paragraphs: [
      "**A reference** is the connection through which a variable accesses an object.",
      { text: "**Reference types** are object values accessed through references.", bullets: [
        "**Examples** include objects, arrays, and functions.",
      ] },
      { text: "**Read the single-object diagram:**", block: { type: "single-reference-memory-diagram" }, bullets: [
        "**Stack:** This drawing shows staff holding a reference.",
        "**Heap:** This drawing shows the object containing the data.",
        "**Pointer:** The arrow connects the reference to the object's data.",
      ] },
      { text: "**Stack and heap** are a simplified model.", bullets: [
        "**JavaScript engines** choose the actual storage locations.",
      ] },
    ],
  },
  {
    id: "shared-reference", heading: "Assigning an object to another variable",
    paragraphs: [
      { text: "**staff2 = staff** gives both variables the same reference.", bullets: [
        "**No new object** is created.",
      ] },
      { text: "**Read the shared-object diagram:**", block: { type: "reference-memory-diagrams" }, bullets: [
        "**staff and staff2** both point to the same object in the heap.",
        "**Changing the object through either variable** changes the same shared data.",
      ] },
      {
        text: "**Changing staff2.name** also changes the name read through staff.",
        code: 'const staff = {\n  name: "Strengthened",\n  age: 43,\n  hobbies: ["reading", "swimming"]\n};\nconst staff2 = staff;\nstaff2.name = "Ha";\nconsole.log(staff.name); // Ha\nconsole.log(staff2.name); // Ha',
      },
      "**This is called sharing a reference, or aliasing.** ",
    ],
  },
  {
    id: "variable-reassignment", heading: "References: let allows reassignment, const prevents it",
    paragraphs: [
      { text: "**A variable's binding** is its connection to a value.", bullets: [
        "**let** allows that connection to change.",
        "**const** keeps that connection fixed.",
      ] },
      { text: "**For an object,** reassigning the variable changes which object it refers to.", bullets: [
        "**Changing the reference** means changing that connection.",
      ] },
      {
        text: "**let with an array** allows reassignment.",
        bullets: ["**The second variable** keeps its reference to the original array."],
        code: 'let arr = [1, 2];\nconst original = arr;\narr = [3]; // arr now refers to a different array\nconsole.log(arr); // [3]\nconsole.log(original); // [1,2]',
      },
      { text: "**arr = [3]** changes the reference held by arr.", bullets: [
        "**The original array's items** are not edited.",
      ] },
      {
        text: "**const with a string** prevents reassignment too.",
        bullets: ["**The same rule** applies whether the value is primitive or an object."],
        code: 'const str = "hello";\nconsole.log(str); // hello\nstr = "world"; // TypeError: cannot reassign a const variable',
      },
      { text: "**Value immutability** comes from the value.", bullets: [
        "**Reassignment permission** comes from let or const.",
      ] },
    ],
  },
  {
    id: "const-reference-types", heading: "const with an array: fixed reference, mutable items",
    paragraphs: [
      { text: "**A const array combines both ideas:**", bullets: [
        "**Its reference stays fixed:** The variable cannot be reassigned to another array.",
        "**Its items can change:** The existing array is still mutable.",
      ] },
      {
        text: "**Change the items, then try reassignment.**",
        bullets: ["**The item changes** work before the last line throws a TypeError."],
        code: 'const b = [1, 2, 3, 4];\nb.push(5); // Changes the existing array\nb[0] = 10; // Changes an item in the same array\nconsole.log(b); // [10,2,3,4,5]\nb = [9, 8]; // TypeError: cannot reassign b',
      },
      { text: "**const does not make the array immutable.**", bullets: [
        "**const** prevents the variable from referring to a different array.",
      ] },
      { text: "**Immutable update patterns** help avoid accidental side effects.", bullets: [
        "**concat()** preserves the original array while producing a new one.",
      ] },
    ],
  },
  {
    id: "summary", heading: "Remember: check the value and the variable separately",
    paragraphs: [
      { text: "**Primitive values** cannot change in place.", bullets: [
        "**let** does not change this rule.",
      ] },
      { text: "**Object properties and array items** can usually change in place.", bullets: [
        "**const** does not stop these changes.",
      ] },
      { text: "**Reassignment** gives a variable a different value or object reference.", bullets: [
        "**let** allows reassignment.",
        "**const** prevents reassignment.",
      ] },
    ],
    blocks: [
      { type: "table", caption: "The two questions for strings and arrays", columns: ["Declaration", "Can its value or items change in place?", "Can the variable be reassigned?", "Example"], rows: [
        ['let str = "hello"', "No", "Yes", 'str = "hi" works; str[0] = "H" cannot change the string'],
        ['const str = "hello"', "No", "No", "Character changes cannot modify the string; reassignment throws TypeError"],
        ["let arr = [1, 2]", "Yes", "Yes", "arr[0] = 9 changes an item; arr = [3] changes the reference"],
        ["const arr = [1, 2]", "Yes", "No", "arr[0] = 9 works; arr = [3] throws TypeError"],
      ] },
      { type: "table", caption: "The simplified memory model", columns: ["Value type", "Shown in the diagram", "Can the value change in place?"], rows: [
        ["Primitive", "Value beside the variable in the stack", "No"],
        ["Object (reference type)", "Reference in the stack, object in the heap", "Yes, unless changes are restricted"],
      ] },
    ],
  },
];
