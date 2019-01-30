var Custom = (function(){

	
	console.log('Custom was called');
	
	var initTable1 = function () {
		console.log('initTable1');
        var table = $('#sample_1');
		
		/**
			Karolis: generic method to generate lists:
				Node is some element that will get all 
		*/

        var oTable = table.dataTable({
            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "_MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            // setup buttons extentension: http://datatables.net/extensions/buttons/
            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn blue btn-outline' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'},
                {
                    text: 'Reload',
                    className: 'btn default',
                    action: function ( e, dt, node, config ) {
                        //dt.ajax.reload();
                        alert('Custom Button');
                    }
                },
                {
                    text: 'Add New',
                    className: 'btn default',
                    action: function ( e, dt, node, config ) {
                        //dt.ajax.reload();
                        alert('Custom Button');
                    }
                }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            responsive: {
                details: {
                    type: 'column',
                    target: 'tr'
                }
            },
            columnDefs: [ {
                className: 'control',
                orderable: false,
                targets:   0
            } ],

            order: [ 1, 'asc' ],
            
            // pagination control
            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,
            "pagingType": 'bootstrap_extended', // pagination type

            "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
        });
        
        // handle datatable custom tools
        $('#sample_1_tools > li > a.tool-action').on('click', function() {
            var action = $(this).attr('data-action');
            oTable.DataTable().button(action).trigger();
        });
        
        $('#sample_1_option_1,#sample_1_option_2').on('click', function() {
            var action = $(this).attr('data-action');
            oTable.DataTable().button(action).trigger();
        });
    }
    
	console.log('initTable1 was assigned to the satck');
	
	
	var moreGenericMethod = function(){
		// Generates array of empty elemens, size n
		function emptyArray(n){
			var array = [];
			for(var i = 0; i < n; i++){
				array.push('');
			}
			return array;
		}
		function editRowSizeable(oTable, nRow){
	        var aData = oTable.fnGetData(nRow);
	        var jqTds = $('>td', nRow);
	        
	        for(var i = 0; i < this.size; i++){
	            jqTds[i].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[i] + '">';
	        }
	        // i is still accessible here
	         jqTds[i + 1].innerHTML = '<a href="" class="btn btn-outline btn-circle btn-sm blue edit"><i class="fa fa-save"></i> Save </a> <a href="" class="btn btn-outline btn-circle btn-sm dark cancel"><i class="fa fa-close"></i> Cancel </a>';
		}
		function saveRowSizeable(oTable, nRow, size){
			var jqInputs = $(node, nRow);
			for(var i = 0; i < size; i++){
				oTable.fnUpdate(jqInputs[i].value, nRow, i, false);
			}
			
			oTable.fnUpdate('<a href="" class="btn btn-outline btn-circle btn-sm blue edit"><i class="fa fa-edit"></i> Edit </a> <a href="" class="btn btn-outline btn-circle btn-sm dark delete"><i class="fa fa-trash-o"></i> Delete </a>', nRow, i + 1, false);
			oTable.fnDraw();
		}
		function cancelEditRowSizeable(oTable, nRow, size){
			var jqInputs = $(node, nRow);
			for(var i = 0; i < size; i++){
				oTable.fnUpdate(jqInputs[i].value, nRow, i, false);
			}
	        oTable.fnUpdate('<a href="" class="btn btn-outline btn-circle btn-sm blue edit"><i class="fa fa-edit"></i> Edit </a> <a href="" class="btn btn-outline btn-circle btn-sm dark delete"><i class="fa fa-trash-o"></i> Delete </a>', nRow, i + 1, false);
	        oTable.fnDraw();
		}
	}
	
	// This is jus too big to be useful. Leaving here for now, as
	/*var handleEditableMedicationTable = function () {
		
		// Id of the table
		var table = $('#sample_editable_medication_table');
		// Id of the table wrapper
		var tableWrapper = $("#sample_editable_medication_table_wrapper");
		//Id of the button, where onclick event listener will be attached
		var buttonAction = $('#sample_editable_medication_table_new');
		
		// restoreRow is the same
        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }
            oTable.fnDraw();
        }
        
        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
            jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
            jqTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[2] + '">';
            jqTds[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[3] + '">';
            jqTds[4].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[4] + '">';
            jqTds[5].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[5] + '">';
            jqTds[6].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[6] + '">';
            jqTds[7].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[7] + '">';
            jqTds[8].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[8] + '">';
            jqTds[9].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[9] + '">';
            jqTds[10].innerHTML = '<a href="" class="btn btn-outline btn-circle btn-sm blue edit"><i class="fa fa-save"></i> Save </a> <a href="" class="btn btn-outline btn-circle btn-sm dark cancel"><i class="fa fa-close"></i> Cancel </a>';
        }

        function saveRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
            oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
            oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
            oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
            oTable.fnUpdate(jqInputs[7].value, nRow, 7, false);
            oTable.fnUpdate(jqInputs[8].value, nRow, 8, false);
            oTable.fnUpdate(jqInputs[9].value, nRow, 9, false);
            oTable.fnUpdate('<a href="" class="btn btn-outline btn-circle btn-sm blue edit"><i class="fa fa-edit"></i> Edit </a> <a href="" class="btn btn-outline btn-circle btn-sm dark delete"><i class="fa fa-trash-o"></i> Delete </a>', nRow, 10, false);
            oTable.fnDraw();
        }

        function cancelEditRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
            oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
            oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
            oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
            oTable.fnUpdate(jqInputs[7].value, nRow, 7, false);
            oTable.fnUpdate(jqInputs[8].value, nRow, 8, false);
            oTable.fnUpdate(jqInputs[9].value, nRow, 9, false);
            oTable.fnUpdate('<a href="" class="btn btn-outline btn-circle btn-sm blue edit"><i class="fa fa-edit"></i> Edit </a> <a href="" class="btn btn-outline btn-circle btn-sm dark delete"><i class="fa fa-trash-o"></i> Delete </a>', nRow, 10, false);
            oTable.fnDraw();
        }

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            // set the initial value
            "pageLength": 5,

            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "columnDefs": [{ // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "asc"]
            ] // set first column as a default sort by asc
        });

        var nEditing = null;
        var nNew = false;

		// $('#sample_editable_medication_table_new') or some other jQuery object assigned to a button ID
        buttonAction.click(function (e) {
	        console.log('"Add New+" button was clicked');
            e.preventDefault();

            if (nNew && nEditing) {
                if (confirm("Previous row not saved. Do you want to save it ?")) {
                    saveRow(oTable, nEditing); // save
                    $(nEditing).find("td:first").html("Untitled");
                    nEditing = null;
                    nNew = false;

                } else {
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;
                    return;
                }
            }

			//aiNew stands for another new input
            var aiNew = oTable.fnAddData(['', '', '', '', '', '', '', '', '', '', '']);
            // nRow ===  newRow
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
            console.log('#sample_editable_medication_table_new end was reached');
        });
       
        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
            alert("Deleted! Do not forget to do some ajax to sync with backend :)");
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();
            nNew = false;
            
            // Get the row as a parent of the link that was clicked on 
            var nRow = $(this).parents('tr')[0];
			
            if (nEditing !== null && nEditing != nRow) {
                //Currently editing - but not this row - restore the old before continuing to edit mode 
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
                
            } else if (nEditing == nRow && this.innerHTML.indexOf("Save") !== -1) {
                // Editing this row and want to save it 
                saveRow(oTable, nEditing);
                nEditing = null;
                alert("Updated! Do not forget to do some ajax to sync with backend :)");
            } else {
                // No edit in progress - let's start one 
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });
    }
    */
	//console.log('handleEditableMedicationTable was assigned to the satck');

	// generic handler for tables in PMR section

	var tableHandler = function (settings) {
		console.log('tableHandler was called with the following parameters :' + settings);
		/**
			Settings is a JSON. This is so, that it wouldn't be confusion and need to come back to the source code,
			as majority of these methods are triggered just from one area.
			
			{'wrapperId' : '', 'tableId' : '', 'columnCount': 6, 'activationButton' : 'activationButtonId'}
			
		*/
		var tableSize = settings.columnCount;
		
		// Table id for the table tag element
        var table = $(settings.tableId);
        
        // Table wrapper id.
        var tableWrapper = $(settings.wrapperId);
		
		// Button, that will be listening for the onclick action
		var button =  $(settings.activationButton);

		function emptyArray(n){
			var array = [];
			for(var i = 0; i <= n; i++){
				array.push('');
			}
			return array;
		}

		// restoreRow is the same
        function restoreRow(oTable, nRow) {
	         console.log('restoreRow row was triggered');
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }
            oTable.fnDraw();
        }
        
        function editRow(oTable, nRow) {
	        console.log('editRow was triggered');
	        var aData = oTable.fnGetData(nRow);
	        var jqTds = $('>td', nRow);
	        
	        for(var i = 0; i < tableSize; i++){
	            jqTds[i].innerHTML = '<textarea type="text" class="form-control input-small" value="' + aData[i] + '">' + aData[i] + '</textarea>';
	            console.log('i is :' + i);
	            console.log('tableSize is :' + tableSize);
	        }
	         jqTds[tableSize].innerHTML = '<a href="" class="btn btn-outline btn-circle btn-sm blue edit"><i class="fa fa-save"></i> Save </a> <a href="" class="btn btn-outline btn-circle btn-sm dark cancel"><i class="fa fa-close"></i> Cancel </a>';
		}

        function saveRow(oTable, nRow) {
	        console.log('saveRow was triggered');
			var jqInputs = $('textarea', nRow);
			for(var i = 0; i < tableSize; i++){
				oTable.fnUpdate(jqInputs[i].value, nRow, i, false);
			}
			oTable.fnUpdate('<a href="" class="btn btn-outline btn-circle btn-sm blue edit"><i class="fa fa-edit"></i> Edit </a> <a href="" class="btn btn-outline btn-circle btn-sm dark delete"><i class="fa fa-trash-o"></i> Delete </a>', nRow, tableSize, false);
			oTable.fnDraw();
		}

        function cancelEditRow(oTable, nRow) {
	        console.log('cancelEditRow row was triggered');
	        var jqInputs = $(node, nRow);
			for(var i = 0; i < tableSize; i++){
				oTable.fnUpdate(jqInputs[i].value, nRow, i, false);
			}
	        oTable.fnUpdate('<a href="" class="btn btn-outline btn-circle btn-sm blue edit"><i class="fa fa-edit"></i> Edit </a> <a href="" class="btn btn-outline btn-circle btn-sm dark delete"><i class="fa fa-trash-o"></i> Delete </a>', nRow, tableSize, false);
	        oTable.fnDraw();
		}
        
        var oTable = table.dataTable({
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            "pageLength": 5,
            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "columnDefs": [{ // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "asc"]
            ]
        });

        var nEditing = null;
        var nNew = false;

		button.click(function (e) {
	        console.log('"Add New+" button was clicked');
            e.preventDefault();
            if (nNew && nEditing) {
                if (confirm("Previous row not saved. Do you want to save it ?")) {
                    saveRow(oTable, nEditing); // save
                    $(nEditing).find("td:first").html("Untitled");
                    nEditing = null;
                    nNew = false;

                } else {
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;
                    return;
                }
            }
			//aiNew stands for another new input
            //var aiNew = oTable.fnAddData(['', '', '', '','', '']);
            var aiNew = oTable.fnAddData(emptyArray(tableSize));
            // nRow ===  newRow
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
            console.log(' end was reached');
        });

	   	table.on('click', '.delete', function (e) {
            e.preventDefault();
            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }
            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
            alert("Deleted! Do not forget to do some ajax to sync with backend :)");
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

		table.on('click', '.edit', function (e) {
            e.preventDefault();
            nNew = false;
            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];
            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && this.innerHTML.indexOf("Save") !== -1) {
                /* Editing this row and want to save it */
                saveRow(oTable, nEditing);
                nEditing = null;
            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });
    }
	console.log('tableHandler was assigned to the stack');

	
	//initImmunisationDropzone();initBloodTestsDropzone();
	
	var initDropzone = function () {

       $(".dropzone-previews").removeClass("hide");//to prevent showing of generic icons on load
		
       // generic function to check for dropzone instances
       function dropzoneExists(selector){
    	   var element = $(selector).find('.dz_default');
    	   return element.length > 0;
       }
       
    	function url(){
    		console.log(window.location.href);
    		console.log('found URl is ' + window.location.href);
    		var slashPosition = (window.location.href).toString().lastIndexOf('/');
    		console.log((window.location.href).substr(0, slashPosition+1));
    		return ((window.location.href).substr(0, slashPosition+1));
    	};
    	
    	this.url = url();
    	
    	function userId(){
    		var slashPosition = (window.location.href).toString().lastIndexOf('/');
    		console.log(((window.location.href).substr(slashPosition + 1)));
    		return ((window.location.href).substr(slashPosition + 1));

    	};
    	
    	this.userId = userId();

    	 function xsrf_token(){
    		console.log('xsrf_token');
    		console.log($('input[name="_token"]').val());
    		//console.log($('input[name="_token"]').attr('value').toString());
    		return $('input[name="_token"]').val();
    	};
        
    	this.xsrf_token = xsrf_token();
    	
        Dropzone.autoDiscover = false;
        //var userId = userId();
        if ($('.dropzone_single').length) {
            var myDropzone = new Dropzone(".dropzone_single", {
            	headers:{'X-CSRF-TOKEN' : xsrf_token()},
            	acceptedFiles: " .jpg, .jpeg, .gif, .png, .pdf, .svg",
            	url: this.url + this.userId,
            	deleteurl: this.url + this.userId,
            	listUrl : this.url+this.userId + '/immunisation-list' ,
            	addRemoveLinks: false,
            	autoProcessQueue: false,
            	parallelUploads : 5,
            	//previewsContainer: "<div class='spec-gallery'></div>",
            	//previewTemplate : '<intput type="hidden" class="hidden-file-name" ></input>',
            	init: function(){
            		/**
            		 * Firts will pull in a list of all records associated with user
            		 * Then will parse the list and retrieve actual files one by one
            		 */
            		console.log('Dropzone is here');
            		// just a wrapper to access later
            		var init = this;
            		console.log(init);
            	/**
            	 * 	Process Queue after the thumnail was generated
            	 *  http://stackoverflow.com/questions/29534483/send-dropzone-thumbnail-to-server	
            	 */	
            		this.on('thumbnail', function(file, thumbnail){
            			file.thumbnail = thumbnail;
            			myDropzone.processQueue();
            		});
            	// Attach a captured thumbnail data
            		this.on('sending', function(file, xhr, formData){
            		
            			formData.append('thumbnail', file.thumbnail);
            		});
            		
               // get the list of associated files	and process them!
            		$.ajax({'method' : 'GET',
            				'url' : url() + userId() + '/record-listing',
            				'headers' : {
            					'X-CSRF-TOKEN' : xsrf_token()
            					},
            				'success' : function(response){
            					console.log('response is');
            					console.log(response);
            					/*
            					 *	Our response is either an array populated with jsons
            					 *  Or Json populated with Jsons 
            					 */
            					if(response == undefined){
            						return;
            					}
            					
            					$.each(JSON.parse(response), function(index, data){
            						console.log(data);
            						var file = {
        								'file': data.filename,
        								'filename' : data.file_description,
        								//'url' : data.file_url,
        								'url' : url() + userId() + '/serve-file/' + data.filename,
        								//'thumbnail_url' : data.file_thumbnail_url,
        								'thumbnail_url' : url() + userId() + '/serve-thumbnail/' + data.filename,
        								'fileSize' : data.file_size
            						};
            						
            						console.log(file);
            						var dropzone = Dropzone.forElement('.dropzone_single')
            						dropzone.options.addedfile.call(dropzone, file);
            						dropzone.options.thumbnail.call(dropzone, file, file.thumbnail_url);
            						
            						var fileThumb = dropzone.emit("complete", file);
            						var hiddenName = Dropzone.createElement('<input type="hidden" class="hidden-file-name">'+file.file+'</input>');
            						var removeButton = Dropzone.createElement("<a href='confirm(\"Are you sure?\");'' class='btn red btn-sm btn-block'>Remove</a>");
            						removeButton.addEventListener('click', function(event){
            							event.preventDefault();
            							event.stopPropagation();
            						});
            						
            						var openButton = Dropzone.createElement("<a href='"+file.url+"' class='btn red btn-sm btn-block' target='_blank'>Open</a>");
            	                    file.previewElement.appendChild(hiddenName);
            						file.previewElement.appendChild(openButton);
            						file.previewElement.appendChild(removeButton);
            						
            						// Assign filename to the newly created object. 
            						file.previewElement.querySelector("[data-dz-name]").innerHTML = file.file;
            						// Assign a size value to newly created object:
            						file.previewElement.querySelector("[data-dz-size]").innerHTML = file.fileSize;
            						openButton.addEventListener('doubleclick', function(event){
            							confirm('A new tab with a file will open.');
            							
            							alert(file.previewElement.querySelector("[hidden-input-field]").innerHTML);
	           		                     $.ajax({
	           		                    	 'data' : {
	           		                    		 'filename': file.previewElement.querySelector("[data-dz-name]").innerHTML
	           		                    	 },
	           		                    	 'url' : url() + userId() + '/serve-file/' + file.previewElement.querySelector("[data-dz-name]").innerHTML,
	           		                    	 'headers' : {'X-CSRF-TOKEN' : xsrf_token()},
	           		                    	 'method' : 'GET',
	           		                    	 'success' : function(response){
	           		                    		 console.log('response is inbound');
	           		                    		 console.log(response);
	           		                    		 var newTab = window.open(response, '_blank');
	           		                    		 newTab.focus();
	           		                    	 },
	           		                    	 'error' : function(response){
	           		                    		 console.log('failed to get an image');
	           		                    		 console.log(response);
	           		                    	 }
	           		            		 });
           		                     
            						});
            						removeButton.addEventListener('click', function(event){
            							if(confirm("Please confirm that you want to remove a file.")){
                							
               		                     $.ajax({
               		                    	 'data' : {
               		                    		 'filename': file.previewElement.querySelector("[data-dz-name]").innerHTML
               		                    	 },
               		                    	 'url' : url() + userId(),
               		                    	 'headers' : {'X-CSRF-TOKEN' : xsrf_token()},
               		                    	 'method' : 'DELETE',
               		                    	 'success' : function(response){
               		                    		 console.log('image was deleted');
               		                    		 console.log(response);
                       		                     init.removeFile(file);
               		                    	 },
               		                    	 'error' : function(response){
               		                    		 console.log('failed to delete an image');
               		                    		 alert(response.data);
               		                    	 }
               		            		 });
            								
            							} 
            						});
            						
            					});
            					
		            			console.log('This was sent from the server');
		            			console.log(response);
		            			console.log('Lets see if there is any data attached');
		            			console.log(response);
                        		//alert('Response is inbound');
            				},
		            		'error' : function(response){
		            			console.log(response);
		            			alert('Dropzone Failed To comunicate on initialization');
		            		}
                        	});

            		
            		/*var submitButton = document.querySelector('#submit_records');
            		
            		submitButton.addEventListener('click', function(){
            			init.processQueue();
            		});
            		*/
            		this.on('error', function(file, response){
            			console.log('an error was triggered on hte server side');
            			console.log(response.toString());
            		});
            		
            		this.on('complete', function(file, response){
            			
            			console.log('upload is complete');
            			console.log('File is here');
            			console.log(file);
            			console.log('The response is :');
            			console.log(response);
            		});

            		this.on("success",function(file, response){
		    			console.log('success');
	          			console.log('File is inbound');
	        			console.log(file);
	        			// Might have to add a hidden field with the name
	        			var fileuploded = file.previewElement.querySelector("[data-dz-name]");
	        			fileuploded.innerHTML = file.xhr.responseText;
	        			file.name = file.xhr.responseText;
	        			
	        			console.log('file name should be changed to this one');
	        			console.log(file.xhr.responseText);
	        			return file;
	    		  });
        		  
            	this.on("addedfile", function(file) {

        			console.log(file);
        			
        			switch(file.type){
        			case('application/pdf'):
        				file.previewElement.querySelector('img').src = "data:image/png;base64,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";
	    				file.thumbnail = "data:image/png;base64,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";
	    				
	    				//this.emit('thumbnail', file.thumbnail);
	    			
	        			break;
        			case('image/jpeg'):
        				break;
        			case('image/jpg'):
        				break;
        			case('image/png'):
        				break;
        			case('image/gif'):
        				break;
        			case('image/svg'):
        				break;
        			default:
	        			file.previewElement.querySelector('img').src = "data:image/png;base64,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";
	    				file.thumbnail = "data:image/png;base64,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";
	    				myDropzone.processQueue();
	    				init.processQueue();
	    				break;
        			}
        			
            		var removeButton = Dropzone.createElement("<a href='javascript:;'' class='btn red btn-sm btn-block'>Remove</a>");
					var openButton = Dropzone.createElement("<a href='' class='btn red btn-sm btn-block new-tab-button' target='_blank'>Open</a>");
					var hiddenName = Dropzone.createElement('<input type="hidden" class="hidden-file-name"></input>');
					
					removeButton.addEventListener("click", function(e) {
                    	console.log('Custom Remove was clicked');
                    	console.log('Init object is below');
                    	if(confirm('Please confirm, that you want to remove added file.')){
                    		init.removeFile(file);
    	                    e.preventDefault();
    	                    e.stopPropagation();
                        	
    	                     $.ajax({
    	                    	 'data' : {
    	                    		 'filename': file.previewElement.querySelector("[data-dz-name]").innerHTML
    	                    	 },
    	                    	 'url' : url() + userId(),
    	                    	 'headers' : {'X-CSRF-TOKEN' : xsrf_token()},
    	                    	 'method' : 'DELETE',
    	                    	 'success' : function(response){
    	                    		 console.log('image was deleted');
    	                    		 console.log(response);
    	                    	 },
    	                    	 'error' : function(response){
    	                    		 console.log('failed to delete an image');
    	                    		 console.log(response);
    	                    	 }
    	            		 });

                    	} else{
                    		// do nothing or somethign else
                    	}
                    });
                    
                    file.previewElement.appendChild(hiddenName);
                    file.previewElement.appendChild(openButton);
                    file.previewElement.appendChild(removeButton);
                    });
            		
            	}
           });
        }
 
        else if ($('.dropzone').length) {//".dropzone" //moved to be full screen but still expecting a .dropzone to exist
            var minImageWidth = 200, minImageHeight = 200;
            var myDropzone = new Dropzone(document.body, {
            	paramName: 'blood_tests',
            	headers:{'X-CSRF-TOKEN' : xsrf_token()},
                previewsContainer: "<div class='spec-gallery'></div>",
                acceptedFiles: " .jpg, .jpeg, .gif, .png, .pdf, .svg",
                url: url() + userId(), 
                clickable: "#my-awesome-dropzone",
                maxFilesize: 20,
                parallelUploads: 1,
                addRemoveLinks: false,
                accept: function(file){
                	 $.ajax({
                   	  'method' : 'POST',
                   	  'url' : url() + userId(),
                   	  'headers':{'X-CSRF-TOKEN' : xsrf_token()},
                     }).done(function(){
                   	  alert('ajax is done!');
                     }).fail(function(){
                   	  alert('Ajax failed');
                     }).always(function(){
                   	  alert('Always was triggered.');
                     });
                     
           
                },
                //Example of modification element
                init: function () {
                    this.on("success", function (file, responseText) {
                        currentlyUploading--;

                        var json = jQuery.parseJSON(responseText)

                        console.log(json);

                        if (json.messages.length > 0)
                        {
                            $("#inline-error-message").removeClass("hide");
                            $("#inline-error-message-text").append("<div>" + json.messages[0] + "</div>");
                        }
                        
                        //inline-error-message

                        //we trigger the angular process to fetch the data from the server and populate, so we provide the options of editing and removing as per any other file.
                    /*    if (currentlyUploading == 0)
                        {
                            var scope = angular.element($("#specViewController")).scope();
                            scope.$apply(function () {
                                myDropzone.removeAllFiles();
                                scope.fetchContent();
                            });
                        }*/

                    });
                    this.on('error', function (file, responseText) {
                        //console.log("Error uploading file. " + responseText);
                        alert("Error uploading file. " + responseText.toString());
                    });

                    this.on('sending', function (file) {
                        console.log("still sending")
                    });

                    this.on('uploadprogress', function (file, progress) {
                        console.log('progress | ' + progress);
                    });
					
                    this.on("addedfile", function (file) {
                        currentlyUploading++;
                        // Create the remove button
		                var removeButton = Dropzone.createElement("<a href='javascript:;'' class='btn red btn-sm btn-block'>Remove</a>");
		                
		                // Capture the Dropzone instance as closure.
		                var _this = this;
		
		                // Listen to the click event
		                removeButton.addEventListener("click", function(e) {
		                  // Make sure the button click doesn't submit the form:
		                  e.preventDefault();
		                  e.stopPropagation();
		
		                  // Remove the file preview.
		                  _this.removeFile(file);
		                  // If you want to the delete the file on the server as well,
		                  // you can do the AJAX request here.
		                });
		
		                // Add the button to the file preview element.
		                file.previewElement.appendChild(removeButton);

                    });
					console.log(' this worked');

                }
            });
        }
    }
	console.log('initDropzone was assigned to the stack');

	var initRepeaters = function () {
		console.log('initRepeaters was called');
        $('.mt-repeater').each(function(){
    		$(this).repeater({
    			show: function () {
                	$(this).slideDown();
                    if($('.date-picker').length) {
	                    $('.date-picker').datepicker({
	                        rtl: App.isRTL(),
	                        orientation: "left",
	                        autoclose: true
	                    });
                    }
	            },

	            hide: function (deleteElement) {
	                if(confirm('Are you sure you want to delete this element?')) {
	                    $(this).slideUp(deleteElement);
	                }
	            },

	            ready: function (setIndexes) {

	            }

    		});
    	});
    }
	console.log('initRepeaters was assigned to the satck');
	
	var handleTypeahead = function() {

        // Example #1
        // instantiate the bloodhound suggestion engine
        var numbers = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: [
            { num: 'browns' },
            { num: 'pharmacy' },
            { num: 'browns pharmacy' },
            { num: 'browns template' },
            { num: 'browns team' }
          ]
        });
         
        // initialize the bloodhound suggestion engine
        numbers.initialize();
         
        // instantiate the typeahead UI
        if (App.isRTL()) {
          $('#typeahead_example_1').attr("dir", "rtl");  
        }
        $('#typeahead_example_1').typeahead(null, {
          displayKey: 'num',
          hint: (App.isRTL() ? false : true),
          source: numbers.ttAdapter()
        });

    }
	
    return {
        /**
	        Main function to initiate the module.
	        The original method is left as it is (just to know where to reference it just in case)
	        In once all this will be final, it has to be altered to the modified version as it's quite big
	        
	        
	        All event click event listeners should be added here
        */
        init: function () {
	        console.log('Init method from the custom.js file was triggered');
            $('[data-toggle="tooltip"]').tooltip();
            
            //initialize datepicker
           if (jQuery().datepicker) {
	            if($('.date-picker').length) {
	            	console.log('.date-picker');
	            	var picked;
		            var options = {};
					options.autoclose = true;
		            if($('.date-picker[data-multidate^="true"]').length > 0){
			           options.multidate = true;
			           picked = $('.date-picker[data-multidate^="true"]').datepicker(options);
			           console.log('.date-picker[data-multidate^="true"]');
			           console.log(picked);
		            }
		            options.multidate = false;
		            picked = $('.date-picker').datepicker(options);
		            console.log('.date-picker');
		            console.log(picked);
		        }
	        }
	       
	       
	        if (jQuery().timepicker) {
		        if($('.timepicker-default').length) {
		            $('.timepicker-default').timepicker({
		                autoclose: true,
		                showSeconds: true,
		                minuteStep: 1
		            });
	            }
	
				if($('.timepicker-no-seconds').length) {
		            $('.timepicker-no-seconds').timepicker({
		                autoclose: true,
		                minuteStep: 5,
		                defaultTime: false
		            });
	            }
				
				if($('.timepicker-24').length) {
		            $('.timepicker-24').timepicker({
		                autoclose: true,
		                minuteStep: 5,
		                showSeconds: false,
		                showMeridian: false
		            });
	            }
				
				if($('.timepicker').length) {
		            // handle input group button click
		            $('.timepicker').parent('.input-group').on('click', '.input-group-btn', function(e){
		                e.preventDefault();
		                $(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
		            });
	            }
	            	
	            // Workaround to fix timepicker position on window scroll
	            /*$( document ).scroll(function(){
	                $('#form_modal4 .timepicker-default, #form_modal4 .timepicker-no-seconds, #form_modal4 .timepicker-24').timepicker('place'); //#modal is the id of the modal
	            });*/
	        }
	        
	        if (jQuery().datetimepicker) {
	            if($('.form_datetime').length) {
		            $(".form_datetime").datetimepicker({
			            autoclose: true,
			            isRTL: App.isRTL(),
			            format: "dd MM yyyy - hh:ii",
			            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
			        });
		        }
		
				if($('.form_advance_datetime').length) {
			        $(".form_advance_datetime").datetimepicker({
			            isRTL: App.isRTL(),
			            format: "dd MM yyyy - hh:ii",
			            autoclose: true,
			            todayBtn: true,
			            startDate: "2013-02-14 10:00",
			            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
			            minuteStep: 10
			        });
				}
				
				/*
		        $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
		
		        // Workaround to fix datetimepicker position on window scroll
		        $( document ).scroll(function(){
		            $('#form_modal1 .form_datetime, #form_modal1 .form_advance_datetime, #form_modal1 .form_meridian_datetime').datetimepicker('place'); //#modal is the id of the modal
		        });*/
	        }
	        
	        if($('.mt-repeater').length) {
	            initRepeaters();
	        }
	        
	        if($(".select2").length || $(".select2-multiple").length){
		        console.log('select2 was detected');
		        $.fn.select2.defaults.set("theme", "bootstrap");
		        $(".select2, .select2-multiple").select2({
		            width: null
		           // width : '400px'     
		        });
	        }
	        
	        if ($('.dropzone').length || $('.dropzone_single').length) {
                initDropzone();
            }
	      /**
	       * Instead of having one very generic dropzone instance that would solve all problems
	       * We will have several more rigid objects to that would solve all our problems
	       * 
	       * As names sugest, one for Immunisation records in Health section and another one in the Blood tests section
	       */  
	       
	        if ($('#immunisation_records_dropzone').length){
	        	//initDropzone();
	        	//initImmunisationDropzone();
	        }
	        
	        if($('#blood_test_file_area').length){
	        	//initDropzone();
	        	// initBloodTestsDropzone();
	        }
            
            if ($('#typeahead_example_1').length) {
                handleTypeahead();
            }


            if (jQuery().dataTable) {
               	if($('#sample_1').length) {
               		initTable1();
			   	}
			   	
			   	// The part for the personal medication section
			   	if($('sample_editable_medication_table').length){
				   	console.log('#sample_editable_medication_table was detected');               		
	       			tableHandler({
					   	wrapperId : "#sample_editable_medication_table_wrapper",
					   	tableId : '#sample_editable_medication_table',
					   	columnCount: 10,
					   	activationButton : '#sample_editable_medication_table_new'});
               		
			   	}
			   	
			   	// The part for the Blood Glucose section / blood glucose log sheet
			   	if($('editable_blood_glucose_table').length){
				   	console.log('editable_blood_glucose_table was detected ');
				   	tableHandler({
					   	wrapperId : "#editable_blood_glucose_table_wrapper",
					   	tableId : '#editable_blood_glucose_table',
					   	columnCount: 5,
					   	activationButton : '#editable_blood_glucose_row_new'});
				  
				  
			   	}
			   	
			   	// This part goes in the Blood Glucose section, Haemoglobin A1C test Log sheet
			   	if($('editable_haemoglobin_a1c_table').length){
				   	console.log('editable_haemoglobin_a1c_table was detected ');
				   	tableHandler({wrapperId : "#editable_haemoglobin_a1c_table_wrapper",
					   tableId : '#editable_haemoglobin_a1c_table',
					   columnCount: 2,
					   activationButton : '#add_editable_haemoglobin_a1c_table_row'}
					   );
			   	}
			   	
			   	// Blood pressure rcords table
			   if($('editable_blood_pressure_table').length){
				   	console.log('editable_blood_pressure_table was detected ');
				   	tableHandler({wrapperId : "#editable_blood_pressure_table_wrapper",
					   tableId : '#editable_blood_pressure_table',
					   columnCount: 5,
					   activationButton : '#blood_pressure_log_new_row'}
					);
			   	}
			   	
			   	// Cholesterol log table
			   if($('cholesterol_log_table').length){
				   	console.log('cholesterol_log_table was detected ');
				   	tableHandler({
					   wrapperId : "#cholesterol_log_table_wrapper",
					   tableId : '#cholesterol_log_table',
					   columnCount: 4,
					   activationButton : '#new_cholesterol_log_row'}
					);
			   }
			   
			   // BMI section
			   if($('bmi_log_table').length){
				   	console.log('bmi_log_table was detected ');
				   	tableHandler({
					   wrapperId : "#bmi_log_table_wrapper",
					   tableId : '#bmi_log_table',
					   columnCount: 4,
					   activationButton : '#new_bmi_log_sheet_row'}
					);
			   }
			// Spirometry table   
			   if($("spirometer_result_log_table").length){
			   		console.log('spirometer_result_log_table was detected ');
			   		tableHandler({
					   wrapperId : "#spirometer_result_log_table_wrapper",
					   tableId : '#spirometer_result_log_table',
					   columnCount: 5,
					   activationButton : '#new_spirometer_result_log_row'}
					);
			   }
			// Pharmaceutical Care Plan
				if($("pharmaceutical_care_plan_table").length){
			   		console.log('pharmaceutical_care_plan_table was detected ');
			   		tableHandler({
					   wrapperId : "#pharmaceutical_care_plan_table_wrapper",
					   tableId : '#pharmaceutical_care_plan_table',
					   columnCount: 4,
					   activationButton : '#new_pharmaceutical_care_plan_row'}
					);
			   }
            }

            //Validation
            if ($('.form-validate').length) {
                var form1 = $('.form-validate');
	            var error = $('.alert-danger', form1);
	            var success = $('.alert-success', form1);
	
	            //IMPORTANT: update CKEDITOR textarea with actual content before submit
	            /*form1.on('submit', function() {
	                for(var instanceName in CKEDITOR.instances) {
	                    CKEDITOR.instances[instanceName].updateElement();
	                }
	            })*/
	
	            form1.validate({
	                errorElement: 'span', //default input error message container
	                errorClass: 'help-block help-block-error', // default input error message class
	                focusInvalid: false, // do not focus the last invalid input
	                ignore: "", // validate all fields including form hidden input
					
					/*
	                messages: { // example of custom messages for radio buttons and checkboxes
	                    membership: {
	                        required: "Please select a Membership type"
	                    },
	                    service: {
	                        required: "Please select  at least 2 types of Service",
	                        minlength: jQuery.validator.format("Please select  at least {0} types of Service")
	                    }
	                },*/
	
	                errorPlacement: function (error, element) { // render error placement for each input type
		                console.log('errorPlacement was triggered. ');
	                    if (element.parents('.mt-radio-list') || element.parents('.mt-checkbox-list')) {
	                        if (element.parents('.mt-radio-list')[0]) {
	                            error.appendTo(element.parents('.mt-radio-list')[0]);
	                        }
	                        if (element.parents('.mt-checkbox-list')[0]) {
	                            error.appendTo(element.parents('.mt-checkbox-list')[0]);
	                        }
	                    } else if (element.parents('.mt-radio-inline') || element.parents('.mt-checkbox-inline')) {
	                        if (element.parents('.mt-radio-inline')[0]) {
	                            error.appendTo(element.parents('.mt-radio-inline')[0]);
	                        }
	                        if (element.parents('.mt-checkbox-inline')[0]) {
	                            error.appendTo(element.parents('.mt-checkbox-inline')[0]);
	                        }
	                    } else if (element.parent(".input-group").size() > 0) {
	                        error.insertAfter(element.parent(".input-group"));
	                    } else if (element.attr("data-error-container")) { 
	                        error.appendTo(element.attr("data-error-container"));
	                    } else {
	                        error.insertAfter(element); // for other inputs, just perform default behavior
	                    }
	                },
	
	                invalidHandler: function (event, validator) { //display error alert on form submit   
		                console.log('invalidHandler was called. ');
	                    success.hide();
	                    error.show();
	                    App.scrollTo(error, -200);
	                },
	
	                highlight: function (element) { // hightlight error inputs
	                   $(element)
	                        .closest('.form-group').addClass('has-error'); // set error class to the control group
	                },
	
	                unhighlight: function (element) { // revert the change done by hightlight
	                    $(element)
	                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
	                },
	
	                success: function (label) {
	                    label
	                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
	                },
	
	                submitHandler: function (form) {
	                    success.show();
	                    error.hide();
	                    form[0].submit(); // submit the form
	                }
	
	            });
	
	            //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
	            if ($('.select2me').length) {
			            $('.select2me', form1).change(function () {
			                form1.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
			            });
	            }
				
				if ($('.date-picker .form-control').length) {
			            $('.date-picker .form-control').change(function() {
			                form1.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
			            });
	            }
            }
    console.log('The end was reached.');
        }
    };
})(); // The global variable / function wasn't self executing

jQuery(document).ready(function(){


	try{

		Custom.init();
		
	} catch(error){
		console.log('An error was trigered.');
		console.log(error.message);
		console.log(error.name);
		// Will dump Error stack
		//console.log(error.stack);
	}
	
	
// generic case
	try{
		$('.date').change(function(event){
			if($('#pmr_page_controller_id').length){
				var scope = angular.element($("#pmr_page_controller_id")).scope();
				console.log('event is');
				console.log(event);
				scope.date = event.target.value;
				console.log('scope.datetime value is assigned to');
				console.log(scope.date);
				console.log('scope is:');
				console.log(scope);
			}
		});
		
	} catch(error) {
		console.log(error);
	}
	
// generic case	
	try{
		$('.timepicker-24').change(function(event){
			// Generig id, used in every other case
			if($('#pmr_page_controller_id').length){
				var scope = angular.element($("#pmr_page_controller_id")).scope();
				console.log('event is');
				console.log(event);
				console.log(event.target.value);
				scope.time = JSON.parse(JSON.stringify(event.target.value));
				console.log('scope.date value is assigned to');
				console.log(scope.time);
				console.log('scope is:');
				console.log(scope);
			}
		});
	} catch(error) {
		console.log(error);
	}
	
	try{ 
		$('.date').change(function(event){
			if($("#blood_glucose_section_id").length){
				var scope = angular.element($("#blood_glucose_section_id")).scope();
				console.log('event is');
				console.log(event);
				scope.date = event.target.value;
				console.log('scope is:');
				console.log(scope);
			}
		});
	} catch(error) {
		console.log(error);
	}

	try{
		$('.date').change(function(event){
		// used for haemoglobin section in the same page as blood glucose 
			if($('#haemoglobin_section_controller_id').length){
				var scope = angular.element($("#haemoglobin_section_controller_id")).scope();
				console.log('event is');
				console.log(event);
				scope.date = event.target.value;
				console.log('scope is:');
				console.log(scope);
			}
		});
	} catch(error){
		console.log(error);
	}
	
	try{
		if($("#blood_glucose_section_id").length){
			var scope = angular.element($("#blood_glucose_section_id")).scope();
			console.log('incoming event is :');
			console.log(event);
			scope.time = event.target.value;
			console.log(scope);
		}
	} catch(error){
		console.log(error);
	}
	
	try{
		$('.timepicker').change(function(event){

			if($("#haemoglobin_section_id").length){
				var scope = angular.element($("#haemoglobin_section_id")).scope();
				scope.haemoglobin = {};
				console.log('incoming event is :');
				console.log(event);
				scope.haemoglobin.time = event.target.value;
				console.log(scope);
			}			
		});
	} catch(error){
		console.log(error);
	}

});