import type { ArticleSection } from "@/lib/articles";

export const javascriptImmutableMutableSections: ArticleSection[] = [
  {
    id: "two-kinds-of-change", heading: "Two separate kinds of change",
    paragraphs: [
      { text: "**Mutable vs. immutable** needs two separate questions:", bullets: [
        "**The value or its items:** Can we change the existing value in place?",
        "**The variable or its reference:** Can we assign a different value to the variable?",
      ] },
    ],
  },
  {
    id: "primitive-values", heading: "Values: primitives are immutable",
    paragraphs: [
      "**Immutable** means the existing value cannot be changed in place.",
      { text: "**All seven primitive types** have immutable values:", bullets: [
        "**String**.", "**Number**.", "**Boolean**.", "**Null**.", "**Undefined**.", "**Symbol**.", "**BigInt**.",
      ] },
      "**A string's characters** cannot be replaced by assigning to an index.",
      {
        text: "**Index 1** is the second character. Here we try to replace the lowercase e with an uppercase E.",
        code: 'let a = "hello";\na[1] = "E"; // Cannot change a character in the string\nconsole.log(a); // hello',
      },
      "**The attempted change** is ignored in this non-strict example. In strict mode, it throws a TypeError.",
    ],
  },
  {
    id: "reassignment", heading: "Reassigning a variable does not mutate the old value",
    paragraphs: [
      {
        text: "**Reassignment** gives a variable a new value.",
        code: 'let word = "hello";\nword = "world"; // Assigns a new string\nconsole.log(word); // world',
      },
      "**The string \"hello\"** was not changed. word now holds the new string \"world\".",
    ],
  },
  {
    id: "mutable-items", heading: "Values: object properties and array items are mutable",
    paragraphs: [
      "**Mutable** means the existing value can change in place without creating a new object.",
      "**Objects and arrays** allow their properties and items to change.",
      {
        text: "**An object property** can receive a different value. This changes the existing object.",
        code: 'let student = { name: "Halina" };\nstudent.name = "Ali"; // Changes the property\nconsole.log(student.name); // Ali',
      },
      "**student.name = \"Ali\"** edits the object's property. student still refers to the same object.",
      {
        text: "**An array index** can receive a different item. Unlike the string example, this changes the existing array.",
        code: 'let a = [1, 2, 3];\na[1] = 5; // Changes the second item\nconsole.log(a); // [1,5,3]',
      },
      "**a[1] = 5** edits the array's contents. a still refers to the same array.",
      {
        text: "**push() and concat()** show the difference between changing an array and creating a new one.",
        code: 'let oldArray = [1, 2, 3];\noldArray.push(4); // Mutates oldArray\nlet newArray = oldArray.concat([5, 6]); // Creates a new array\nconsole.log(newArray); // [1,2,3,4,5,6]\nconsole.log(oldArray); // [1,2,3,4]',
      },
    ],
  },
  {
    id: "reference-types", heading: "References: which object does the variable refer to?",
    paragraphs: [
      "**A reference** is the connection through which a variable accesses an object.",
      "**Reference types** are object values accessed through references. Objects, arrays, and functions are examples.",
      "**Assigning an object to another variable** shares the reference. It does not copy the object's contents.",
      { text: "**Read the stack and heap diagram:**", bullets: [
        "**Stack:** This drawing shows the variables holding references.",
        "**Heap:** This drawing shows the object containing the data.",
        "**Pointers:** Both arrows lead to the same object, so both variables access the same data.",
      ] },
      "**Stack and heap** are a simplified model. JavaScript engines choose actual storage locations.",
      {
        text: "**staff2 = staff** shares the object. Changing staff2.name changes that shared object's property.",
        code: 'const staff = {\n  name: "Strengthened",\n  age: 43,\n  hobbies: ["reading", "swimming"]\n};\nconst staff2 = staff;\nstaff2.name = "Ha";\nconsole.log(staff.name); // Ha\nconsole.log(staff2.name); // Ha',
      },
      "**Both references stay the same.** Only the object's name property changes. The object diagram shows its contents before this change.",
      {
        text: "**Primitive variables** hold their values independently. The student diagram shows both holding Halina.",
        code: 'let student1 = "Halina";\nlet student2 = "Halina";\nconsole.log(student1); // Halina\nconsole.log(student2); // Halina',
      },
      "**Reassigning student1** would not affect student2. Equal strings are not guaranteed to occupy separate physical memory locations.",
    ],
    blocks: [{ type: "reference-memory-diagrams" }, { type: "primitive-memory-diagram" }],
  },
  {
    id: "variable-reassignment", heading: "References: let allows reassignment, const prevents it",
    paragraphs: [
      "**A variable's binding** is its connection to a value. let allows that connection to change. const keeps it fixed.",
      "**For an object,** reassigning the variable changes which object it refers to. This is what changing the reference means here.",
      {
        text: "**let with an array** allows reassignment. The second variable keeps its reference to the original array.",
        code: 'let arr = [1, 2];\nconst original = arr;\narr = [3]; // arr now refers to a different array\nconsole.log(arr); // [3]\nconsole.log(original); // [1,2]',
      },
      "**arr = [3]** changes the reference held by arr. It does not edit the original array's items.",
      {
        text: "**const with a string** prevents reassignment too. The same rule applies whether the value is primitive or an object.",
        code: 'const str = "hello";\nconsole.log(str); // hello\nstr = "world"; // TypeError: cannot reassign a const variable',
      },
      "**Value immutability** comes from the value. Whether reassignment is allowed comes from let or const.",
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
        text: "**Change the items, then try reassignment.** The item changes work before the last line throws a TypeError.",
        code: 'const b = [1, 2, 3, 4];\nb.push(5); // Changes the existing array\nb[0] = 10; // Changes an item in the same array\nconsole.log(b); // [10,2,3,4,5]\nb = [9, 8]; // TypeError: cannot reassign b',
      },
      "**const does not make the array immutable.** It prevents the variable from referring to a different array.",
      "**Immutable update patterns** help avoid accidental side effects. concat() above preserves the original array while producing a new one.",
    ],
  },
  {
    id: "summary", heading: "Remember: check the value and the variable separately",
    paragraphs: [
      "**Primitive values** cannot change in place, even when a let variable holds them.",
      "**Object properties and array items** can usually change in place, even when a const variable holds them.",
      "**Reassignment** gives a variable a different value or object reference. let allows it, and const prevents it.",
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
