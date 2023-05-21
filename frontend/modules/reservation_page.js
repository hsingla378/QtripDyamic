import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(config.backendEndpoint + "/reservations");
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  const reservationTable = document.getElementById("reservation-table");
  reservations.map((ele, idx) => {
    let timeAt = new Date(ele.time).toLocaleString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).split(" at").join(",");
    let dTime = timeAt.split(" at");
    let dateTime = dTime.join(",");
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <th>${ele.id}</th>
      <td>${ele.name}</td>
      <td>${ele.adventureName}</td>
      <td>${ele.person}</td>
      <td>${new Date(ele.date).toLocaleDateString("en-IN")}</td>
      <td>${ele.price}</td>
      <td>${dateTime}</td>
      <td>
        <div class="reservation-visit-button" id="${ele.id}">
          <a href="../detail/?adventure=${ele.adventure}">Visit Adventure</a>
        </div>
      </td>
    `;
    reservationTable.appendChild(tableRow);
  });
}

export { fetchReservations, addReservationToTable };
