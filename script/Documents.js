$(document).ready(function () {
  let editIndex = -1;

  // Load data from local storage
  function loadUploads() {
    const myUploads = JSON.parse(localStorage.getItem("myUploads")) || [];
    const sharedUploads =
      JSON.parse(localStorage.getItem("sharedUploads")) || [];

    $("#myUploadsTable tbody").empty();
    myUploads.forEach((upload, index) => {
      $("#myUploadsTable tbody").append(`
                <tr>
                    <td>${upload.label}</td>
                    <td>${upload.fileName}</td>
                    <td class="action-buttons">
                        <a href="#" class="edit-upload" data-index="${index}">Edit</a>
                        <a href="#" class="delete-upload" data-index="${index}">Delete</a>
                    </td>
                </tr>
            `);
    });

    $("#sharedUploadsTable tbody").empty();
    sharedUploads.forEach((upload) => {
      $("#sharedUploadsTable tbody").append(`
                <tr>
                    <td>${upload.label}</td>
                    <td>${upload.fileName}</td>
                    <td>${upload.sharedBy}</td>
                </tr>
            `);
    });
  }

  // Save upload data
  $("#uploadForm").on("submit", function (event) {
    event.preventDefault();
    const label = $("#labelInput").val();
    const fileName = $("#fileNameInput").val();
    const myUploads = JSON.parse(localStorage.getItem("myUploads")) || [];

    if (editIndex === -1) {
      myUploads.push({ label, fileName });
    } else {
      myUploads[editIndex] = { label, fileName };
      editIndex = -1;
    }

    localStorage.setItem("myUploads", JSON.stringify(myUploads));
    $("#uploadModal").modal("hide");
    loadUploads();
    this.reset();
  });

  // Edit upload
  $(document).on("click", ".edit-upload", function () {
    editIndex = $(this).data("index");
    const myUploads = JSON.parse(localStorage.getItem("myUploads"));
    const upload = myUploads[editIndex];

    $("#labelInput").val(upload.label);
    $("#fileNameInput").val(upload.fileName);
    $("#uploadModalLabel").text("Edit Upload");
    $("#uploadModal").modal("show");
  });

  // Delete upload
  $(document).on("click", ".delete-upload", function () {
    const index = $(this).data("index");
    let myUploads = JSON.parse(localStorage.getItem("myUploads"));
    myUploads.splice(index, 1);
    localStorage.setItem("myUploads", JSON.stringify(myUploads));
    loadUploads();
  });

  // Initialize
  loadUploads();
});
$(document).ready(function () {
  if (!localStorage.getItem("sharedUploads")) {
    const sharedUploads = [
      {
        label: "Sales Team Attendance Sept 2014",
        fileName: "Sale-Attend-Sep2014.xls",
        sharedBy: "anne.hunter@mail.com",
      },
      {
        label: "Office Rules",
        fileName: "OfficeRule.doc",
        sharedBy: "hr@office.com",
      },
    ];
    localStorage.setItem("sharedUploads", JSON.stringify(sharedUploads));
  }
  // The rest of the code...
});
