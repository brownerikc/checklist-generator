/*	
	Full format for a checklist item:
      {
		 "id": 99999,
         "description": "INSERT DESCRIPTION HERE",
		 "checklistType": "TYPE",
		 "leadReviewerCheck": true,
         "outputSPD": true,
         "outputCH": true,
		 "outputGH": true,
		 "outputPDFPrint": true,
		 "outputPDFOnline": true,
         "outputPDF_DITA": true,
		 "outputCHM": true,
		 "outputReadme": true
      }
	  
	Key definitions:
	----------------
	id: 				Unique numerical value tied to this checklist item. Currently unused.
	description: 		String that appears in the Description column for this checklist item. This, of course, is the important part.
	checklistType: 		String specifying the checklist type. Current valid values are "contentCreation" and "signoff". Currently does not throw an error if you specify something else...instead, it just doesn't work.
	leadReviewerCheck: 	Boolean value that specifies whether to include the LR checkbox for this checklist item.
	outputXXXXX: 		Boolean value that specifies that this checklist item applies to this particular output type.
	
	Special instructions:
	---------------------
	* Each checklist item is denoted by a group of key/value pairs contained within curly brackets. You can copy/paste the example above.
	* FOR STRINGS: Enclose in quotation marks ("")
	* FOR BOOLEANS: Do NOT enclose in quotation marks. You can omit this key if the intended value is false.
	* End each key/value pair with a comma UNLESS it is the final pair of the checklist item.
	* Likewise, separate each checklist item with a comma (placed immediately after the closing bracket). If it's the final item in the list, do NOT include the comma.
	* The group of checklist items is enclosed in square brackets, and defined as a variable used elsewhere. Each group should represent a particular section of a checklist.
	
	* Refer to the annotated example below if you need a template to make sense of these.
	
	IDs
	---
	As noted above, this key is currently unused in code. I have been using these as a debugging mechanism, and left them in for future debugging potential or other possible uses. I do not have any in mind, but if a need arises, the infrastructure is there. Thus, this key is strictly optional. And yet I am about to write more about this than anything else.
	
	Current numbering convention is that the 100s and above digits indicates checklist group, and 1s and 10s digits indicate checklist item. For example:
	10xx - Checklist section 1
	11xx - Checklist section 2
	12xx - Checklist section 3
	xx01 - Item 1
	xx02 - Item 2
	1204 - Checklist section 3, item 4
	
	IDs don't have to be sequential, and you don't have to use each number. Checklist items will be printed in the same order as you define them.
	
	For example, you initially define a section with items 1, 2, 3, 4, and 5 (in that order). Later, you want to add a new item (6) between 3 and 4. Then, you decide item 2 is superfluous, and decide to remote it. The order the items will generate is 1, 3, 6, 4, 5. This is fine and will not break anything. You may choose to clean up the IDs to make them sequential if you'd like. Just be sure that it won't be breaking anything else if you've started using IDs for other things.
	
	IDs should be unique. It's possible to reuse them for separate checklist items, and it won't throw an error if you do. But you'd be defeating the purpose of using them, so please don't.
 */
 
//Define the checklist section as a variable. I recommend prepending the name with "json" to make the JS code clearer.
var jsonExample = [		//Start square brackets to denote the checklist section group.
	//An item, all enclosed within curly brackets
      {
		 "id": 100,		//Separate each key/value pair with a comma, and put each pair on a new line for readability.
         "description": "Document exists.",
		 "checklistType": "signoff",
		 "leadReviewerCheck": true,
         "outputSPD": true,
         "outputCH": true,
		 "outputGH": true,
		 //The next three items are optional because they're specified as false. You can leave these in if you want, but they're not necessary. Any key not showing up is treated as false.
		 "outputPDFPrint": false,
		 "outputPDFOnline": false,
         "outputPDF_DITA": false,
		 "outputCHM": true,
		 "outputReadme": true		//Because this is the last pair, don't add a comma. It doesn't need separation from anything.
      },	//End of the item, and because it needs separation from other items, add a comma.
      {
		 "id": 101,
         "description": "Things are spelled correctly.",
		 "checklistType": "signoff",
		 "leadReviewerCheck": true,
         "outputSPD": true,
         "outputCH": true,
		 "outputGH": true,
		 //Not listing PDF outputs here. As such, they're considered false.
		 "outputCHM": true,
		 "outputReadme": true
      },
	  //The example below shows how minimal you can go with key/value pairs if you're going to have a lot of false booleans. It's nice and compact.
	  //If you prefer to be rigorous and include more pairs with false values, that's fine too.
      {
		 "id": 102,
         "description": "All art is spiffy.",
		 "checklistType": "signoff",
		 "outputGH": true	//Just remember to end the list of pairs with no comma.
      }		//End of item list, which means no comma.
   ]	//And finally, close out the group with a square bracket.