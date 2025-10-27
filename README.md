# Assignment2
Inlämningsuppgift 2: DL 31 oktober

Annica Gunnrin

---
How I used the code and what does what:
Also see comments in js. I really tried myself but even with help from chapgpt I had difficulties getting the correct result.
I managed to get there, I hope.

Fetch:
I used fetch() twice to get meals starting with "a" (because a only had four in its cateogory)
and "b". If API has no meals (null) we need an empty array to avoid errors. Combine both into a list.

Sort:
I used .sort() to order allMeals alphabetically by their strMeal (name).
- .slice(0,5) keeps only the first 5 items. It shows 0, 1, 2, 3 and 4 since it slices/custs 5 and above. So shows 5 in total.
- .map() extracts only the names so the entire objects aren't printed. I had a problem with that at my first try. 

Filter:
I defined a category (givenCategory): "Dessert".
- .filter() creates new array of only those meals whose strCategory matches.
Used .toLowerCase() on both sides to make it case-insensitive.

Count:
Used .reduce() to create a summary object, the accumulator (acc) starts empty {}.
Each meal has a category. If that category already exists in our object there is +1, otherwise it starts at 1.
The result is showing how many is in each category.

Print:
console.log() to print all results (browser console).


