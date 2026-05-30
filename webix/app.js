webix.ready(function () {
    webix.ui({
        container: "app",
        view: "datatable",
        columns: [
            { id: "summary", header: "Summary", fillspace: true },
            { id: "description", header: "Description", fillspace: true },
            { id: "status", header: "Status" },
            { id: "type", header: "Type" },
            { id: "createdAt", header: "Created" }
        ],
        url: "http://localhost:3000/work-items",
        scheme: {
            data: function (obj) {
                return obj.data
            }
        }
    })
})