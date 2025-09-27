# 🍳 Interactive Recipe Finder

An intelligent web application that helps users discover amazing recipes using the **Edamam Meal Planner API**.  
Enter the ingredients you have, filter by **meal type** and **calorie range**, and instantly get delicious recipes tailored to your needs.  

---

## 🚀 Features

- **Ingredient-based Search** → Find recipes using what you already have at home.  
- **Meal Type Filters** → Choose from *Breakfast, Lunch, or Dinner*.  
- **Calorie Range Filter** → Refine searches by calorie range (e.g., `200-600`).  
- **Recent Searches Sidebar** → Stores your last searches for quick access.  
- **Highlight Persistence** → Last searched ingredient remains highlighted after page reload.  
- **Clear Search History** → Easily reset your history with one click.  
- **Modern UI/UX** → Built with **Bootstrap 5** and custom animations.  
- **LocalStorage Support** → Recipes & searches remain visible even after refresh.  

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript (ES6)  
- **API Integration:** [Edamam Meal Planner API](https://developer.edamam.com/)  
- **Deployment:** Works on any static server (e.g., **VS Code Live Server**, Netlify, GitHub Pages)  

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/interactive-recipe-finder.git
   cd interactive-recipe-finder
   ```

2. **Add your API credentials**  
   Open `script.js` and replace the placeholders with your Edamam App ID and Key:
   ```javascript
   const APP_ID = "YOUR_APP_ID";
   const APP_KEY = "YOUR_APP_KEY";
   ```

3. **Run the project**
   - Using **VS Code Live Server**:  
     Right-click `index.html` → *Open with Live Server*  

   - Or use Python HTTP server:
     ```bash
     python -m http.server 5500
     ```

4. **Open your browser**
   ```
   http://localhost:5500
   ```

---

<img width="2531" height="1268" alt="image" src="https://github.com/user-attachments/assets/2b31d618-e5ce-4d2b-b0e8-bb869b5235f7" />

<img width="2519" height="943" alt="image" src="https://github.com/user-attachments/assets/5df91955-c8c3-4a07-805f-1d575ebabfb0" />

<img width="2301" height="1337" alt="image" src="https://github.com/user-attachments/assets/b2f41628-dce3-43d9-987f-f998e0bfeb6d" />

<img width="2520" height="1370" alt="image" src="https://github.com/user-attachments/assets/c86fb403-9291-45b7-bfbe-1c7ea7972fae" />


## 🔑 Example API Call

```url
https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY&mealType=dinner&calories=200-600
```

---

## 🧑‍💻 Project Structure

```bash
├── index.html       # Main UI
├── style.css        # Styling (Bootstrap + custom CSS)
├── script.js        # API integration, search logic, localStorage
└── README.md        # Project documentation
```

---

## 📌 Future Scope

- User authentication & personalized meal plans  
- Backend integration for storing user preferences  
- AI-powered recipe recommendations  
- Mobile App (React Native / Flutter)  
- Voice assistant integration  

---

## 🙌 Acknowledgements

- [Edamam API](https://developer.edamam.com/) for recipe data  
- [Bootstrap 5](https://getbootstrap.com/) for responsive design  
- [Unsplash](https://unsplash.com/) for hero images  

---

## 📄 License

This project is licensed under the **MIT License**.
