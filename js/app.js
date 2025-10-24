/*// app.js
// Goal: Fetch meals starting with 'a' and 'b', combine them,
// then print the first 5 meal names in alphabetical order.

async function fetchAndPrintFiveMeals() {
  try {
    // 1) Fetch meals that start with 'a'
    const resA = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    const dataA = await resA.json();
    const mealsA = dataA.meals || [];

    // 2) Fetch meals that start with 'b'
    const resB = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
    const dataB = await resB.json();
    const mealsB = dataB.meals || [];

    // 3) Combine the results from 'a' and 'b'
    const allMeals = mealsA.concat(mealsB);

    // 4) Sort alphabetically, take first 5, and map to names only
    const firstFiveAlphabetical = allMeals
      .sort((a, b) => a.strMeal.localeCompare(b.strMeal))
      .slice(0, 5)
      .map(meal => meal.strMeal);

    // 5) Print the result
    console.log('First 5 meal names (alphabetical, from a + b):', firstFiveAlphabetical);

  } catch (err) {
    console.error('Error fetching meals:', err);
  }
}

// Run the function
fetchAndPrintFiveMeals();
*/

/*
// app.js
// Fetch meals starting with 'a' and 'b' from TheMealDB API,
// combine, sort alphabetically, and print first 5 meal names.
// ==============================

async function fetchAndPrintFiveMeals() {
  try {
    // Fetch names starting with a (using ?f=a)
    const responseA = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    const dataA = await responseA.json();

    // If the API returns null (no meals found), use an empty array to avoid errors
    const mealsA = dataA.meals || [];

    // fetch names starting with b (using ?f=b)
    const responseB = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
    const dataB = await responseB.json();
    const mealsB = dataB.meals || [];

    //Combine a and b (concatenate) joins both arrays into a list
    const allMeals = mealsA.concat(mealsB);

    // sort(): sorts meals alphabetically by name
    // slice(0,5): keeps the first 5 only
    // map(): gives me the meal names only (no full objects)
    const firstFiveAlphabetical = allMeals
      .sort((a, b) => a.strMeal.localeCompare(b.strMeal))
      .slice(0, 5)
      .map(meal => meal.strMeal);

    // print result by console-lgo()
    console.log('✅ First 5 meal names (alphabetical, from A + B):');
    console.log(firstFiveAlphabetical);

  } catch (error) {
    // If something goes wrong (no internet or API problem), this will show up in console
    console.error('❌ Error fetching or processing meals:', error);
  }
}

// ------------------------------
// 6️⃣ RUN THE FUNCTION
// ------------------------------
// This actually starts the process when you load the page
fetchAndPrintFiveMeals();


// app.js
// ==============================
// GOAL:
// 1️⃣ Fetch meals starting with 'a' and 'b' from TheMealDB API
// 2️⃣ Print the first 5 meal names (alphabetical order)
// 3️⃣ Print all meals that belong to a given category (name + category)
// 4️⃣ Count how many meals exist in each category
// ==============================

async function fetchAndProcessMeals() {
  try {
    // ------------------------------
    // STEP 1: FETCH MEALS FROM 'A' AND 'B'
    // ------------------------------
    const responseA = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    const dataA = await responseA.json();
    const mealsA = dataA.meals || []; // if null, use empty array

    const responseB = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
    const dataB = await responseB.json();
    const mealsB = dataB.meals || [];

    // Combine both lists of meals
    const allMeals = mealsA.concat(mealsB);

    // ------------------------------
    // STEP 2A: FIRST 5 MEALS ALPHABETICALLY
    // ------------------------------
    const firstFiveAlphabetical = allMeals
      .sort((a, b) => a.strMeal.localeCompare(b.strMeal)) // sort alphabetically by meal name
      .slice(0, 5) // only take the first five
      .map(meal => meal.strMeal); // extract names only

    console.log('✅ First 5 meal names (alphabetical, from A + B):');
    console.log(firstFiveAlphabetical);

    // ------------------------------
    // STEP 2B: FILTER MEALS BY CATEGORY
    // ------------------------------
    // Choose the category you want to filter by:
    const givenCategory = 'Dessert'; // you can change this to e.g. 'Seafood' or 'Beef'

    // Filter the list of meals:
    // We compare both the meal's category and our given category in lowercase
    // to make it case-insensitive.
    const filteredMeals = allMeals.filter(meal =>
      meal.strCategory.toLowerCase() === givenCategory.toLowerCase()
    );

    console.log(`\n✅ Meals in category "${givenCategory}":`);
    filteredMeals.forEach(meal => {
      console.log(`Name: ${meal.strMeal}, Category: ${meal.strCategory}`);
    });

    // ------------------------------
    // STEP 2C: COUNT HOW MANY MEALS PER CATEGORY
    // ------------------------------
    // We use the .reduce() method to build an object that keeps track of counts.
    // The accumulator (acc) starts as an empty object: {}
    const categoryCount = allMeals.reduce((acc, meal) => {
      const category = meal.strCategory; // e.g. "Dessert"
      // If category already exists in our object, add +1. Otherwise, start at 1.
      acc[category] = (acc[category] || 0) + 1;
      return acc; // always return the accumulator
    }, {}); // {} means we start with an empty object

    console.log('\n✅ Number of meals per category:');
    console.log(categoryCount);

  } catch (error) {
    console.error('❌ Error fetching or processing meals:', error);
  }
}

// Run the function
fetchAndProcessMeals();

/*
==============================
EXPLANATION OF HOW THE CODE WORKS
==============================

1️⃣ FETCH:
   - We use fetch() twice to get meals starting with 'a' and 'b'.
   - If API returns null (no meals), we replace it with an empty array to avoid errors.
   - We then combine both arrays into one list called allMeals.

2️⃣ SORT:
   - We use .sort() to order allMeals alphabetically by their strMeal (name).
   - .slice(0,5) keeps only the first 5 items.
   - .map() extracts only the names so we don’t print the entire objects.

3️⃣ FILTER:
   - We define a category (givenCategory) like "Dessert".
   - .filter() creates a new array of only those meals whose strCategory matches.
   - We use .toLowerCase() on both sides to make it case-insensitive.

4️⃣ COUNT:
   - We use .reduce() to create a summary object.
   - The accumulator (acc) starts empty {}.
   - For each meal, we look at its category.
   - We add +1 if that category already exists in our object, or start at 1.
   - The final result is an object like:
       { "Dessert": 3, "Seafood": 5, "Beef": 2 }

5️⃣ PRINT:
   - console.log() is used to print all results in the browser console.

==============================
To view results:
- Open your project in the browser
- Right-click → Inspect → Console
==============================
*/

// app.js
// ==============================
// GOAL:
// 1️⃣ Fetch meals starting with 'a' and 'b' from TheMealDB API
// 2️⃣ Print the first 5 meal names (alphabetical order)
// 3️⃣ Print all meals that belong to a given category (name + category)
// 4️⃣ Count how many meals exist in each category
// ==============================

async function fetchAndProcessMeals() {
  try {
    // ------------------------------
    // STEP 1: FETCH MEALS FROM 'A' AND 'B'
    // ------------------------------
    const responseA = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    const dataA = await responseA.json();
    const mealsA = dataA.meals || []; // if null, use empty array

    const responseB = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
    const dataB = await responseB.json();
    const mealsB = dataB.meals || [];

    // Combine both lists of meals
    const allMeals = mealsA.concat(mealsB);

    // ------------------------------
    // STEP 2A: FIRST 5 MEALS ALPHABETICALLY
    // ------------------------------
    const firstFiveAlphabetical = allMeals
      .sort((a, b) => a.strMeal.localeCompare(b.strMeal)) // sort alphabetically by meal name
      .slice(0, 5) // only take the first five
      .map(meal => meal.strMeal); // extract names only

    console.log('✅ First 5 meal names (alphabetical, from A + B):');
    console.log(firstFiveAlphabetical);

    // ------------------------------
    // STEP 2B: FILTER MEALS BY CATEGORY
    // ------------------------------
    // Choose the category you want to filter by:
    const givenCategory = 'Dessert'; // you can change this to e.g. 'Seafood' or 'Beef'

    // Filter the list of meals:
    // We compare both the meal's category and our given category in lowercase
    // to make it case-insensitive.
    const filteredMeals = allMeals.filter(meal =>
      meal.strCategory.toLowerCase() === givenCategory.toLowerCase()
    );

    console.log(`\n✅ Meals in category "${givenCategory}":`);
    filteredMeals.forEach(meal => {
      console.log(`Name: ${meal.strMeal}, Category: ${meal.strCategory}`);
    });

    // ------------------------------
    // STEP 2C: COUNT HOW MANY MEALS PER CATEGORY
    // ------------------------------
    // We use the .reduce() method to build an object that keeps track of counts.
    // The accumulator (acc) starts as an empty object: {}
    const categoryCount = allMeals.reduce((acc, meal) => {
      const category = meal.strCategory; // e.g. "Dessert"
      // If category already exists in our object, add +1. Otherwise, start at 1.
      acc[category] = (acc[category] || 0) + 1;
      return acc; // always return the accumulator
    }, {}); // {} means we start with an empty object

    console.log('\n✅ Number of meals per category:');
    console.log(categoryCount);

  } catch (error) {
    console.error('❌ Error fetching or processing meals:', error);
  }
}

// Run the function
fetchAndProcessMeals();

/*
==============================
EXPLANATION OF HOW THE CODE WORKS
==============================

1️⃣ FETCH:
   - We use fetch() twice to get meals starting with 'a' and 'b'.
   - If API returns null (no meals), we replace it with an empty array to avoid errors.
   - We then combine both arrays into one list called allMeals.

2️⃣ SORT:
   - We use .sort() to order allMeals alphabetically by their strMeal (name).
   - .slice(0,5) keeps only the first 5 items.
   - .map() extracts only the names so we don’t print the entire objects.

3️⃣ FILTER:
   - We define a category (givenCategory) like "Dessert".
   - .filter() creates a new array of only those meals whose strCategory matches.
   - We use .toLowerCase() on both sides to make it case-insensitive.

4️⃣ COUNT:
   - We use .reduce() to create a summary object.
   - The accumulator (acc) starts empty {}.
   - For each meal, we look at its category.
   - We add +1 if that category already exists in our object, or start at 1.
   - The final result is an object like:
       { "Dessert": 3, "Seafood": 5, "Beef": 2 }

5️⃣ PRINT:
   - console.log() is used to print all results in the browser console.

==============================
To view results:
- Open your project in the browser
- Right-click → Inspect → Console
==============================
*/

