class ReceiptTable extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Creates a shadow root
    var shadow = this.attachShadow({ mode: 'open' });

    // Gets properties value
    var tax = this.getAttribute('tax');
    var colName = this.getAttribute('col');
    var x = this.getElementsByTagName('table');

    // Creates the table
    var tbl = document.createElement('table');
    var tblBody = document.createElement('tbody');

    var cell;
    var cellText;
    var i = 0;

    for (i = 0; i < x['0'].rows.length; i++) {
      var row = document.createElement('tr');
      for (let col = 0; col < x['0'].rows['0'].cells.length; col++) {
        if (i === 0) {
          cell = document.createElement('th');
          cellText = document.createTextNode(x['0'].rows[i].cells[col].innerText);
        } else {
          cell = document.createElement('td');
          cellText = document.createTextNode(x['0'].rows[i].cells[col].innerText);
        }

        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute('border', '2');

    shadow.appendChild(tbl);

    cell.appendChild(cellText);
    row.appendChild(cell);

    addFinalRows('Sub Total: ', getSubTotal());
    addFinalRows('Tax: ', getTax());
    addFinalRows('Total: ', getTotal());

    function getColSum() {
      for (let col = 0; col < x['0'].rows['0'].cells.length; col++) {
        if (x['0'].rows['0'].cells[col].innerText == colName) {
          return col;
        }
      }
    }
    function getSubTotal() {
      let sum = 0;
      let col = getColSum();
      for (let i = 1; i < x['0'].rows.length; i++) {
        sum += parseInt(x['0'].rows[i].cells[col].innerText);
      }
      return sum;
    }
    function getTax() {
      return tax * getSubTotal();
    }
    function getTotal() {
      return getTax() + getSubTotal();
    }
    // Adds subtotal, tax and total rows
    function addFinalRows(string, value) {
      var row = document.createElement('tr');
      row.appendChild(helper(string));
      row.appendChild(helper(value));
      tblBody.appendChild(row);
    }
    function helper(value) {
      var cell = document.createElement('td');
      var cellText = document.createTextNode(value);
      cell.appendChild(cellText);
      return cell;
    }
  }
}

customElements.define('receipt-table', ReceiptTable);

{
  /* <table>

<tr>
    <th>Quantity</th>
    <th>Description</th>
    <th>Unit Price</th>
    <th>cost</th>
</tr>
<tr>
    <td>1</td>
    <td>Norwegian aligator clips</td>
    <td>2.00</td>
    <td>2.00</td>
</tr>
<tr>
    <td>5</td>
    <td>Dragon</td>
    <td>7.00</td>
    <td>35.00</td>
</tr>

</table> */
}
