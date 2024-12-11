
// load data


//load categories
const loadCategories = async () => {
    const  response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    
    if(response.status !== 200){
        throw new Error('Could not load categories!')
    }

    const categories = await response.json();

    return categories.meals;
}

//load areas
const loadAreas = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    
    if(response.status !== 200){
        throw new Error('Could not load areas!')
    }

    const areas = await response.json();

    return areas.meals;
}

// load meals by Name

const loadMealsByName = async(name) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);

    if(response.status !== 200){
        throw new Error("Could not load data!");
        
    }

    const meals = await response.json();
    
    return meals.meals;
}

// load meals by category

const loadMealsByCategory = async(name) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);

    if(response.status !== 200){
        throw new Error("Could not load data!");
        
    }

    const meals = await response.json();
    
    return meals.meals;
}

// load meals by area

const loadMealsByArea = async(name) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);

    if(response.status !== 200){
        throw new Error("Could not load data!");
        
    }

    const meals = await response.json();
    
    return meals.meals;
}

const loadMealsByType = async (type, keyword) => {
    
    let data;
    switch (type) {
        case 'Name':
                       
            data = await loadMealsByName(keyword)
            break;
        case 'Category':
           
            data = await loadMealsByCategory(keyword)
            break;
        case 'Area':
            
            data = await loadMealsByArea(keyword)
            break;
    
        default:
            break;
    }

    return data;
}

///load meal by id
const loadMealById = async(id) => {
    
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    
    if(response.status !== 200){
        throw new Error("Could not load data!");
    }

    const meal = await response.json();
   
    return meal.meals;
}