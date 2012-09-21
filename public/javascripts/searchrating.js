$(document).ready(function () {
	$('.dropdown-toggle').dropdown();

	var optionButtons = '<button type="button" class="btn btn-primary btn-mini">View</button>';
	$.getJSON('/issignedin', null, function(data) {
		if(data === true){
			optionButtons = '<button type="button" class="btn btn-primary btn-mini">Delete</button>&nbsp;<button type="button" class="btn btn-primary btn-mini">Edit</button>&nbsp;<button type="button" class="btn btn-primary btn-mini">View</button>';
		}
    });
	
	oTable = $('#ratings').dataTable({
        "sDom": "<'row'<'span6'f>l><'span6'r>t<'row'<'span6'i><'span6'p>>",
        "bPaginate": false,
        "oLanguage": {
						"sSearch": "Filter Results:"
					},
		"aoColumns": [
        { "bVisible": true },
        { "bVisible": true },
        { "bVisible": true},
        { "bVisible": true },
        { "bVisible": true },
        { "bVisible": false },
        { "bVisible": true, "bSortable": false }
		],
		"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
			$('td:eq(5)', nRow).html(optionButtons);
		}
    });

	var coll = getParameterByName("collapsed");
	if(coll === "true") {
		$("#accordion-bod").collapse('toggle');
	}

	var isNewQuery = getParameterByName("isnew");
	if(isNewQuery === "") {
		var Rating = new Object({
			restaurant: String,
			date: Date,
			reviewer: String,
			rating: String,
			notes: String
		});

		Rating.restaurant = getParameterByName("restaurant");
		$("#input-restaurant").val(getParameterByName("restaurant"));

		Rating.reviewer = getParameterByName("reviewer");
		$("#input-hiddenreviewer").val(getParameterByName("reviewer"));

		Rating.notes = getParameterByName("notes");
		$("#input-notes").val(getParameterByName("notes"));

		Rating.rating = getParameterByName("rating");
		setActiveCheckButtonsParam(".btn-rating", getParameterByName("rating"), "|");

		$.getJSON('/searchdata', Rating, function(data) {
			$('#ratings').dataTable().fnAddData(data, true);
		});
	}

	loadDropdown("/reviewers", "#reviewer", "#input-hiddenreviewer");

	$(document)
		.on('click', '#search', function(e){
			$("#accordion-bod").collapse('toggle');
			getActiveButtons(".btn-rating.active", "#input-hiddenrating", "|");
		})
		.on('click', '#reset', function(e){
			window.location="/search";
		})
		.on('click', '#ratings tr td button', function(){
			var aCellData = this.innerText;
			var aRowData = oTable.fnGetData(this.parentElement.parentElement);
			if(aCellData == "Delete"){
				bootbox.confirm("Are you sure you want to delete this rating?", "No", "Yes", function(result) {
				if (result) {
					window.location="/ratings/delete/" + aRowData[5] + window.location.search;
				}
			});
			}
			if(aCellData == "Edit"){
				window.location="/ratings/edit/" + aRowData[5];
			}
			if(aCellData == "View"){
				window.location="/ratings/view/" + aRowData[5];
			}
		});
});