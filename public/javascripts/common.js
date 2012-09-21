function getParameterByName(name)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results === null) {
		return "";
	}
	else
	{
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}
function setData(divtext, hdninput){
	$(divtext)[0].innerHTML = convertNewLinesToHTMLBreaks($(hdninput).val());
}
function convertNewLinesToHTMLBreaks(textToConvert)
{
	return textToConvert.replace(/(\r\n|\n|\r)/gm,"<br/>");
}
function getData(divtext, hdninput){
	$(hdninput).val($(divtext)[0].innerHTML);
}
function getActiveButtons(btns, hdninput, delimiter){
    var activeBtns = "";
    $(btns).each(function(index) {
      activeBtns += this.value;
      if((index + 1) < $(btns).length) {
        activeBtns += delimiter;
      }
    });
    $(hdninput).val(activeBtns);
}

function setActiveRadioButtons(btns, hdninput){
	var origVals = $(hdninput).val();
	$(btns).each(function() {
		if(this.value === origVals){
			this.classList.add("active");
		}
	});
}

function setActiveCheckButtons(btns, hdninput, delimiter){
	var splitItems = $(hdninput).val().split(delimiter);
	$(btns).each(function(item) {
		for(var ctr=0; ctr< splitItems.length; ctr++){
			if(this.value === splitItems[ctr]){
				this.classList.add("active");
			}
		}
	});
}

function setActiveCheckButtonsParam(btns, param, delimiter){
	var splitItems = param.split(delimiter);
	$(btns).each(function(item) {
		for(var ctr=0; ctr< splitItems.length; ctr++){
			if(this.value === splitItems[ctr]){
				this.classList.add("active");
			}
		}
	});
}

function loadDropdown(url, fld, hdninput){
	$.ajax({
		type: 'GET',
		url: encodeURI(url),
		dataType: "json"
	}).done(function(results) {
		for(var j = 0; j < results.length; j++) {
			if(results[j].name === $(hdninput).val()) {
				$(fld).append("<option selected='selected' value='" + results[j].name + "' >"+ results[j].name + "</option>");
			}
			else {
				$(fld).append("<option value='" + results[j].name + "'>"+ results[j].name + "</option>");
			}
		}
    });
}

$(document).ready(function () {
	$.getJSON('/issignedin', null, function(data) {
		if(data === true){
			$('#signinout').removeClass("signin");
			$('#signinout').addClass("signout");
			$('#addrating').removeClass("hidden");
			
			$.getJSON('/isadmin', null, function(data2) {
				if(data2 === true){
					$('#admin').removeClass("hidden");
				}
				else {
					$('#admin').addClass("hidden");
				}
			});

			$('#signinout')[0].childNodes[0].innerHTML = "Sign Out";
		}
		else
		{
			$('#signinout').removeClass("signout");
			$('#signinout').addClass("signin");
			$('#addrating').addClass("hidden");
			$('#admin').addClass("hidden");

			$('#signinout')[0].childNodes[0].innerHTML = "Sign In";
		}
    });

	$(document)
		.on('click', '#signinout', function(event){
			if(event.currentTarget.classList.contains("signin") === true)
			{
				window.location = "/";
			}
			else
			{
				$.ajax({
					type: 'DELETE',
					url: encodeURI("/signin")
					}).done(function(success) {
						window.location = "/";
					});
			}
		})
		.on('hover', '#logout', function(event){
			$(this).css('cursor', 'pointer');
		});
		
    $('#login').focus();
});