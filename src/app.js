// You can check the documentation Postman automatically creates in here:
// https://documenter.getpostman.com/view/1672725/SzmiXcDN?version=latest

// ============================================================================
// Import libraries and plugins
// ============================================================================
import { fetchCars, handleCarForm } from "./cars";

// ============================================================================
// Make ajax calls
// ============================================================================
fetchCars();

// ============================================================================
// Assign behaviors
// ============================================================================
const carForm = document.querySelector("#new-car");
carForm.addEventListener("submit", handleCarForm);
