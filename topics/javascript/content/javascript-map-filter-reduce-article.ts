import type { ArticleSection } from "@/lib/articles";

export const javascriptMapFilterReduceSections: ArticleSection[] = [
  {
    id: "process-every-item", heading: "Process all the items in an array",
    paragraphs: [
      "**map, filter, and reduce** are array methods that process all the items in an array.",
    ],
  },
  {
    id: "map", heading: "map",
    paragraphs: [
      "**map** calls a function on each item in an array to create a new array.",
      "**The function's return value** becomes the item at the same position in the new array.",
      "**Arrow functions are useful for this**, because the whole call fits on one line.",
      {
        text: "**Example:** add the word Spice to every nickname.",
        code: 'const spices = [\n  {name: "Emma", nickname: "Baby"},\n  {name: "Geri", nickname: "Ginger"},\n  {name: "Mel B", nickname: "Scary"},\n  {name: "Mel C", nickname: "Sporty"},\n  {name: "Victoria", nickname: "Posh"}\n];\nconst nicknames = spices.map(s => s.nickname + " Spice");\nconsole.log(nicknames); // ["Baby Spice","Ginger Spice","Scary Spice","Sporty Spice","Posh Spice"]',
      },
      "**s** holds one object per call. s.nickname reads its nickname.",
      "**nicknames** is a new array with five strings, one per spice.",
      {
        text: "**Real use:** doubling the prices of products in a shopping cart.",
        code: "const cart = [10.99, 24.99, 7.99, 14.99];\nconst doubledPrices = cart.map((price) => price * 2);\nconsole.log(doubledPrices); // [21.98,49.98,15.98,29.98]\nconsole.log(cart); // [10.99,24.99,7.99,14.99]",
      },
      "**cart does not change.** map builds doubledPrices and leaves cart alone.",
    ],
  },
  {
    id: "string-templates", heading: "String templates",
    paragraphs: [
      "**A string template** is a string written with backticks instead of quotes.",
      "**${}** inserts a variable or a calculation into the text.",
      {
        text: "**Example:** insert a variable into a sentence.",
        code: 'const variable = "a value";\nconsole.log(`string to insert ${variable} into`); // string to insert a value into',
      },
      "**The value of variable** replaces ${variable} in the text.",
      {
        text: "**Example:** the same map written both ways.",
        code: 'const spices = [{name: "Emma", nickname: "Baby"}, {name: "Geri", nickname: "Ginger"}];\nconsole.log(spices.map(s => `${s.nickname} Spice`)); // ["Baby Spice","Ginger Spice"]\nconsole.log(spices.map(s => s.nickname + " Spice")); // ["Baby Spice","Ginger Spice"]',
      },
      "**`${s.nickname} Spice`** is equivalent to s.nickname + \" Spice\".",
      "**Templates are easier to read** when text and values mix.",
    ],
  },
  {
    id: "filter", heading: "filter",
    paragraphs: [
      "**filter** calls a true/false function on each item.",
      "**A true/false function** is one that returns a boolean: true or false.",
      "**It creates a new array** with only the items where the function returns true.",
      {
        text: "**Example:** keep only the spices with Mel in their name.",
        code: 'const spices = [\n  {name: "Emma", nickname: "Baby"},\n  {name: "Geri", nickname: "Ginger"},\n  {name: "Mel B", nickname: "Scary"},\n  {name: "Mel C", nickname: "Sporty"},\n  {name: "Victoria", nickname: "Posh"}\n];\nconst mels = spices.filter(s => s.name.includes("Mel"));\nconsole.log(mels); // [{"name":"Mel B","nickname":"Scary"},{"name":"Mel C","nickname":"Sporty"}]',
      },
      '**includes("Mel")** is true for Mel B and Mel C only, so mels has two items.',
      {
        text: "**Real use:** filtering products by price range.",
        code: 'const products = [\n  { name: "Shirt", price: 25.99 },\n  { name: "Jeans", price: 49.99 },\n  { name: "Shoes", price: 79.99 },\n  { name: "Hat", price: 12.99 }\n];\nconst affordableProducts = products.filter((product) => product.price <= 30);\nconsole.log(affordableProducts); // [{"name":"Shirt","price":25.99},{"name":"Hat","price":12.99}]',
      },
      "**product.price <= 30** is true for Shirt and Hat only.",
      "**products** still holds all four items.",
    ],
  },
  {
    id: "reduce", heading: "reduce",
    paragraphs: [
      "**reduce** applies a function to an array and reduces it to a single value.",
      "**It walks the array** and builds up the result as it goes.",
      {
        text: "**Real use:** calculating the total price of products in a shopping cart.",
        code: 'const cart = [\n  { name: "Shirt", price: 25.99 },\n  { name: "Jeans", price: 49.99 },\n  { name: "Shoes", price: 79.99 },\n  { name: "Hat", price: 12.99 }\n];\nconst totalPrice = cart.reduce((acc, product) => acc + product.price, 0);\nconsole.log(totalPrice); // 168.96',
      },
      { text: "**The function takes two parameters.**", bullets: [
        "**acc** is the accumulator. It holds the result so far.",
        "**product** is the current item.",
      ] },
      "**The second argument of reduce** is the starting value of acc. Here it is 0.",
      "**Each call returns the new acc.** acc + product.price becomes acc for the next item.",
      "**Without a starting value**, acc starts as the first item of the array. The first call then gets the second item.",
      {
        text: "**Example:** a sum of numbers with no starting value.",
        code: "const prices = [10, 20, 30];\nconsole.log(prices.reduce((acc, price) => acc + price)); // 60",
      },
      "**acc starts as 10.** The calls are 10 + 20, then 30 + 30. The result is 60.",
      {
        text: "**Example:** the same idea with objects, wrong and then fixed.",
        code: "const items = [{ price: 10 }, { price: 20 }];\nconsole.log(items.reduce((acc, item) => acc + item.price)); // [object Object]20\nconsole.log(items.reduce((acc, item) => acc + item.price, 0)); // 30",
      },
      "**acc starts as { price: 10 }**, the whole object, not the number 10.",
      "**{ price: 10 } + 20** cannot add an object to a number. JavaScript turns the object into the text [object Object] and glues 20 after it.",
      "**The 0 fixes it.** acc starts as a number, so the calls are 0 + 10, then 10 + 20. The result is 30.",
      "**Rule:** always give a starting value when the items are objects.",
    ],
  },
  {
    id: "how-reduce-works", heading: "How reduce works inside",
    paragraphs: [
      "**reduce is a loop with one extra variable.** That variable is acc.",
      {
        text: "**Example:** the same total written with for...of.",
        code: 'const cart = [\n  { name: "Shirt", price: 25.99 },\n  { name: "Jeans", price: 49.99 },\n  { name: "Shoes", price: 79.99 },\n  { name: "Hat", price: 12.99 }\n];\nlet acc = 0;\nfor (const product of cart) {\n  acc = acc + product.price;\n}\nconsole.log(acc); // 168.96',
      },
      "**let acc = 0** is the starting value, the second argument of reduce.",
      "**acc = acc + product.price** is what the arrow function returns. reduce stores the return value in acc for you.",
      "**After the last item**, reduce returns acc. That is the single value.",
      "**Step through the calls below.** Each press of Next step runs the function once.",
    ],
    blocks: [{ type: "reduce-diagram" }],
  },
  {
    id: "chain", heading: "Chain them",
    paragraphs: [
      {
        text: "**Each method returns a value**, so the next method can be called on it.",
        code: 'const cart = [\n  { name: "Shirt", price: 25.99 },\n  { name: "Jeans", price: 49.99 },\n  { name: "Shoes", price: 79.99 },\n  { name: "Hat", price: 12.99 }\n];\nconst cheap = cart.filter(product => product.price <= 30);\nconsole.log(cheap.map(product => product.name)); // ["Shirt","Hat"]\nconsole.log(cheap.map(product => product.price).reduce((acc, price) => acc + price, 0)); // 38.98',
      },
      "**filter** keeps the products that cost 30 or less.",
      "**map** turns each product into its name or its price.",
      "**reduce** adds the prices into one total.",
    ],
    blocks: [
      { type: "table", caption: "Three methods compared", columns: ["Method", "The function returns", "You get back"], rows: [
        ["map", "The new item", "A new array, same length"],
        ["filter", "true or false", "A new array, only the items that passed"],
        ["reduce", "The new acc", "One value"],
      ] },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read the three lines.",
      "**Change >= 50 to >= 80** and run again.",
      "**Change score * 2 to `${score} points`** and see the second line.",
      "**Remove the 0** from reduce and check the total stays 440.",
      "**Reset** restores the example.",
    ],
    code: "const scores = [40, 75, 90, 55];\nconst passed = scores.filter(score => score >= 50);\nconsole.log(passed); // [75,90,55]\nconst doubled = passed.map(score => score * 2);\nconsole.log(doubled); // [150,180,110]\nconsole.log(doubled.reduce((acc, score) => acc + score, 0)); // 440",
    blocks: [{ type: "quiz", question: "Which method returns a new array with only some of the items?", answers: [
      { text: "filter", correct: true, explanation: "filter keeps the items where the true/false function returned true." },
      { text: "map", correct: false, explanation: "map returns a new array with the same number of items, each one changed by the function." },
      { text: "reduce", correct: false, explanation: "reduce returns one value, not an array." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**map** calls a function on each item and returns a new array of the results.",
      "**filter** calls a true/false function on each item and returns a new array of the items that passed.",
      "**reduce** combines all items into one value. Its second argument is the starting value of acc.",
      "**String templates** use backticks and ${} to put values inside text.",
    ],
  },
];
