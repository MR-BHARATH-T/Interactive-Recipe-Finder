// ----------------------
// ⚡ YOUR EDAMAM MEAL PLANNER CREDENTIALS ⚡
// Replace with your new App ID & App Key from Edamam
// ----------------------
const APP_ID = "8bae8ad1";
const APP_KEY = "d63a4d7b0bbac4026aeb80c46a0cd9e0";
const USER_ID = "YOUR_USER_ID_HERE"; // Replace with your Edamam user ID

// Elements
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearHistoryBtn");
const ingredientInput = document.getElementById("ingredientInput");
const mealTypeSelect = document.getElementById("mealTypeSelect");
const calorieInput = document.getElementById("calorieInput");
const resultsDiv = document.getElementById("results");
const recentSearchesList = document.getElementById("recentSearches");

// ----------------------
// Event Listeners
// ----------------------
searchBtn.addEventListener("click", () => {
  const ingredients = ingredientInput.value.trim();
  const mealType = mealTypeSelect.value;
  const calories = calorieInput.value.trim();

  if (ingredients) fetchRecipes(ingredients, mealType, calories);
  else alert("Please enter at least one ingredient.");
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("lastRecipes");
  localStorage.removeItem("recentSearches");
  localStorage.removeItem("lastSelectedSearch");
  resultsDiv.innerHTML = `<p class="text-center text-muted">History cleared. Search for recipes to see results.</p>`;
  recentSearchesList.innerHTML = "";
  clearBtn.classList.add("d-none");
  ingredientInput.value = "";
  mealTypeSelect.value = "";
  calorieInput.value = "";
});

// ----------------------
// Load last recipes & recent searches on page load
// ----------------------
window.addEventListener("DOMContentLoaded", () => {
  const savedRecipes = localStorage.getItem("lastRecipes");
  if (savedRecipes) {
    displayRecipes(JSON.parse(savedRecipes));
    clearBtn.classList.remove("d-none");
  }

  const savedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
  const lastSelected = localStorage.getItem("lastSelectedSearch") || "";
  renderRecentSearches(savedSearches, lastSelected);
});

// ----------------------
// Fetch Recipes from Meal Planner v2 API
// ----------------------
async function fetchRecipes(ingredients, mealType = "", calories = "") {
  resultsDiv.innerHTML = `<p class="text-center text-muted">Loading recipes...</p>`;

  // Correct v2 API endpoint
  let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(ingredients)}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12`;
  if (mealType) url += `&mealType=${mealType}`;
  if (calories) url += `&calories=${encodeURIComponent(calories)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Edamam-Account-User': USER_ID
      }
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    if (!data.hits.length) {
      resultsDiv.innerHTML = `<p class="text-center text-warning">No recipes found. Try different ingredients or filters.</p>`;
      return;
    }

    // Save recipes
    localStorage.setItem("lastRecipes", JSON.stringify(data.hits));
    displayRecipes(data.hits);
    clearBtn.classList.remove("d-none");

    // Update recent searches & highlight
    updateRecentSearches(ingredients);

  } catch (error) {
    console.error("Fetch error:", error);
    resultsDiv.innerHTML = `<p class="text-center text-danger">Something went wrong. Please check the console.</p>`;
  }
}

// ----------------------
// Display recipes
// ----------------------
function displayRecipes(recipes) {
  resultsDiv.innerHTML = "";

  recipes.forEach(item => {
    const recipe = item.recipe;
    const col = document.createElement("div");
    col.classList.add("col-md-4");

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${recipe.images?.THUMBNAIL?.url || recipe.image}" class="card-img-top" alt="${recipe.label}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${recipe.label}</h5>
          <p class="card-text">
            <strong>Ingredients:</strong> ${recipe.ingredientLines.slice(0, 5).join(", ")}...
          </p>
          <a href="${recipe.url}" target="_blank" class="btn btn-primary mt-auto">View Recipe</a>
        </div>
      </div>
    `;

    resultsDiv.appendChild(col);
  });
}

// ----------------------
// Recent Searches & Highlight
// ----------------------
function updateRecentSearches(ingredients) {
  let searches = JSON.parse(localStorage.getItem("recentSearches") || "[]");

  // Remove duplicates
  searches = searches.filter(item => item.toLowerCase() !== ingredients.toLowerCase());

  searches.unshift(ingredients);
  if (searches.length > 10) searches.pop();

  localStorage.setItem("recentSearches", JSON.stringify(searches));
  localStorage.setItem("lastSelectedSearch", ingredients);
  renderRecentSearches(searches, ingredients);
}

function renderRecentSearches(searches, highlight = "") {
  recentSearchesList.innerHTML = "";
  searches.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "list-group-item-action");
    li.textContent = item;

    if (item === highlight) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      ingredientInput.value = item;
      localStorage.setItem("lastSelectedSearch", item);
      fetchRecipes(item, mealTypeSelect.value, calorieInput.value);
      renderRecentSearches(searches, item); // highlight clicked
    });

    recentSearchesList.appendChild(li);
  });
}


