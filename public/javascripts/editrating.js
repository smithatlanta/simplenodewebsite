var prevKeydown = 0;

$(document).ready(function () {
    var formattedDate = new Date($('#date').val());
	$('#date').val(  (formattedDate.getMonth() + 1) + '/' + formattedDate.getDate() + '/' + formattedDate.getFullYear() );

	$('.dropdown-toggle').dropdown();

	loadDropdown("/reviewers", "#reviewer", "#input-hiddenreviewer");

	setActiveRadioButtons(".btn-rating", "#input-hiddenrating");
	setData("#div-notes", "#input-hiddennotes");

	$(document)
		.on('change', '#reviewer', function(event){
			$("#input-hiddenreviewer").val(event.target.value);
		})
		.on('click', '.btn-rating', function(event){
			getActiveButtons(".btn-rating.active", "#input-hiddenrating", "|");
		})
		.on('blur', '#div-notes', function(event){
			getData("#div-notes", "#input-hiddennotes");
		})
		.on('keydown', '#div-notes', function(event){
			// bold, italic, enter key logic on item
			if(event.which == 73 && prevKeydown == 17) {
				document.execCommand('italic', false, null);
			}
			if(event.which == 66 && prevKeydown == 17) {
				document.execCommand('bold', false, null);
			}
			prevKeydown = event.which;
		});
});