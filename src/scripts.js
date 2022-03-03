//IMPORTS
import './css/styles.css';
import datepicker from 'js-datepicker';
import dayjs from 'dayjs';



// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/airplane.png';

//GLOBALS
//let dayjs;
let daypicker;



// query selectors
const calendar = document.querySelector('#calendar')
const welcomeName = document.querySelector('#welcomeName')

const datePicker = datepicker('#calendar', {
  onSelect: (instance, date) => {
    //loadHydrationCard(currentUser)
    //hydrationChart.destroy()
    //displayHydrationChart()
    //loadSleepCard(currentUser)
    //sleepChart.destroy()
    //displaySleepChart()
  },
  startDate: new Date(2019, 7, 2),
  minDate: new Date(2019, 7, 2),
  maxDate: new Date(2022, 12, 19)
})