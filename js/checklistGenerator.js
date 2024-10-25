/* The main driver function.
 *
 * Add a checkJSONArray call for each JSON array. Specify each in a separate JS file for best readability.
 */
function parseJSON() {
	//Clear out the table, because we don't want to just append to it
	while($('#data').length) $('#data').remove();
    $('#tableColumns').remove();
    $('#tableHeaders').remove();
    
    //Generate the correct table header
    setTableHeader();
    
	//Set the header based on the selected checklist type
	if (document.getElementById('contentCreation').checked) {
		document.getElementById('checklistHeader').innerHTML = "Content Creation Checklist";
		
		//Send the content creation item groups to the parser
		checkJSONArray(jsonDefaultTopic, "Default Topic");
		checkJSONArray(jsonTopics, "Topics");
		checkJSONArray(jsonTagging, "Tagging");
		checkJSONArray(jsonArt, "Art");
		checkJSONArray(jsonOutputPreview, "Output Preview");
		checkJSONArray(jsonManuals, "Manuals");
		checkJSONArray(jsonGlossary, "Glossary");
	}
	else if (document.getElementById('signoff').checked) {
		document.getElementById('checklistHeader').innerHTML = "Signoff Checklist";
		
		//Send the signoff item groups to the parser
		checkJSONArray(jsonPublication, "Publication");
		checkJSONArray(jsonContentsTab, "Contents Tab");
		checkJSONArray(jsonIndex, "Index");
		checkJSONArray(jsonOutputProps, "Output Properties");
		checkJSONArray(jsonBookmap, "Bookmap");
		checkJSONArray(jsonStructure, "Structure");
		checkJSONArray(jsonDelivery, "Delivery");
	} else return;
	
	//If it's the first time we click the button, show the content
	document.getElementById("formInput").style.visibility = "visible";
	document.getElementById("checklistTable").style.visibility = "visible";
}

/* If we're generating a CHM checklist, we need to include a PR column. As such, this function
 * dynamically generates the table header based on whether this setting is configured.
 *
 * Two things are affected:
 *      * colgroup - Defines the columns. Adds one more (PR) if CHMs are enabled.
 *      * tr - Sets the header. Includes PR entry if CHMs are enabled.
 */
function setTableHeader() {
    var isCHM = document.getElementById('CHM').checked;
    
    if (isCHM) {
        $('#checklistTable').append('<colgroup id="tableColumns"><col  style="width: 45.0px;"/> <col  style="width: 40.0px;"/> <col  style="width: 40.0px;"/> <col  style="width: 46.0px;"/> <col style="width: 587.0px;"/> <col style="width: 150.0px;"/></colgroup>');
        $('#checklistTable').append('<tr id="tableHeaders"><th>CW</th><th>PR</th><th>LR</th><th>N/A</th><th>Description</th><th>Output Types</th></tr>');

    } else {
        $('#checklistTable').append('<colgroup id="tableColumns"><col  style="width: 45.0px;"/> <col  style="width: 40.0px;"/> <col  style="width: 46.0px;"/> <col style="width: 587.0px;"/> <col style="width: 150.0px;"/></colgroup>');
        $('#checklistTable').append('<tr id="tableHeaders"><th>CW</th><th>LR</th><th>N/A</th><th>Description</th><th>Output Types</th></tr>');
    }
}

/* This function will iterate through each of the key/value pairs and do the main work.
 * 
 * Parameters:
 * jsonArray - The array of key/value pairs. Currently, each of these are defined in individual JS files, and constitute a checklist section.
 * headerName - The title of the given checklist section.
 *
 * Additional notes: If we include a PR column (for CHMs), we have to handle the table a little
 *      differently in multiple spots. There are a few if(showCHM) statements that handle these
 *      cases. The generated code looks similar, but is not quite the same.
 */
function checkJSONArray(jsonArray, headerName) {
	var SPDCheckbox = document.getElementById('SPD');
	var ContextHelpCheckbox = document.getElementById('ContextHelp');
	var GHCheckbox = document.getElementById('GuidedHelp');
	var PDFPrintCheckbox = document.getElementById('PDFPrint');
	var PDFOnlineCheckbox = document.getElementById('PDFOnline');
	var PDF_DITACheckbox = document.getElementById('PDF_DITA');
	var CHMCheckbox = document.getElementById('CHM');
	var CHM_DITACheckbox = document.getElementById('CHM_DITA');
	var ReadmeCheckbox = document.getElementById('Readme');
	
	var showSPD = SPDCheckbox.checked;
	var showContextHelp = ContextHelpCheckbox.checked;
	var showGH = GHCheckbox.checked;
	var showPDFPrint = PDFPrintCheckbox.checked;
	var showPDFOnline = PDFOnlineCheckbox.checked;
	var showPDF_DITA = PDF_DITACheckbox.checked;
	var showCHM = CHMCheckbox.checked;
	var showCHM_DITA = CHM_DITACheckbox.checked;
	var showReadme = ReadmeCheckbox.checked;
	
	var generateContentCreation = contentCreation.checked;
	var generateSignoff = signoff.checked;
	
	var printLine = false;
	var outputLine = '';
	var boxLR = '';
    var boxPR = '';
	var needsHeader = true;
	
	/* index is an array index value.
	 * item is the actual object, which contains all the key:value pairs.
	 *
	 * The syntax for referencing a key should be something like this:
	 * item.description
	 */	
	$.each(jsonArray, function(index, item) {
		//Clear out these vars
		outputLine = '';
		printLine = false;
		boxLR = '';
		
		//If any of these catch, we should print a table line
		if(generateContentCreation && item.checklistType == "contentCreation") {
			//Content Creation Checklist
			if(showSPD && item.outputSPD) printLine = true;
			if(showContextHelp && item.outputCH) printLine = true;
			if(showGH && item.outputGH) printLine = true;
			if(showPDFPrint && item.outputPDFPrint) printLine = true;
			if(showPDFOnline && item.outputPDFOnline) printLine = true;
			if(showPDF_DITA && item.outputPDF_DITA) printLine = true;
			if(showCHM && item.outputCHM) printLine = true;
			if(showCHM_DITA && item.outputCHM_DITA) printLine = true;
			if(showReadme && item.outputReadme) printLine = true;
		} else if (generateSignoff && item.checklistType == "signoff") {
			//Signoff Checklist
			if(showSPD && item.outputSPD) printLine = true;
			if(showContextHelp && item.outputCH) printLine = true;
			if(showGH && item.outputGH) printLine = true;
			if(showPDFPrint && item.outputPDFPrint) printLine = true;
			if(showPDFOnline && item.outputPDFOnline) printLine = true;
			if(showPDF_DITA && item.outputPDF_DITA) printLine = true;
			if(showCHM && item.outputCHM) printLine = true;
			if(showCHM_DITA && item.outputCHM_DITA) printLine = true;
			if(showReadme && item.outputReadme) printLine = true;
		}
		
		//So yeah, print it if necessary
		if(printLine) {
			if(needsHeader) {
                if(showCHM) $('#checklistTable').append('<tr id="data"><td colspan="6"><b>' + headerName +'</b></td></tr>');
                else $('#checklistTable').append('<tr id="data"><td colspan="5"><b>' + headerName +'</b></td></tr>');
				needsHeader = false;
			}
			
			if(showSPD && item.outputSPD) outputLine+='SPD<br />';
			if(showContextHelp && item.outputCH) outputLine+='Context Help<br />';
			if(showGH && item.outputGH) outputLine+='Guided Help<br />';
			if(showPDFPrint && item.outputPDFPrint) outputLine+='Printed PDF<br />';
			if(showPDFOnline && item.outputPDFOnline) outputLine+='Online PDF<br />';
			if(showPDF_DITA && item.outputPDF_DITA) outputLine+='PDF (DITA)<br />';
			if(showCHM && item.outputCHM) outputLine+='CHM<br />';
			if(showCHM_DITA && item.outputCHM_DITA) outputLine+='CHM (DITA)<br />';
			if(showReadme && item.outputReadme) outputLine+='Readme<br />';
			
			//Line 1: Checkbox image. Line 2: HTML checkbox.
			//if(item.leadReviewerCheck) boxLR = "<img src=\"box.gif\">"; else boxLR = "&mdash;";
			if(item.leadReviewerCheck) boxLR = '<input type="checkbox" />'; else boxLR = "&mdash;";
            if(item.peerReviewerCheck) boxPR = '<input type="checkbox" />'; else boxPR = "&mdash;";
			
			//The rows have an id of "data" so that we can delete it up top if we re-click the button
            if(showCHM) {
                $('#checklistTable').append('<tr id="data"><td>' + '<input type="checkbox" />' + '</td><td>' + boxPR + '</td><td>' + boxLR + '</td><td>' + '<input type="checkbox" />' + '</td><td>' + item.description + '</td><td>'+ outputLine +'</td></tr>');
            } else {
                $('#checklistTable').append('<tr id="data"><td>' + '<input type="checkbox" />' +'</td><td>' + boxLR + '</td><td>' + '<input type="checkbox" />' + '</td><td>' + item.description + '</td><td>'+ outputLine +'</td></tr>');
            }
			
		}
	});
}
