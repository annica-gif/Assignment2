// 1. Fetch data från API
fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a') // hämtar alla måltider som börjar med bokstaven 'a'
  .then(response => response.json()) // parse JSON
  .then(data => {
    const meals = data.meals; // array med måltider

    console.log('Alla måltider:', meals);

    // 2. Använd map för att skapa en array med bara namn på rätter
    const mealNames = meals.map(meal => meal.strMeal);
    console.log('Alla namn på måltider:', mealNames);

    // 3. Använd filter för att hitta rätter med 'Chocolate' i namnet
    const chocolateMeals = meals.filter(meal => meal.strMeal.includes('Chocolate'));
    console.log('Rätter med Chocolate i namnet:', chocolateMeals);

    // 4. Använd reduce för att räkna hur många måltider som innehåller 'a' i namnet
    const countA = meals.reduce((count, meal) => {
      return count + (meal.strMeal.includes('a') ? 1 : 0);
    }, 0);
    console.log('Antal måltider med bokstaven "a":', countA);

    // 5. Använd some för att kolla om någon rätt innehåller 'Nuts'
    const hasNuts = meals.some(meal => meal.strMeal.includes('Nuts'));
    console.log('Finns det någon rätt med Nuts?', hasNuts);

    // 6. Använd every för att kolla om alla rätter har ett namn
    const allHaveNames = meals.every(meal => meal.strMeal);
    console.log('Har alla rätter ett namn?', allHaveNames);

    // 7. Använd sort för att sortera måltider alfabetiskt
    const sortedMeals = meals.map(meal => meal.strMeal).sort();
    console.log('Sorterade måltider:', sortedMeals);

    // 8. Använd slice för att ta de 5 första måltiderna
    const firstFiveMeals = meals.slice(0, 5);
    console.log('Första 5 måltiderna:', firstFiveMeals);

    // 9. Om du vill platta ut alla ingredienser med flatMap
    const allIngredients = meals.flatMap(meal => {
      return Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i+1}`])
        .filter(ing => ing); // ta bort null/empty
    });
    console.log('Alla ingredienser plattade i en array:', allIngredients);
  })
  .catch(error => console.error('Fel vid hämtning av API:', error));
