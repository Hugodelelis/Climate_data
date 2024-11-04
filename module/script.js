import { showDate } from "../service/date.js";
import { showHour } from "../service/hour.js";
import { showState } from "../service/selectState.js";
import { showCity, updateCityDisplay } from "../service/selectCity.js";
import { getClimateDataStatus, showStatus, getClimateDatas, showInfoAr, getClimateDataTable, cleanTable } from "../service/climateData.js";
import { savePDF } from "../service/saveData.js";

showDate()
showHour()

showState()
showCity()
updateCityDisplay()

getClimateDataStatus()
showStatus()
getClimateDatas()
showInfoAr()
getClimateDataTable()
cleanTable()

document.querySelector('.save-btn').addEventListener('click', () => {
    savePDF();
})

