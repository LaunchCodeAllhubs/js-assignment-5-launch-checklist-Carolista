// Write your JavaScript code here!

// const { pickPlanet, addDestinationInfo } = require("./scriptHelper");

window.addEventListener('load', function () {
  let listedPlanets;
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
      let selectedPlanet = pickPlanet(listedPlanets);
      console.log(selectedPlanet);
      addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
    });

  const submitButton = document.getElementById("formSubmit");

  submitButton.addEventListener('click', function (event) {

    event.preventDefault();

    const pilotInput = document.getElementById('pilotName');
    const copilotInput = document.getElementById('copilotName');
    const fuelInput = document.getElementById('fuelLevel');
    const cargoInput = document.getElementById('cargoMass');

    const list = document.getElementById('faultyItems');

    formSubmission(document, list, pilotInput.value, copilotInput.value, fuelInput.value, cargoInput.value);
  });
});
