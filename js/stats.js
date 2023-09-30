function populateTable() {
  const statsTableBody = document.getElementById("stats-table-body");
  const savedUserProgressData = localStorage.getItem('userProgressData');

  // Checks if userProgressData exist in local storage
  if (savedUserProgressData) {
    const userProgressData = JSON.parse(savedUserProgressData);

    // Loops through each data entry and create a new row in the table
    userProgressData.forEach((dataEntry) => {
      const row = document.createElement("tr");

      // Creates table data cells for each entry's properties
      const dateCell = document.createElement("td");
      dateCell.textContent = dataEntry.date;
      row.appendChild(dateCell);

      const wpmCell = document.createElement("td");
      wpmCell.textContent = dataEntry.wpm;
      row.appendChild(wpmCell);

      const accuracyCell = document.createElement("td");
      accuracyCell.textContent = dataEntry.accuracy + "%";
      row.appendChild(accuracyCell);

      statsTableBody.appendChild(row);
    });
  } else {
    // If no data is found, displays a message in the table
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.setAttribute("colspan", "3");
    emptyCell.textContent = "No data available.";
    emptyRow.appendChild(emptyCell);
    statsTableBody.appendChild(emptyRow);
  }
}

document.addEventListener("DOMContentLoaded", populateTable);