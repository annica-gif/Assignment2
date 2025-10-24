// app.js
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
