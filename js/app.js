// Steg 1: Hämta data från API
fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
  .then(response => response.json())
  .then(data => {
    console.log(data);

  // Visa allt vi får tillbaka i konsolen
  })
  .catch(error => console.error("Fel vid hämtning:", error));

// Steg 2: Visa alla meal-namn
fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
  .then(response => response.json())
  .then(data => {
    const meals = data.meals;

 // Hämtar listan med meals
    meals.forEach(meal => console.log(meal.strMeal));

 // Skriver ut varje namn
  })
  .catch(error => console.error("Fel vid hämtning:", error));

// Steg 3: Sortera alfabetiskt och visa 5 första
fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
  .then(response => response.json())
  .then(data => {
    const meals = data.meals
      .sort((a, b) => a.strMeal.localeCompare(b.strMeal))

      // Visa första fem. Slicar, och tar alltså bort allt ifrån 5 och över. Från 0-4= alltså 5.
    .slice(0, 5);

  // Ta första fem
    console.log("Första fem meals (alfabetiskt):");
    meals.forEach(meal => console.log(meal.strMeal));
  })

.catch(error => console.error("Fel vid hämtning:", error));

