
import './css/styles.css';
import datepicker from 'js-datepicker';
import dayjs from 'dayjs'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/airplane.png';







// query selectors
const calendar = document.querySelector('#calendar')

// const datePicker = datepicker('#calendar', {
//   onSelect: (instance, date) => {
//     loadHydrationCard(currentUser)
//     hydrationChart.destroy()
//     displayHydrationChart()
//     loadSleepCard(currentUser)
//     sleepChart.destroy()
//     displaySleepChart()
//   },
//   startDate: new Date(2019, 5, 22),
//   minDate: new Date(2019, 5, 15),
//   maxDate: new Date(2020, 0, 22)
// })