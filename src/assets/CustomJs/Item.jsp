
<%@page import="java.awt.ItemSelectable"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.sql.ResultSet"%>
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
<%!
ResultSet rs,rs2;
ConnectMe conMe=new ConnectMe();
int ItemId=1,ItemDetId=1;
String T="",sel="",ItemName="";
Date Expdate=new Date();
DateFormat df=new SimpleDateFormat("dd-MM-yyyy");
Date now=new Date();
%>
<link href="CustomCss/Search.css" rel="stylesheet" type="text/css" />
<link href="plugins/SweetAlert/sweetalert.css" rel="stylesheet" type="text/css" />
<script src="plugins/SweetAlert/sweetalert.min.js"></script>
<link href="plugins/bootstrap-editable/bootstrap-editable.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="plugins/bootstrap-datepicker/css/datepicker.css" />

<script>
    function SubmitMe(A)
    {
document.body.innerHTML += '<form id="dynForm" action="Item.jsp" method="post"><input type="hidden" name="Term" value="'+A+'"><input type="hidden" name="T" value="Search"></form>';
document.getElementById("dynForm").submit();
    }
        function Show(A,B)
    {
                   swal({   title: A,  
                   text: B,
                   type: "error",   
                   allowEscapeKey:true,
                   allowOutsideClick:true,
                   confirmButtonColor: "#DD6B55",  
                   confirmButtonText: "Ok, Sorry!",   
                   closeOnConfirm: true
                },
                function(isConfirm){
                      if (isConfirm) 
                      {
                       SubmitMe('<%=ItemName%>');
                      } 
                    }
            ); 
    }
</script>
</head>
<body class="dark_theme fixed_header left_nav_fixed">
    
    <style>
        .big
        {
            height: 40px; 
            font-size: 25px;
        }
    </style>

<%
sel="Select ItemId from Item order by ItemId asc";
rs=conMe.getConnection(sel);
if(rs.last())
{
ItemId=rs.getInt("ItemId")+1;
}
else{ItemId=1;}
rs.close();
conMe.closeMe();

sel="Select Id from ItemDetails order by id asc";
rs=conMe.getConnection(sel);
if(rs.last())
{
ItemDetId=rs.getInt("Id")+1;
}
else{ItemDetId=1;}
rs.close();
conMe.closeMe();

if(request.getMethod().equalsIgnoreCase("Post"))
{
T=request.getParameter("T");
if(T.equalsIgnoreCase("AddItem"))
{
String id=request.getParameter("ItemId");
ItemName=request.getParameter("ItemName");

String ins="insert into Item values('"+id+"','"+ItemName+"','Blank')";
int a=conMe.UpdateInsertDeleteQuerry(ins);
if(a==1)
{
%>
<script>
    SubmitMe('<%=ItemName%>');
</script>
<%
}
else
{
response.sendRedirect("500.html");
}
conMe.closeMe();
}
else if(T.equalsIgnoreCase("AddDetails"))
{
String id=request.getParameter("ItemId");
String Batch=request.getParameter("Batch");
String Location=request.getParameter("Location");
String Expiry=request.getParameter("Expiry");
Expdate=df.parse(Expiry);
int Quantity=Integer.parseInt(request.getParameter("Quantity"));
String Mrp=request.getParameter("Mrp");
if(now.before(Expdate))
       {
String insDetails="insert into ItemDetails values('"+ItemDetId+"','"+id+"','"+Batch+"','"+Location+"','"+Expiry+"','"+Quantity+"','"+Mrp+"','N')";
int a=conMe.UpdateInsertDeleteQuerry(insDetails);
if(a==1)
{
%>
<script>
    SubmitMe('<%=ItemName%>');
</script>
<%
}
else
{
response.sendRedirect("500.html");
}
}
else
{
%>
<script>
Show("Expired Stock!","Expiry date is older than today.");
</script>
<%
}
conMe.closeMe();
}
else if(T.equalsIgnoreCase("SaveDetails"))
{
String id=request.getParameter("ItemId");
String DetId=request.getParameter("Id");
String Batch=request.getParameter("Batch");
String Location=request.getParameter("Location");
String Expiry=request.getParameter("Expiry");
Expdate=df.parse(Expiry);
int Quantity=Integer.parseInt(request.getParameter("Quantity"));
String Mrp=request.getParameter("Mrp");
if(now.before(Expdate))
       {
String selbatch="Select * from Itemdetails Where Batch='"+Batch+"' AND ItemId='"+id+"' AND not(Id = '"+DetId+"')";
rs=conMe.getConnection(selbatch);
if(rs.next())
{
%>
<script>
Show("Duplicate Batch!","The Batch number is already present!\n Try editing the Details of that Batch.");
</script>
<%
}
else{
String UpdDetails="Update ItemDetails set Batch='"+Batch+"',Location='"+Location+"',Expiry='"+Expiry+"',ItemQuantity='"+Quantity+"',Mrp='"+Mrp+"' WHERE Id='"+DetId+"'";
int a=conMe.UpdateInsertDeleteQuerry(UpdDetails);
if(a==1)
{
%>
<script>
    SubmitMe('<%=ItemName%>');
</script>
<%
}
else
{
response.sendRedirect("500.html");
}
}
}
else
{
%>
<script>
Show("Expired Stock!","Expiry date is older than today.");
</script>
<%
}
rs.close();
conMe.closeMe();
}
else if(T.equalsIgnoreCase("DeleteDetails"))
{
String DetId=request.getParameter("Id");

String DelDetails="Delete From ItemDetails where Id='"+DetId+"'";
int a=conMe.UpdateInsertDeleteQuerry(DelDetails);
if(a==1)
{
%>
<script>
    SubmitMe('<%=ItemName%>');
</script>
<%
}
else
{
response.sendRedirect("500.html");
}
conMe.closeMe();
}
else if(T.equalsIgnoreCase("DeleteAll"))
{
int ItemDelId=Integer.parseInt(request.getParameter("ItemId"));

String DelDetails="Delete From ItemDetails where ItemId='"+ItemDelId+"'";
int a=conMe.UpdateInsertDeleteQuerry(DelDetails);
if(a==1)
{
%>
<script>
    SubmitMe('<%=ItemName%>');
</script>
<%
}
else
{
%>
<script>
    SubmitMe('<%=ItemName%>');
</script>
<%
}
conMe.closeMe();
}
else if(T.equalsIgnoreCase("DeleteItem"))
{
int ItemDelId=Integer.parseInt(request.getParameter("ItemId"));

String DelDetails="Delete From Item where ItemId='"+ItemDelId+"'";
int a=conMe.UpdateInsertDeleteQuerry(DelDetails);
if(a==1)
{
response.sendRedirect("Item.jsp");
}
else
{
response.sendRedirect("500.html");
}
conMe.closeMe();
}
}
%>


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
          <h1>Item</h1>
          <h2 class="">Add Update Delete Items from this page....</h2>
        </div>
      </div>
      <style>
          .close{
              opacity: 1;
          }
      </style>
      <div class="container clear_both padding_fix">
        <!--\\\\\\\ container  start \\\\\\-->
        <div name="LightBlue">
            &nbsp;
        </div>
        <div class="alert alert-info nob">
            <form class="close" method="post" action="Item.jsp">
                <input type="hidden" name="T" value="ViewAll">
                <button class="btn btn-primary" type="submit">ViewAll</button>
            </form>
            <h2>Search :</h2>
            <form method="post" action="Item.jsp">
                <input type="text" class="form-control" name="Term" id="AutoItemSearch">
                <input type="hidden" name="T" value="Search">
                <input type="submit" hidden>
            </form>
        </div>
<%
if(request.getMethod().equalsIgnoreCase("Get"))
{

%>
        <div class="row">
            <div class="col-md-12">
        <div name="Blue">
            &nbsp;
        </div>
              <section class="">
                <div class="block-web panel panel_bg_gray panel_header_bg_blue">
                  <div class="header">
                    <div class="actions"> <a href="#" class="minimize"><i class="fa fa-chevron-down"></i></a> <a href="#" class="refresh"><i class="fa fa-repeat"></i></a> <a href="#" class="close-down"><i class="fa fa-times"></i></a> </div>
                    <h3>Add New Item</h3>
                  </div>
                  <div class="porlets-content">
        <div name="LightGreen">
            &nbsp;
        </div>
        <div class="alert alert-success nob">
            <form action="Item.jsp" method="post" onsubmit="return AddItemValidate()">
                <div class="form-group">
                    <h3><label>Item Id</label></h3>
                  <input type="text" name="ItemId" readonly="" class="form-control big" value="<%=ItemId%>">
                </div><!--/form-group-->
                <div class="form-group">
                    <h3><label>Item Name</label> [<label id="err" style="color: red;"></label>]<label id="temp"></label></h3>
                  <input type="text" name="ItemName" required placeholder="Enter item name" class="form-control big" onkeyup="NameValidation(this.value) " onblur="NameValidation(this.value)">
                </div><!--/form-group-->
                <div class="text-right">
                    <input type="hidden" name="T" value="AddItem">    
                <input type="submit" class="btn btn-success" value="Save">
                </div>
            </form>
        </div>
                  </div>
                </div>
              </section>
            </div>
        </div>
<%
}
else if(request.getMethod().equalsIgnoreCase("Post"))
{ 
    if(T.equalsIgnoreCase("Search"))
               {
        String Term=request.getParameter("Term");
        String selItem="Select * from Item where ItemName='"+Term+"'";
        rs=conMe.getConnection(selItem);
        if(rs.next())
          {
                   
            ItemName=rs.getString("ItemName");
            String Manufacturer=rs.getString("Manufacturer");
            int Id=rs.getInt("ItemId");
            
%>

        <div name="LightGreen">
            &nbsp;
        </div>
        <div class="alert alert-success nob">
          <div class="row">
                <div class="col-md-3">
                    <h2>Item Id :- <br><b>[<%=Id%>]</b></h2>
                </div>
                <div class="col-md-3">
                    <h2>Item Name :- <br><b>[<a href="#" id="ItemName" data-type="text" data-pk="<%=Id%>" data-url="CheckMe?T=Me" data-title="Update Item Name"><%=ItemName%></a>]</b></h2>
                </div>
                <div class="col-md-4">
                    <h2>Manufacturer :- <br><b>[<a href="#" id="Manufacturer" data-type="text" data-pk="<%=Id%>" data-url="CheckMe?T=Manufacturer" data-title="Update Manufacturer Name"><%=Manufacturer%></a>]</b></h2>
                </div>
                <div class="col-md-2">
                    <form method="post" action="Item.jsp">
                        <input type="hidden" name="T" value="DeleteItem">
                        <input type="hidden" name="ItemId" value="<%=Id%>">
                       <input type="submit" class="btn btn-danger" value="Delete Item" > 
                    </form>
                </div>
            </div>                 
        </div>
<div name="LightYellow">
&nbsp;
</div>
 <div class="alert alert-warning nob">
          <div class="row">
                <div class="col-md-2">
                    <div class="text-center">
                    <h3>Batch</h3>
                    </div>
                </div>
                <div class="col-md-2">
                    <h3>Location</h3>
                </div>
                <div class="col-md-2">
                    <h3>Expiry</h3>
                </div>
                <div class="col-md-2">
                    <h3>Quantity</h3>
                </div>
                <div class="col-md-2">
                    <h3>MRP</h3>
                </div>
                <div class="col-md-2">
                    <form method="post" action="Item.jsp">
                        <input type="hidden" name="T" value="DeleteAll">
                        <input type="hidden" name="ItemId" value="<%=Id%>">
                    <input type="submit" class="btn btn-danger big" value="Delete All" >
                    </form>
                </div>
            </div> 
                </div>
<%
                String selDetails="select * from ItemDetails where ItemId='"+Id+"'";
                rs2=conMe.getConnection(selDetails);
                String typ="",color="";
                while(rs2.next())
                { 
                    if(rs2.getString("Expired").equalsIgnoreCase("Y"))
                    {typ="danger";color="LightRed";}
                    else if(rs2.getString("Expired").equalsIgnoreCase("N"))
                    {typ="success";color="LightGreen";}
                %>
<div name="<%=color%>">
&nbsp;
</div>                
                <div class="alert alert-<%=typ%> nob">
          <div class="row">
              <form method="post" action="Item.jsp">
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="text" name="Batch" required placeholder="Batch No" class="form-control big" value="<%=rs2.getString("Batch")%>">
                    </div>
                </div>
                <div class="col-md-2">
                     <div class="form-group">
                    <input type="text" name="Location" placeholder="Location" class="form-control big" required="" value="<%=rs2.getString("Location")%>">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                    <div class="input-append date dpYears" data-date="12-10-2015" data-date-format="dd-mm-yyyy" data-date-viewmode="years">
                        <input type="text" class="form-control big" size="30" readonly="" value="<%=rs2.getString("Expiry")%>" required="" name="Expiry">
                        <span class="input-group-btn add-on">
                        <button type="button" class="btn btn-danger" ><i class="fa fa-calendar"></i></button>
                      </span>
                    </div> 
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="number" name="Quantity" placeholder="Quantity" class="form-control big" required="" value="<%=rs2.getInt("ItemQuantity")%>">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="text" name="Mrp" placeholder="MRP" class="form-control big" required="" value="<%=rs2.getString("Mrp")%>">
                    </div>
                </div>
                <div class="col-md-1">
                    <input type="hidden" name="T" value="SaveDetails">
                    <input type="hidden" name="ItemId" value="<%=Id%>">
                    <input type="hidden" name="Id" value="<%=rs2.getInt("Id")%>">
                     <input type="submit" class="btn btn-success" value="Save">
                </div>
              </form>
              <form method="post" action="Item.jsp">
                <div class="col-md-1">
                    <input type="hidden" name="T" value="DeleteDetails">
                    <input type="hidden" name="Id" value="<%=rs2.getInt("Id")%>">
                     <input type="submit" class="btn btn-danger" value="Delete">
                </div>
              </form>
            </div> 
                </div>
                <%
                }
                %>
<div name="LightBlue">
&nbsp;
</div>                  
 <div class="alert alert-info nob">
          <div class="row">
              <form method="post" action="Item.jsp" onsubmit="return ItemDetailsValidation()">
                <div class="col-md-2">
                    <div class="form-group" >
                        <input type="text" name="Batch" required placeholder="Batch No" class="form-control big" onkeyup="BatchValidation(this.value,<%=Id%>)" onblur="BatchValidation(this.value,<%=Id%>)">
                    <h4><label id="err2" style="color: red;"></label><label id="temp2"></label></h4>
                    </div>
                </div>
                <div class="col-md-2">
                     <div class="form-group">
                    <input type="text" name="Location" class="form-control big" required placeholder="Location">
                    </div>
                </div>
                <div class="col-md-2">
                <div class="form-group">
                    <div class="input-append date dpYears" data-date="<%=df.format(now)%>" data-date-format="dd-mm-yyyy" data-date-viewmode="years">
                        <input type="text" class="form-control big" size="30" value="<%=df.format(now)%>" readonly="" name="Expiry" required="">
                        <span class="input-group-btn add-on">
                        <button type="button" class="btn btn-danger" ><i class="fa fa-calendar"></i></button>
                      </span>
                    </div> 
                </div><!--/form-group--> 
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="number" name="Quantity" class="form-control big" required placeholder="Quantity">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="text" name="Mrp" class="form-control big" required placeholder="Mrp">
                    </div>
                </div>
                <div class="col-md-2">
                    <input type="hidden" name="T" value="AddDetails">
                    <input type="hidden" name="ItemId" value="<%=Id%>">
                    <input type="submit" class="btn btn-primary big" value="Add Details">
                </div>
              </form>
            </div> 
                </div>
        
        <%
        }
               else
               {
               %>
        <div name="LightRed">
            &nbsp;
        </div>
        <div class="alert alert-danger nob">
            <h1>Sorry No item with this name.</h1>                
        </div>
        <%
               }
        rs.close();
        conMe.closeMe();
    }
    else if(T.equalsIgnoreCase("ViewAll"))
    {
     String All="Select * from Item order by ItemId desc";
     rs=conMe.getConnection(All);
     
     %>
     <div name="Blue">&nbsp;</div>
    <div class="block-web panel panel_header_bg_blue">
           <div class="header">
              <h3 class="content-header">All Items</h3>
            </div>
         <div class="porlets-content">
      <div class="table-responsive">
                <div id="dynamic-table_wrapper" class="dataTables_wrapper form-inline" role="grid">
                    <table class="display table table-bordered table-striped dataTable" id="dynamic-table" aria-describedby="dynamic-table_info">
                  <thead>
                    <tr role="row">
                        <th class="sorting_desc" role="columnheader" aria-sort="descending" tabindex="0" aria-controls="dynamic-table" rowspan="1" colspan="1" style="width:auto;" aria-label="Id: activate to sort column Descending">Id</th>
                        <th class="sorting" role="columnheader" tabindex="1" aria-controls="dynamic-table" rowspan="1" colspan="1" style="width:auto;" aria-label="Item Name: activate to sort column ascending">ItemName</th>
                        <th class="sorting" role="columnheader" tabindex="2" aria-controls="dynamic-table" rowspan="1" colspan="1" style="width:auto;" aria-label="Manufacturers: activate to sort column ascending">Manufacturer</th>
                        <th role="columnheader" tabindex="3" aria-controls="dynamic-table" rowspan="1" colspan="1" style="width:auto;" aria-label=""><i class="fa fa-edit"></i></th>
                        <th role="columnheader" tabindex="4" aria-controls="dynamic-table" rowspan="1" colspan="1" style="width:auto;" aria-label=""><i class="fa fa-times"></i></th>
                        <th role="columnheader" tabindex="5" aria-controls="dynamic-table" rowspan="1" colspan="1" style="width:auto;" aria-label=""><i class="fa fa-archive"></i></th>
                    </tr>
                  </thead>
                  
                  <tfoot>
                    <tr>
                        <th rowspan="1" colspan="1">Id</th>
                        <th rowspan="1" colspan="1">ItemName</th>
                        <th rowspan="1" colspan="1">Manufacturer</th>
                        <th rowspan="1" colspan="1"><i class="fa fa-edit"></i></th>
                        <th rowspan="1" colspan="1"><i class="fa fa-times"></i></th>
                        <th rowspan="1" colspan="1"><i class="fa fa-archive"></i></th>
                    </tr>
                  </tfoot>
                  <tbody role="alert" aria-live="polite" aria-relevant="all">
        
        <%
     if(rs.next())
     {
         rs.previous();
          boolean EO = false;
     while(rs.next())
     {
         int ItId=rs.getInt("ItemId");
         String ItemName=rs.getString("ItemName");
         String manu=rs.getString("Manufacturer");
         int CountForItem=0;
         String count="Select Count(*) as count from ItemDetails where ItemId='"+ItId+"'";
         rs2=conMe.getConnection(count);
         if(rs2.next()){CountForItem=rs2.getInt("count");}        
         
     %>
            <tr class="gradeA <%=EO?"even":"odd"%>">
                <td class="  sorting_1"><h3><%=ItId%></h3></td>
              <td class=" "><h3><%=ItemName%></h3></td>
              <td class=" "><h3><%=manu%></h3></td>
              <td class=" ">                                  
                <form action="Item.jsp" method="post">
                    <input type="hidden" name="T" value="Search">
                    <input type="hidden" name="Term" value="<%=ItemName%>">
                    <input type="submit" class="btn btn-success" value="Edit">
                </form>
              </td>
              <td class=" ">                                  
                <form action="Item.jsp" method="post">
                    <input type="hidden" name="T" value="DeleteItem">
                    <input type="hidden" name="ItemId" value="<%=ItId%>">
                    <input type="submit" class="btn btn-danger" value="Delete">
                </form>
              </td>
              <td><h3><%=CountForItem%></h3></td>
            </tr>
    <%
    EO = !EO;
     }
     %>
                        </tbody>
                    </table>
                </div> <!--\\\\\\\ Dynamic table Wrapper end \\\\\\-->
           </div>  <!--\\\\\\\ Table Responsive  end \\\\\\-->
     </div>  <!--\\\\\\\ Portlet Contents end \\\\\\-->
</div>  <!--\\\\\\\ Block Web  end \\\\\\-->

     <%
    }
     else
     {
     %>
     <div name="LightRed">&nbsp;</div>
     <div class="alert alert-danger nob">
         <h1>Sorry No Items Added Yet!</h1>
         <h2>Add Items <a href="Item.jsp">Here</a></h2>
     </div>
     <%
     }
     if(rs2!=null){rs2.close();}
     if(rs!=null){rs.close();}
     if(conMe!=null){conMe.closeMe();}
    }
}

%>

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
<script src="CustomJs/Remote.js"></script>
<script src="CustomValidation/ItemValidation.js"></script>
<script src="CustomValidation/BatchValidation.js"></script>

<script src="plugins/bootstrap-editable/bootstrap-editable.min.js"></script>
<script src="plugins/x-editable/form-x-editable.js"></script> 
<script src="plugins/mockjax/jquery.mockjax.min.js"></script> 

<script type="text/javascript" src="plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
   <script type="text/javascript" src="js/form-components.js"></script>
   <style>
       .dataTables_filter{
           float: right;
       }
   </style>
<script>
$(document).ready(function() {
    $('#ItemName').editable({
          success: function(response, newValue) {
        if(response.status === 'error') return response.msg;
          }
    });
    $('#Manufacturer').editable({
          success: function(response, newValue) {
        if(response.status === 'error') return response.msg;
          }
    });
});
</script>



</body>
</html>
