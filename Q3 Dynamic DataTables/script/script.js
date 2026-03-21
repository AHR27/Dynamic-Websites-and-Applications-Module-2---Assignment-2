$(document).ready(function () {

    $('#employeeTable').DataTable({

        ajax: {
            url: "data/MOCK_DATA.json",
            dataSrc: "",
            },

        columns: [
            { data: "id" },
            { data: "first_name" },
            { data: "last_name" },
            { data: "email" },
            { data: "department" },
            { 
                data: "salary",
                render: function(data) {
                    return "$" + data.toLocaleString();
                }
            }
        ]

    });

});