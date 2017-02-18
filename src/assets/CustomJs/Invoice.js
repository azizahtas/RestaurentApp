var quantity=1,avail=0;
//adds extra table rows
var i=$('table tr').length;

function checkBlank()
{
        if(i>1)
        {
           var sum=i-1;
           var a=$('#itemName_'+sum).val();
           var b=$('#avail_'+sum).val();
           if(a===""|b==="0")
           {
               return false;
           }
           else return true;
        }
        else return true;
}
function checkDuplicate(A,B)
{
    var b=true;
    var j;
        if(i>2)
        {
           for(j=1;j<i;j++)
        {
            var m=$('#itemBatch_'+j).val();
            var c=$('#itemName_'+j).val();
            if(A==m&&B==c)
            {
               b=false;
            }
            else continue;
        }
        }
        return b;
}
function ClearBlanks()
{
    var sum=i-1;
    var a=$('#itemName_'+sum).val();
    var b=$('#avail_'+sum).val();
     if(a===""|b==="0")
           {
             $('#itemName_'+sum).parents("tr").remove();
           }
}
function InvoiceValid()
{ 
    if(i<2)
    {
        $.iGrowl({
                         title :"Error!!",
                         message: "Invoice Without items not Alowed to be saved!\n It must contain atleast one item!",
                         type :"error",
                         icon : "vicons-cancel",
                         placement : {
                          x: 	'center'
                         },
                         animShow: 'fadeInLeftBig',
                         animHide: 'fadeOutRightBig'
                        });
                        return false;
    }
    else return true;
}
$(".addmore").on('click',function(){
    
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
});

//to check all checkboxes
$(document).on('change','#check_all',function(){
	$('input[class=case]:checkbox').prop("checked", $(this).is(':checked'));
});

//deletes the selected table rows
$(".delete").on('click', function() {
	$('.case:checkbox:checked').parents("tr").remove();
	$('#check_all').prop("checked", false); 
	calculateTotal();
   i = $('table tr').length;
});



//autocomplete script
$(document).on('focus','.autocomplete_txt',function(){
	type = $(this).data('type');
	
	if(type ==='productName' )autoTypeNo1=1,autoTypeNo2=0;
	if(type ==='productBatch' )autoTypeNo1=2,autoTypeNo2=2; 	
	
	$(this).autocomplete({
		source: function( request, response ) {	 
			 var array = $.map(FinalData, function (item) {
                 var code = item.split("|");
                 return {
                     label: code[autoTypeNo1],
                     value: code[autoTypeNo2],
                     data : item
                 }
             });
             //call the filter here
             response($.ui.autocomplete.filter(array, request.term));
		},
		autoFocus: true,	      	
		minLength: 2,
		select: function( event, ui ) { 
			var names = ui.item.data.split("|");	
			id_arr = $(this).attr('id');
	  		id = id_arr.split("_");
                        var a=names[2];
                        var b=names[0];
			if(!checkDuplicate(a,b))
                        {
                            $.iGrowl({
                         title :"Error!!",
                         message: "Duplicate Items not alowed!\nModify the quantity with the batch="+a,
                         type :"error",
                         icon : "vicons-cancel",
                         placement : {
                          x: 	'center'
                         },
                         animShow: 'fadeInLeftBig',
                         animHide: 'fadeOutRightBig'
                        });
                        }
                        else
                        {
                        $('#itemName_'+id[1]).val(names[0]);
			$('#itemBatch_'+id[1]).val(names[2]);
			$('#quantity_'+id[1]).val(1);
			$('#avail_'+id[1]).val(names[3]);
			$('#price_'+id[1]).val(names[4]);
			$('#id_'+id[1]).val(names[5]);
			$('#total_'+id[1]).val( 1*names[4] );
			calculateTotal();
                        }
		}		      	
	});
});

//price change
$(document).on('change keyup blur','.changesNo',function(){
	id_arr = $(this).attr('id');
	id = id_arr.split("_");
	quantitya = $('#quantity_'+id[1]).val();
        quantity = parseInt(quantitya);
        availa =$('#avail_'+id[1]).val();
        avail=parseInt(availa);
	price = $('#price_'+id[1]).val();
    if(quantity>avail)
        {
                $.iGrowl({
                         title :"Error!!",
                         message: "Not Enough Quantity in Stock!",
                         type :"error",
                         icon : "vicons-cancel",
                         placement : {
                          x: 	'center'
                         },
                         animShow: 'fadeInLeftBig',
                         animHide: 'fadeOutRightBig'
                        });
        quantity=avail;                
	$('#quantity_'+id[1]).val(avail); 
        $('#total_'+id[1]).val( (parseFloat(price)*parseFloat(quantity)).toFixed(2) );
        calculateTotal();
        }
        else{
	if( quantity!='' && price !='')
            {
            if(quantity>0){
            $('#total_'+id[1]).val( (parseFloat(price)*parseFloat(quantity)).toFixed(2) );
        }
	calculateTotal();
        }
        }
});

$(document).on('change keyup blur','#tax',function(){
	calculateTotal();
});

//total price calculation 
function calculateTotal(){
	total = 0; 
	$('.totalLinePrice').each(function(){
		if($(this).val() != '' )total += parseFloat( $(this).val() );
	});
	$('#totalAftertax').val( total.toFixed(2) );
}


//It restrict the non-numbers
var specialKeys = new Array();
specialKeys.push(8,46); //Backspace
function IsNumeric(e) {
    var keyCode = e.which ? e.which : e.keyCode;
    console.log( keyCode );
    var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
    return ret;
}

//datepicker
$(function () {
	$.fn.datepicker.defaults.format = "dd-mm-yyyy";
    $('#invoiceDate').datepicker({
        startDate: '-3d',
        autoclose: true,
        clearBtn: true,
        todayHighlight: true
    });
});