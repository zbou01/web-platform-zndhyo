const gridOptions = {
  columnDefs: [
    {
      field: 'athlete',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { field: 'sport' },
    { field: 'year', maxWidth: 120 },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
  },
  rowSelection: 'multiple',
  suppressRowClickSelection: true,
  isRowSelectable: (params) => {
    return !!params.data && params.data.year === 2012;
  },
  onFirstDataRendered: (params) => {
    params.api.forEachNode((node) =>
      node.setSelected(!!node.data && node.data.year === 2012)
    );
  },
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});