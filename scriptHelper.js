// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  const missionTarget = document.getElementById('missionTarget');

  missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
  `;

}

function validateInput(testInput) {
  if (String(testInput).trim() === '') return 'Empty';
  return isNaN(Number(testInput)) ? 'Not a Number' : 'Is a Number';
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {

  const launchStatus = document.getElementById('launchStatus');

  const pilotStatus = document.getElementById('pilotStatus');
  const copilotStatus = document.getElementById('copilotStatus');
  const fuelStatus = document.getElementById('fuelStatus');
  const cargoStatus = document.getElementById('cargoStatus');

  let pilotEmpty = validateInput(pilot) === "Empty";
  let copilotEmpty = validateInput(copilot) === "Empty";
  let fuelEmpty = validateInput(fuelLevel) === "Empty";
  let cargoEmpty = validateInput(cargoMass) === "Empty";

  let pilotValid = validateInput(pilot) === "Not a Number";
  let copilotValid = validateInput(copilot) === "Not a Number";
  let fuelValid = validateInput(fuelLevel) === "Is a Number";
  let cargoValid = validateInput(cargoMass) === "Is a Number";

  if (pilotEmpty || copilotEmpty || fuelEmpty || cargoEmpty) {
    launchStatus.style.color = "inherit";
    launchStatus.innerHTML = "Awaiting Information Before Launch";
    alert("All fields are required!");
  } else if (!pilotValid || !copilotValid || !fuelValid || !cargoValid) {
    launchStatus.style.color = "inherit";
    launchStatus.innerHTML = "Awaiting Information Before Launch";
    alert("Make sure to enter valid information for each field!");
  } else {
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    if (fuelLevel >= 10000) {
      fuelStatus.innerHTML = "Fuel level high enough for launch";
    } else {
      fuelStatus.innerHTML = "Fuel level too low for launch"
    }

    if (cargoMass <= 10000) {
      cargoStatus.innerHTML = "Cargo mass low enough for launch";
    } else {
      cargoStatus.innerHTML = "Cargo mass too heavy for launch"
    }

    if (fuelLevel < 10000 || cargoMass > 10000) {
      list.style.visibility = "visible";
      console.log("\n**************\n", list.style.visibility);
      launchStatus.style.color = "#C7254E";
      launchStatus.innerHTML = "Shuttle Not Ready for Launch"
    } else {
      // list.style.visibility = "hidden";
      launchStatus.style.color = "#419F6A";
      launchStatus.innerHTML = "Shuttle is Ready for Launch"
    }
  }
  
}

async function myFetch() {
  let planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function (response) {
    return response.json();
  });
  return planetsReturned;
}

function pickPlanet(planets) {
  return planets[Math.floor(Math.random() * planets.length)]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
