// Function to get tickets from local storage
function getTicketsFromLocalStorage() {
  const storedTickets = localStorage.getItem('tickets');
  return storedTickets ? JSON.parse(storedTickets) : [];
}

// Function to save tickets to local storage
function saveTicketsToLocalStorage(tickets) {
  localStorage.setItem('tickets', JSON.stringify(tickets));
}

// Sample data for demonstration
let sampleTickets = getTicketsFromLocalStorage();

// Function to display support tickets in a table
function displayTicketsInTable() {
  const ticketTableBody = $('#ticketTableBody');
  ticketTableBody.empty();

  sampleTickets.forEach((ticket, index) => {
    ticketTableBody.append(`
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${ticket.title}</td>
        <td>${ticket.requested}</td>
        <td>
          <select class="form-select ticket-status" data-ticket-index="${index}">
            <option value="Open" ${ticket.status === 'Open' ? 'selected' : ''}>Open</option>
            <option value="Pending" ${ticket.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Solved" ${ticket.status === 'Solved' ? 'selected' : ''}>Solved</option>
          </select>
        </td>
        <td>
          <select class="form-select ticket-priority" data-ticket-index="${index}">
            <option value="Low" ${ticket.priority === 'Low' ? 'selected' : ''}>Low</option>
            <option value="Medium" ${ticket.priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="High" ${ticket.priority === 'High' ? 'selected' : ''}>High</option>
          </select>
        </td>
        <td>
          <button class="btn btn-outline-danger btn-sm btn-delete" data-ticket-index="${index}">X</button>
        </td>
      </tr>
    `);
  });

  // Event listener for changes in ticket status
  $('.ticket-status').change(function () {
    const index = $(this).data('ticket-index');
    sampleTickets[index].status = $(this).val();
    saveTicketsToLocalStorage(sampleTickets);
  });

  // Event listener for changes in ticket priority
  $('.ticket-priority').change(function () {
    const index = $(this).data('ticket-index');
    sampleTickets[index].priority = $(this).val();
    saveTicketsToLocalStorage(sampleTickets);
  });
  $('.btn-delete').click(function () {
    const index = $(this).data('ticket-index');
    sampleTickets.splice(index, 1);
    saveTicketsToLocalStorage(sampleTickets);
    displayTicketsInTable();
  });
}

// Event listener for ticket form submission
$('#ticketForm').submit(function (event) {
  event.preventDefault();

  const now = new Date();
  const newTicket = {
    id: sampleTickets.length + 1,
    title: $('#issueTitle').val(),
    requested: now.toLocaleString(),
    status: $('#ticketStatus').val(),
    priority: $('#priority').val(),
  };

  sampleTickets.push(newTicket);
  saveTicketsToLocalStorage(sampleTickets);
  displayTicketsInTable();
  // Clear the form
  $(this)[0].reset();
});

// Initial display
$(document).ready(function () {
  displayTicketsInTable();
});
