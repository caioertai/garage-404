// ============================================================================
// Parameters
// ============================================================================
// Base URL of our API (with the wat-garage :slug)
// Check the documentation on the livecode description for more
const baseURL = "https://wagon-garage-api.herokuapp.com/wat-garage";

// ============================================================================
// Select Elements (check index.html to understand them)
// ============================================================================
// The list where the cars will be inserted
const carsList = document.querySelector(".cars-list");

// The inputs from the car form
const brandInput = document.querySelector("#brand");
const modelInput = document.querySelector("#model");
const plateInput = document.querySelector("#plate");
const ownerInput = document.querySelector("#owner");

// ============================================================================
// Functions
// ============================================================================
// Build a car tag when given a car object like { brand: "", model: "", ... }
// as does our API
const carTagBuilder = (car) => {
  const carName = `${car.brand} ${car.model}`;
  return `
    <div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/${carName}" />
      </div>
      <div class="car-info">
        <h4>${carName}</h4>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
    </div>
  `;
};

// Inserts a car into the list when give a car object
const insertCar = (car) => {
  // Arguments:                  where         HTML string
  carsList.insertAdjacentHTML("beforeEnd", carTagBuilder(car));
};

// Displays cars in the HTML When given an array of car objects
const displayCars = (cars) => {
  // Clean the list
  carsList.innerHTML = "";
  // Start inserting them with the function insertCat above
  cars.forEach(insertCar);
};

// Gets cars from the API
// GET /cars
const fetchCars = () => {
  fetch(`${baseURL}/cars`)
    .then(response => response.json())
    .then(displayCars);
};

// Posts cars in the API when given a car object
// POST /cars
const postCar = (carObject) => {
  fetch(`${baseURL}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carObject)
  }).then(response => response.json())
    .then(fetchCars);
};

// Defines the behavior of the car form
const handleCarForm = (event) => {
  // Stop form from doing its default (requesting a page)
  event.preventDefault();

  // Get the form input values to build a car object
  const car = {
    brand: brandInput.value,
    model: modelInput.value,
    owner: plateInput.value,
    plate: ownerInput.value
  };

  // Post the car to the API
  postCar(car);
};

// ============================================================================
// Export
// ============================================================================
// Make fetchCars and handleCarForm available for import in app.js
export { fetchCars, handleCarForm };
