$(document).ready(function () {
    var formattedDate = new Date($('#date').val());
	$('#date').val(  (formattedDate.getMonth() + 1) + '/' + formattedDate.getDate() + '/' + formattedDate.getFullYear() );

	$('.dropdown-toggle').dropdown();

	loadDropdown("/reviewers", "#reviewer", "#input-hiddenreviewer");

	setActiveRadioButtons(".btn-rating", "#input-hiddenrating");
	setData("#div-notes", "#input-hiddennotes");

	$('#restaurant').prop('disabled', true);

	$('.btn-rating').each(function(index){
		if($(this).hasClass('active'))
			$(this).prop('disabled', false);
		else
			$(this).prop('disabled', true);
	});

	$('#div-notes').prop('contenteditable', false);
});