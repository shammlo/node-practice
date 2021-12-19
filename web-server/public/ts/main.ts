console.log('Client side Typescript file is loaded');

const weatherAPI = async (address: string = '') => {
    try {
        const response = await fetch(`/weather?address=${address}`);
        const data = await response.json();

        if (data.error) {
            console.log(data.error);
        }
        return data;
    } catch (error) {
        console.error(error);
    }
};
const weatherForm: HTMLFormElement | null = document.querySelector('.form');
const searchValue: HTMLInputElement = document.querySelector('.search-input');
const latitudeText: HTMLElement = document.querySelector('.weather-latitude');
const longitudeText: HTMLElement = document.querySelector('.weather-longitude');
const locationText: HTMLElement = document.querySelector('.weather-location');
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    locationText.textContent = 'Loading...';
    latitudeText.textContent = '';
    longitudeText.textContent = '';
    const data = await weatherAPI(searchValue.value);
    if (data.error) {
        console.log(data.error);
        locationText.textContent = data.error;
    } else {
        locationText.textContent = 'Location : ' + data.location || 'Location not found';
        latitudeText.textContent = 'Latitude : ' + data.latitude || 'Latitude not found';
        longitudeText.textContent = 'Longitude : ' + data.longitude || 'Longitude not found';
    }
});
