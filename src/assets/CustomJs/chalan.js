function AddRow(){
	if(!checkBlank())
	{
		$.iGrowl({
			title :"Error!!",
			message: "Blank Entries not allowerd!",
			type :"error",
			icon : "vicons-cancel",
			placement : {
				x: 	'center'
			},
			animShow: 'fadeInLeftBig',
			animHide: 'fadeOutRightBig'
		});
	}
	else if(quantity<1)
	{
		$.iGrowl({
			title :"Error!!",
			message: "Cannot add 0 quantity to the Invoice!",
			type :"error",
			icon : "vicons-cancel",
			placement : {
				x: 	'center'
			},
			animShow: 'fadeInLeftBig',
			animHide: 'fadeOutRightBig'
		});
		$('#quantity_'+i).val(1);

		$('#total_'+i).val( (parseFloat(price)*parseFloat(quantity)).toFixed(2) );
		calculateTotal();
	}
	else{
		html = '<tr>';
		html += '<td><input class="case" type="checkbox"/></td>';
		html += '<td><input type="text" data-type="productName" name="itemName[]" id="itemName_'+i+'" class="form-control big autocomplete_txt" autocomplete="off"></td>';
		html += '<td><input type="text" data-type="productBatch" name="itemBatch[]" id="itemBatch_'+i+'" class="form-control big autocomplete_txt" autocomplete="off"></td>';
		html += '<td><input type="text" name="price[]" value="0" id="price_'+i+'" class="form-control big changesNo" autocomplete="off" ondrop="return false;" onpaste="return false;"></td>';
		html += '<td><input type="text" name="avail[]" value="0" id="avail_'+i+'" class="form-control big " readonly></td>';
		html += '<input type="hidden" name="id[]" value="0" id="id_'+i+'">';
		html += '<td><input type="text" name="quantity[]" value="0" id="quantity_'+i+'" class="form-control big changesNo" autocomplete="off" onkeypress="return IsNumeric(event);" ondrop="return false;" onpaste="return false;"></td>';
		html += '<td><input type="text" name="total[]" value="0" id="total_'+i+'" class="form-control big totalLinePrice" autocomplete="off" onkeypress="return IsNumeric(event);" ondrop="return false;" onpaste="return false;"></td>';
		html += '</tr>';
		$('table').append(html);
		i++;
	}
}

//to check all checkboxes
$(document).on('change','#check_all',function(){
	$('input[class=case]:checkbox').prop("checked", $(this).is(':checked'));
});

//deletes the selected table rows
function RemoveRow() {
	$('.case:checkbox:checked').parents("tr").remove();
	$('#check_all').prop("checked", false);
	calculateTotal();
	i = $('table tr').length;
}
