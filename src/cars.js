const baseURL = "https://wagon-garage-api.herokuapp.com";

// Select Elements
const carsList = document.querySelector(".cars-list");
const brandInput = document.querySelector("#brand");
const modelInput = document.querySelector("#model");
const plateInput = document.querySelector("#plate");
const ownerInput = document.querySelector("#owner");

const carTagBuilder = (car) => {
  // return a car tag
  return `
    <div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
      </div>
      <div class="car-info">
        <h4>${car.brand} ${car.model}</h4>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
    </div>
  `
};

const insertCar = (car) => {
  carsList.insertAdjacentHTML("beforeEnd", carTagBuilder(car));
};

const displayCars = (cars) => {
  carsList.innerHTML = "";
  cars.forEach(insertCar);
};

const fetchCars = () => {
  fetch(`${baseURL}/wat-garage/cars`)
    .then(response => response.json())
    .then(displayCars);
};

const postCar = (carObject) => {
  // Post car
  // Build the fetch POST with the info
  fetch(`${baseURL}/wat-garage/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carObject)
  }).then(response => response.json())
    .then((data) => { fetchCars(); })

};

const handleCarForm = (event) => {
  event.preventDefault();

  // Get the form input values
  // Build a car object
  const car = {
    brand: brandInput.value,
    model: modelInput.value,
    owner: plateInput.value,
    plate: ownerInput.value
  };

  postCar(car);
};

export { fetchCars, handleCarForm };
