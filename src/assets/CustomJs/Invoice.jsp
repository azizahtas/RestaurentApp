<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.InvoiceData"%>
<%@page import="com.CheckExpires"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="Includes/Header.html" %>
<%!
String Uname="";

%>
<%
try{
Uname=session.getAttribute("UserId").toString();

if(Uname=="")
{
response.sendRedirect("index.jsp");
}
}
catch(NullPointerException ex )
{
  response.sendRedirect("index.jsp");  
}
catch(IllegalStateException ex )
{
  response.sendRedirect("index.jsp");  
}
%>
    <style>
        .big
        {
            height: 40px; 
            font-size: 20px;
            border-radius: 4px;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075);
        }
    </style>
<%!
ConnectMe ConMe=new ConnectMe();
ResultSet rs;
DateFormat df=new SimpleDateFormat("dd-MM-yyyy");
Date now=new Date();
int inv,Invoice;
String Address,Company;
%>
<%
String Data=InvoiceData.getData();
String selInvNo="Select * from login";
rs=ConMe.getConnection(selInvNo);
if(rs.next()){inv=rs.getInt("BillNo");Company=rs.getString("Company");Address=rs.getString("Address");}
if(inv<1){inv=1;}
Invoice=inv;
rs.close();
ConMe.closeMe();

String CurrentInvoice="Select InvoiceId from Invoice";
rs=ConMe.getConnection(CurrentInvoice);
if(rs.last()){ Invoice=rs.getInt("InvoiceId")+1;}else{Invoice=1;}
rs.close();
ConMe.closeMe();
%>
    <script>
        var Data='<%=Data%>';
        var FinalData=Data.split(',');
    </script>
<link href="plugins/iGrowl_Notifications/css/igrowl.css" rel="stylesheet">
<link href="plugins/iGrowl_Notifications/css/fonts/vicons.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="plugins/bootstrap-datepicker/css/datepicker.css" />
<script src="CustomValidation/InvoiceNoValid.js"></script>
</head>
<body class="dark_theme fixed_header left_nav_fixed">
<div class="wrapper">
  <!--\\\\\\\ wrapper Start \\\\\\-->
  <%@include file="Includes/NavBar.html" %>
  <!--\\\\\\\ header end \\\\\\-->
  <div class="inner">
    <!--\\\\\\\ inner start \\\\\\-->
    <%@include file="Includes/Menu.html" %>
    <!--\\\\\\\left_nav end \\\\\\-->
    <div class="contentpanel">
      <!--\\\\\\\ contentpanel start\\\\\\-->
      <div class="pull-left breadcrumb_admin clear_both">
        <div class="pull-left page_title theme_color">
          <h1>Invoice</h1>
          <h2 class="">You can Create An Invoice from this page!</h2>
        </div>
      </div>
      <div class="container clear_both padding_fix">

      	<h2>From,</h2>
    	<div class="row">
      		<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      			<div class="form-group">
                            <label class="big">Company :- <br><strong><%=Company%></strong></label>
				</div><br>
                        <div class="form-group">
                            <div class="input-append date dpYears" data-date="<%=df.format(now)%>" data-date-format="dd-mm-yyyy" data-date-viewmode="years">
                                <input type="text" class="form-control big" size="30" id="Dpdate" value="<%=df.format(now)%>" readonly="" required="">
                              <span class="input-group-btn add-on">
                              <button type="button" class="btn btn-danger" ><i class="fa fa-calendar"></i></button>
                            </span>
                          </div> 
                        </div>
      		</div>
      		<div class="col-xs-12 col-sm-offset-3 col-md-offset-3 col-lg-offset-3 col-sm-4 col-md-4 col-lg-4">
				<div class="form-group">
                                    <label class="big">Address :- <br><strong><%=Address%></strong></label>
				</div><br>
      			<div class="form-group">
                            <label id="err" style="color: red;"></label><label id="temp"></label>
                            <input class="form-control big" id="invoiceNo" placeholder="Invoice No" type="number" value="<%=Invoice%>" onkeyup="IdValid(this.value) " onblur="IdValid(this.value)">
			</div>

      		</div>
      	</div>
      	<h2>&nbsp;</h2>
        <form method="post" action="Invoice" onsubmit="return InvoiceValid()">
            <input type="hidden" name="invoiceNo" id="ind" value="<%=Invoice%>">
            <input type="hidden" name="T" value="Insert">
            <input type="hidden" name="invoiceDate" id="ActualDate" value="<%=df.format(now)%>">
      	<div class="row">
      		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      			<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="2%"><input id="check_all" class="formcontrol" type="checkbox"></th>
                                                        <th width="38%"><h4>Item Name-Batch</h4></th>
							<th width="18%"><h4>Item Batch</h4></th>
							<th width="12%"><h4>Price</h4></th>
                                                        <th width="10%"><h4>Available</h4></th>
                                                        <th width="10%"><h4>Quantity </h4></th>
							<th width="15%"><h4>Total</h4></th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
      		</div>
      	</div>
      	<div class="row">
      		<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
      			<button class="btn btn-danger delete" type="button">- Delete</button>
      			<button class="btn btn-success addmore" type="button">+ Add More</button>
      		</div>
      		<div class="col-xs-12 col-sm-offset-4 col-md-offset-4 col-lg-offset-4 col-sm-5 col-md-5 col-lg-5">
                    <br>
                    <br>
                    <br>
                    <div class="row">
                           <div class="form-inline">
                            <div class="col-lg-6">
                            </div>
                               <div class="col-lg-6">
					<div class="form-group">
						<label><h4>Bill Amount: &nbsp;</h4></label>
						<div class="input-group">
							<div class="input-group-addon"><i class="fa fa-rupee"></i></div>
							<input class="form-control big" id="totalAftertax" name="Amount" placeholder="Total" onkeypress="return IsNumeric(event);" ondrop="return false;" onpaste="return false;" type="text">
						</div><br>
					</div>
                               </div>
                        </div>

		  </div>
                </div>
      	</div>
      	<h2>Notes: </h2>
      	<div class="row">
      		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      			<div class="form-group">
					<textarea class="form-control big" rows="5" id="notes" name="note" placeholder="Your Notes"></textarea>
				</div>
      		</div>
      	</div>	
        <div class="text-right">
            <input class="btn btn-success btn-block btn-lg" type="submit" value="Save Invoice" onclick="ClearBlanks()">
        </div>
        </form>
      </div>
      <!--\\\\\\\ container  end \\\\\\-->
    </div>
    <!--\\\\\\\ content panel end \\\\\\-->
  </div>
  <!--\\\\\\\ inner end\\\\\\-->
</div>
<!--\\\\\\\ wrapper end\\\\\\-->
<!-- sidebar chats -->
<%@include file="Includes/RightMenu.html" %>
<!-- /sidebar chats -->   

<%@include file="Includes/Themes.html" %>

<%@include file="Includes/Footer.html" %>
<script src="CustomJs/Invoice.js"></script>

<script type="text/javascript" src="plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<script>
        $(function(){
        $('.dpYears').datepicker()
        .on('changeDate',function(e)
        {
            $('#ActualDate').val($('#Dpdate').val());
        });

    });

</script>
<script src="plugins/iGrowl_Notifications/js/igrowl.js"></script> 
<%

    String Status=request.getParameter("Msg");
    if(Status!=null)
    {
        if(Status.equalsIgnoreCase("Success"))
        {
            %>
            <script>
                $.iGrowl({
                         title :"Success!!",
                         message: "Invoice Saved Successfully..",
                         type :"success",
                         icon : "vicons-box",
                         placement : {
                          x: 	'center'
                         },
                         animShow: 'fadeInLeftBig',
                         animHide: 'fadeOutRightBig'
                        });
            </script>
            <%
        }
        else if(Status.equalsIgnoreCase("Detail"))
        {
            %>
            <script>
                $.iGrowl({
                         title :"Error!!",
                         message: "Something Went wrong While saving invoice details!",
                         type :"error",
                         icon : "vicons-cancel",
                         placement : {
                          x: 	'center'
                         },
                         animShow: 'fadeInLeftBig',
                         animHide: 'fadeOutRightBig'
                        });
            </script>
            <%
        }
        else if(Status.equalsIgnoreCase("Fail"))
        {
            %>
            <script>
                $.iGrowl({
                         title :"Error!!",
                         message: "Something went wrong while Saving Invoice! Make Sure you Are not entering repeat Bill No!",
                         type :"error",
                         icon : "vicons-cancel",
                         placement : {
                          x: 	'center'
                         },
                         animShow: 'fadeInLeftBig',
                         animHide: 'fadeOutRightBig'
                        });
            </script>
            <%
        }
    }
%>
</body>
</html>
