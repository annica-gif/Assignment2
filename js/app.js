// app.js

// What do I want to do:
//1. Fetch meals starting with "a" and "b" from TheMealDB API
//2. Print the first 5 meal names (alphabetical order)
//3. Print all meals that belong to a given category (name + category)
//4. Count how many meals exist in each category

// Fetch meals starting with "a" and "b" from TheMealDB API,
// combine, sort alphabetically, and print first 5 meal names
async function fetchAndProcessMeals() {
  try {

    // Fetch meals from "a" and "b"
    // Fetch names starting with a (using ?f=a)

    const responseA = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    const dataA = await responseA.json();
    const mealsA = dataA.meals || []; // if null, use empty array

    // Fetch names starting with b (using ?f=b)
    const responseB = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
    const dataB = await responseB.json();
    const mealsB = dataB.meals || [];

    // Combine both lists of meals
    // Combine a and b (concatenate) joins both arrays into a list
    const allMeals = mealsA.concat(mealsB);

    // sort(): sorts meals alphabetically by name
    // slice(0,5): keeps the first 5 only
    // map(): gives me the meal names only (no full objects)
    const firstFiveAlphabetical = allMeals
      .sort((a, b) => a.strMeal.localeCompare(b.strMeal)) // sort alphabetically by meal name
      .slice(0, 5) // only take the first five: 0, 1, 2, 3 and 4. Not 5, because that is where it slices/cuts
      .map(meal => meal.strMeal); // extract names only

    console.log('✅ First 5 meal names (alphabetical, from A + B):');
    console.log(firstFiveAlphabetical);

    // Filter meals by category
    // Choosing category to filter by:
    const givenCategory = 'Dessert';

    // Filter the list of meals:
    // Compare both the meal category and our given category in lowercase (case-insensitive)
    const filteredMeals = allMeals.filter(meal =>
      meal.strCategory.toLowerCase() === givenCategory.toLowerCase()
    );

    console.log(`\n✅ Meals in category "${givenCategory}":`);
    filteredMeals.forEach(meal => {
      console.log(`Name: ${meal.strMeal}, Category: ${meal.strCategory}`);
    });


    // Count how many meals per category
    // Use the .reduce() method to build an object that keeps track of counts.
    // The accumulator (acc) starts as an empty object: {}
    const categoryCount = allMeals.reduce((acc, meal) => {
      const category = meal.strCategory; // e.g. "Dessert"
      // If category already exists in our object, add +1. Otherwise, start at 1.
      acc[category] = (acc[category] || 0) + 1;
      return acc; // always return the accumulator
    }, {}); // {} means we start with an empty object

    // print result by console-lgo()
    console.log('\n✅ Number of meals per category:');
    console.log(categoryCount);

    // If the API returns null (no meals found), use an empty array to avoid errors
  } catch (error) {
    console.error('❌ Error fetching or processing meals:', error);
  }
}

fetchAndProcessMeals();

