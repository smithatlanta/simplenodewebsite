var prevKeydown = 0;

$(document).ready(function () {
	var now = new Date();
	$('#date').val(  (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() );

	$('.dropdown-toggle').dropdown();

	loadDropdown("/reviewers", "#reviewer", "#input-hiddenreviewer");

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