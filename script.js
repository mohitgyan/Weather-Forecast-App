/* =========================================================
   SKYLINE WEATHER DASHBOARD — SCRIPT.JS
   Pure Vanilla JS. No Fetch API, no external Weather API.
   All data lives in the local "weatherDatabase" array below,
   so the whole app works fully offline.
   ========================================================= */

/* ---------------------------------------------------------
   1. LOCAL WEATHER DATABASE
   Each city object holds current conditions + a 7-day forecast.
   Temperatures are stored in Celsius; we convert to Fahrenheit
   on the fly when the user toggles units.
   --------------------------------------------------------- */
const weatherDatabase = [
  {
    city: "Delhi",
    country: "India",
    temp: 36,
    condition: "Sunny",
    icon: "☀️",
    humidity: 42,
    wind: 14,
    pressure: 1008,
    visibility: 8,
    feelsLike: 39,
    forecast: [
      { day: "Mon", temp: 37, condition: "Sunny", icon: "☀️" },
      { day: "Tue", temp: 38, condition: "Sunny", icon: "☀️" },
      { day: "Wed", temp: 35, condition: "Hazy", icon: "🌤️" },
      { day: "Thu", temp: 33, condition: "Cloudy", icon: "☁️" },
      { day: "Fri", temp: 31, condition: "Thunderstorm", icon: "⛈️" },
      { day: "Sat", temp: 32, condition: "Rain", icon: "🌧️" },
      { day: "Sun", temp: 34, condition: "Sunny", icon: "☀️" }
    ]
  },
  {
    city: "Mumbai",
    country: "India",
    temp: 30,
    condition: "Humid",
    icon: "🌥️",
    humidity: 78,
    wind: 18,
    pressure: 1004,
    visibility: 6,
    feelsLike: 34,
    forecast: [
      { day: "Mon", temp: 30, condition: "Rain", icon: "🌧️" },
      { day: "Tue", temp: 29, condition: "Rain", icon: "🌧️" },
      { day: "Wed", temp: 29, condition: "Thunderstorm", icon: "⛈️" },
      { day: "Thu", temp: 30, condition: "Cloudy", icon: "☁️" },
      { day: "Fri", temp: 31, condition: "Humid", icon: "🌥️" },
      { day: "Sat", temp: 31, condition: "Sunny", icon: "☀️" },
      { day: "Sun", temp: 30, condition: "Cloudy", icon: "☁️" }
    ]
  },
  {
    city: "London",
    country: "United Kingdom",
    temp: 17,
    condition: "Cloudy",
    icon: "☁️",
    humidity: 68,
    wind: 22,
    pressure: 1015,
    visibility: 10,
    feelsLike: 15,
    forecast: [
      { day: "Mon", temp: 16, condition: "Rain", icon: "🌧️" },
      { day: "Tue", temp: 15, condition: "Cloudy", icon: "☁️" },
      { day: "Wed", temp: 17, condition: "Windy", icon: "🌬️" },
      { day: "Thu", temp: 18, condition: "Sunny", icon: "☀️" },
      { day: "Fri", temp: 16, condition: "Cloudy", icon: "☁️" },
      { day: "Sat", temp: 15, condition: "Rain", icon: "🌧️" },
      { day: "Sun", temp: 17, condition: "Partly Cloudy", icon: "🌤️" }
    ]
  },
  {
    city: "New York",
    country: "USA",
    temp: 24,
    condition: "Clear",
    icon: "🌤️",
    humidity: 55,
    wind: 16,
    pressure: 1012,
    visibility: 12,
    feelsLike: 25,
    forecast: [
      { day: "Mon", temp: 25, condition: "Clear", icon: "🌤️" },
      { day: "Tue", temp: 26, condition: "Sunny", icon: "☀️" },
      { day: "Wed", temp: 23, condition: "Cloudy", icon: "☁️" },
      { day: "Thu", temp: 22, condition: "Rain", icon: "🌧️" },
      { day: "Fri", temp: 21, condition: "Thunderstorm", icon: "⛈️" },
      { day: "Sat", temp: 23, condition: "Clear", icon: "🌤️" },
      { day: "Sun", temp: 24, condition: "Sunny", icon: "☀️" }
    ]
  },
  {
    city: "Tokyo",
    country: "Japan",
    temp: 27,
    condition: "Partly Cloudy",
    icon: "🌤️",
    humidity: 60,
    wind: 12,
    pressure: 1010,
    visibility: 10,
    feelsLike: 29,
    forecast: [
      { day: "Mon", temp: 27, condition: "Partly Cloudy", icon: "🌤️" },
      { day: "Tue", temp: 28, condition: "Sunny", icon: "☀️" },
      { day: "Wed", temp: 26, condition: "Rain", icon: "🌧️" },
      { day: "Thu", temp: 25, condition: "Rain", icon: "🌧️" },
      { day: "Fri", temp: 26, condition: "Cloudy", icon: "☁️" },
      { day: "Sat", temp: 27, condition: "Sunny", icon: "☀️" },
      { day: "Sun", temp: 28, condition: "Sunny", icon: "☀️" }
    ]
  },
  {
    city: "Paris",
    country: "France",
    temp: 19,
    condition: "Partly Cloudy",
    icon: "🌤️",
    humidity: 58,
    wind: 14,
    pressure: 1013,
    visibility: 11,
    feelsLike: 18,
    forecast: [
      { day: "Mon", temp: 19, condition: "Cloudy", icon: "☁️" },
      { day: "Tue", temp: 20, condition: "Sunny", icon: "☀️" },
      { day: "Wed", temp: 18, condition: "Rain", icon: "🌧️" },
      { day: "Thu", temp: 17, condition: "Windy", icon: "🌬️" },
      { day: "Fri", temp: 19, condition: "Partly Cloudy", icon: "🌤️" },
      { day: "Sat", temp: 21, condition: "Sunny", icon: "☀️" },
      { day: "Sun", temp: 20, condition: "Clear", icon: "🌤️" }
    ]
  },
  {
    city: "Sydney",
    country: "Australia",
    temp: 22,
    condition: "Sunny",
    icon: "☀️",
    humidity: 50,
    wind: 20,
    pressure: 1017,
    visibility: 14,
    feelsLike: 21,
    forecast: [
      { day: "Mon", temp: 22, condition: "Sunny", icon: "☀️" },
      { day: "Tue", temp: 23, condition: "Clear", icon: "🌤️" },
      { day: "Wed", temp: 21, condition: "Windy", icon: "🌬️" },
      { day: "Thu", temp: 20, condition: "Rain", icon: "🌧️" },
      { day: "Fri", temp: 19, condition: "Cloudy", icon: "☁️" },
      { day: "Sat", temp: 21, condition: "Sunny", icon: "☀️" },
      { day: "Sun", temp: 22, condition: "Sunny", icon: "☀️" }
    ]
  },
  {
    city: "Dubai",
    country: "UAE",
    temp: 41,
    condition: "Sunny",
    icon: "☀️",
    humidity: 30,
    wind: 10,
    pressure: 1006,
    visibility: 9,
    feelsLike: 45,
    forecast: [
      { day: "Mon", temp: 42, condition: "Sunny", icon: "☀️" },
      { day: "Tue", temp: 43, condition: "Sunny", icon: "☀️" },
      { day: "Wed", temp: 41, condition: "Hazy", icon: "🌤️" },
      { day: "Thu", temp: 40, condition: "Sunny", icon: "☀️" },
      { day: "Fri", temp: 39, condition: "Windy", icon: "🌬️" },
      { day: "Sat", temp: 40, condition: "Sunny", icon: "☀️" },
      { day: "Sun", temp: 41, condition: "Sunny", icon: "☀️" }
    ]
  },
  {
    city: "Singapore",
    country: "Singapore",
    temp: 29,
    condition: "Thunderstorm",
    icon: "⛈️",
    humidity: 82,
    wind: 13,
    pressure: 1009,
    visibility: 7,
    feelsLike: 33,
    forecast: [
      { day: "Mon", temp: 29, condition: "Thunderstorm", icon: "⛈️" },
      { day: "Tue", temp: 28, condition: "Rain", icon: "🌧️" },
      { day: "Wed", temp: 29, condition: "Cloudy", icon: "☁️" },
      { day: "Thu", temp: 30, condition: "Humid", icon: "🌥️" },
      { day: "Fri", temp: 30, condition: "Sunny", icon: "☀️" },
      { day: "Sat", temp: 29, condition: "Rain", icon: "🌧️" },
      { day: "Sun", temp: 28, condition: "Thunderstorm", icon: "⛈️" }
    ]
  },
  {
    city: "Moscow",
    country: "Russia",
    temp: 12,
    condition: "Snow",
    icon: "❄️",
    humidity: 75,
    wind: 19,
    pressure: 1019,
    visibility: 5,
    feelsLike: 9,
    forecast: [
      { day: "Mon", temp: 11, condition: "Snow", icon: "❄️" },
      { day: "Tue", temp: 10, condition: "Snow", icon: "❄️" },
      { day: "Wed", temp: 9, condition: "Cloudy", icon: "☁️" },
      { day: "Thu", temp: 8, condition: "Windy", icon: "🌬️" },
      { day: "Fri", temp: 10, condition: "Clear", icon: "🌤️" },
      { day: "Sat", temp: 12, condition: "Sunny", icon: "☀️" },
      { day: "Sun", temp: 13, condition: "Cloudy", icon: "☁️" }
    ]
  }
];

/* ---------------------------------------------------------
   2. APP STATE
   --------------------------------------------------------- */
let currentUnit = "C";          // "C" or "F"
let activeCity = null;          // the city object currently displayed
let refreshTimerId = null;      // setInterval id for the 1-minute refresh
let clockTimerId = null;        // setInterval id for the live clock

/* ---------------------------------------------------------
   3. DOM REFERENCES
   Grabbing all elements once, up front, keeps the rest of the
   code easy to read.
   --------------------------------------------------------- */
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const loader = document.getElementById("loader");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
const dashboard = document.getElementById("weatherDashboard");
const emptyState = document.getElementById("emptyState");
const historyChips = document.getElementById("historyChips");
const unitToggle = document.getElementById("unitToggle");
const unitLabel = document.getElementById("unitLabel");
const skyBackdrop = document.getElementById("skyBackdrop");

/* ---------------------------------------------------------
   4. HELPER FUNCTIONS
   --------------------------------------------------------- */

// Convert Celsius to Fahrenheit and round to nearest whole number
function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

// Format a temperature number according to the currently selected unit
function formatTemp(celsiusValue) {
  const value = currentUnit === "C" ? celsiusValue : toFahrenheit(celsiusValue);
  return `${value}°${currentUnit}`;
}

// Find a city in the local database (case-insensitive, trims spaces)
function findCity(name) {
  const query = name.trim().toLowerCase();
  return weatherDatabase.find((entry) => entry.city.toLowerCase() === query);
}

/* ---------------------------------------------------------
   5. LOADER CONTROL
   --------------------------------------------------------- */
function showLoader() {
  loader.classList.remove("hidden");
  dashboard.classList.add("hidden");
  errorState.classList.add("hidden");
  emptyState.classList.add("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

/* ---------------------------------------------------------
   6. LOCAL STORAGE HELPERS
   --------------------------------------------------------- */

// Save the most recently viewed city name
function saveLastCity(cityName) {
  try {
    localStorage.setItem("skyline_lastCity", cityName);
  } catch (err) {
    console.error("Could not save last city:", err);
  }
}

// Load the most recently viewed city name (or null if none saved)
function loadLastCity() {
  try {
    return localStorage.getItem("skyline_lastCity");
  } catch (err) {
    console.error("Could not read last city:", err);
    return null;
  }
}

// Add a city to the search history, keeping only the last 5 unique entries
function addToHistory(cityName) {
  try {
    let history = JSON.parse(localStorage.getItem("skyline_history")) || [];
    // Remove the city if it's already in the list, then push it to the front
    history = history.filter((item) => item.toLowerCase() !== cityName.toLowerCase());
    history.unshift(cityName);
    history = history.slice(0, 5); // keep only 5 most recent
    localStorage.setItem("skyline_history", JSON.stringify(history));
    renderHistory(history);
  } catch (err) {
    console.error("Could not update history:", err);
  }
}

// Load and render the search history chips
function loadHistory() {
  try {
    const history = JSON.parse(localStorage.getItem("skyline_history")) || [];
    renderHistory(history);
  } catch (err) {
    console.error("Could not load history:", err);
  }
}

// Draw the history chips into the DOM
function renderHistory(history) {
  historyChips.innerHTML = "";
  if (history.length === 0) {
    historyChips.innerHTML = `<span class="history-label">No searches yet</span>`;
    return;
  }
  history.forEach((cityName) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "history-chip";
    chip.textContent = cityName;
    chip.addEventListener("click", () => handleSearch(cityName));
    historyChips.appendChild(chip);
  });
}

/* ---------------------------------------------------------
   7. DISPLAY FUNCTIONS
   --------------------------------------------------------- */

// Render the current weather section
function displayCurrentWeather(data) {
  document.getElementById("cityName").textContent = `${data.city}, ${data.country}`;
  document.getElementById("cityCondition").textContent = data.condition;
  document.getElementById("currentIcon").textContent = data.icon;
  document.getElementById("currentTemp").textContent = formatTemp(data.temp);
  document.getElementById("feelsLike").textContent = `Feels like ${formatTemp(data.feelsLike)}`;
  document.getElementById("statHumidity").textContent = `${data.humidity}%`;
  document.getElementById("statWind").textContent = `${data.wind} km/h`;
  document.getElementById("statPressure").textContent = `${data.pressure} hPa`;
  document.getElementById("statVisibility").textContent = `${data.visibility} km`;

  const now = new Date();
  document.getElementById("lastUpdated").textContent = now.toLocaleTimeString();

  updateBackdrop(data.condition);
}

// Render the 7-day forecast grid
function displayForecast(data) {
  const forecastGrid = document.getElementById("forecastGrid");
  forecastGrid.innerHTML = ""; // clear previous forecast

  data.forecast.forEach((day) => {
    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <p class="forecast-day">${day.day}</p>
      <div class="forecast-icon">${day.icon}</div>
      <p class="forecast-temp">${formatTemp(day.temp)}</p>
      <p class="forecast-condition">${day.condition}</p>
    `;
    forecastGrid.appendChild(card);
  });
}

// Lightly tint the background based on the current condition (purely cosmetic)
function updateBackdrop(condition) {
  const lower = condition.toLowerCase();
  let filter = "none";
  if (lower.includes("rain") || lower.includes("storm")) filter = "brightness(0.85) saturate(1.1)";
  else if (lower.includes("snow")) filter = "brightness(1.05) saturate(0.7)";
  else if (lower.includes("sun") || lower.includes("clear")) filter = "brightness(1.1) saturate(1.15)";
  skyBackdrop.style.filter = filter;
}

/* ---------------------------------------------------------
   8. CORE "FETCH" LOGIC
   No real network request is made — fetchWeather() simulates
   the delay of a real API call using setTimeout(), and wraps
   the lookup in a try/catch so errors are handled gracefully.
   --------------------------------------------------------- */
function fetchWeather(cityName) {
  return new Promise((resolve, reject) => {
    // Simulate 1-2 seconds of "network" latency
    const delay = 1000 + Math.random() * 1000;
    setTimeout(() => {
      try {
        const result = findCity(cityName);
        if (result) {
          resolve(result);
        } else {
          reject(new Error("City Not Found"));
        }
      } catch (err) {
        reject(err);
      }
    }, delay);
  });
}

// Orchestrates a full search: loader -> simulated fetch -> render or error
async function handleSearch(cityName) {
  if (!cityName || cityName.trim() === "") return;

  showLoader();

  try {
    const data = await fetchWeather(cityName);
    activeCity = data;

    hideLoader();
    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");
    dashboard.classList.remove("hidden");

    displayCurrentWeather(data);
    displayForecast(data);

    saveLastCity(data.city);
    addToHistory(data.city);
    restartRefreshTimer();
  } catch (err) {
    hideLoader();
    dashboard.classList.add("hidden");
    emptyState.classList.add("hidden");
    errorState.classList.remove("hidden");
    errorMessage.textContent = `We couldn't find "${cityName}" in our dataset. Try: Delhi, Mumbai, London, New York, Tokyo, Paris, Sydney, Dubai, Singapore, Moscow.`;
    console.error(err.message);
  }
}

// Wrapper kept for readability / matches the "searchWeather()" naming requirement
function searchWeather() {
  const cityName = cityInput.value;
  handleSearch(cityName);
  cityInput.value = "";
}

/* ---------------------------------------------------------
   9. AUTO-REFRESH (every 1 minute)
   Simulates "live" data by nudging the numbers of the active
   city slightly, entirely from the local dataset — no network.
   --------------------------------------------------------- */
function refreshWeather() {
  if (!activeCity) return;

  // Small random fluctuations to mimic real-time changes
  const tempDrift = Math.floor(Math.random() * 3) - 1;   // -1, 0, or +1
  const humidityDrift = Math.floor(Math.random() * 5) - 2; // -2..+2
  const windDrift = Math.floor(Math.random() * 3) - 1;

  activeCity.temp += tempDrift;
  activeCity.feelsLike += tempDrift;
  activeCity.humidity = Math.min(100, Math.max(0, activeCity.humidity + humidityDrift));
  activeCity.wind = Math.max(0, activeCity.wind + windDrift);

  displayCurrentWeather(activeCity);
}

function restartRefreshTimer() {
  if (refreshTimerId) clearInterval(refreshTimerId);
  refreshTimerId = setInterval(refreshWeather, 60000); // every 1 minute
}

/* ---------------------------------------------------------
   10. LIVE DATE & TIME CLOCK
   --------------------------------------------------------- */
function updateClock() {
  const now = new Date();
  document.getElementById("clockTime").textContent = now.toLocaleTimeString();
  document.getElementById("clockDate").textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function startClock() {
  updateClock();
  clockTimerId = setInterval(updateClock, 1000);
}

/* ---------------------------------------------------------
   11. TEMPERATURE UNIT TOGGLE
   --------------------------------------------------------- */
function toggleUnit() {
  currentUnit = currentUnit === "C" ? "F" : "C";
  unitLabel.textContent = `°${currentUnit}`;
  unitToggle.setAttribute("aria-pressed", currentUnit === "F");

  // Re-render currently displayed data in the new unit (no re-fetch needed)
  if (activeCity) {
    displayCurrentWeather(activeCity);
    displayForecast(activeCity);
  }
}

/* ---------------------------------------------------------
   12. EVENT LISTENERS
   --------------------------------------------------------- */
searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop page reload
  searchWeather();
});

// Pressing Enter inside the input also triggers a search (form submit covers this,
// but we keep an explicit listener too, as requested)
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchWeather();
  }
});

unitToggle.addEventListener("click", toggleUnit);

/* ---------------------------------------------------------
   13. INITIALISATION
   On page load: start the clock, load search history, and
   automatically load the last searched city (if any).
   --------------------------------------------------------- */
function init() {
  startClock();
  loadHistory();

  const lastCity = loadLastCity();
  if (lastCity) {
    dashboard.classList.add("hidden");
    handleSearch(lastCity);
  } else {
    emptyState.classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", init);
