$(document).ready(function(){
    $('#phoneAdd').inputmask("(999) 999-9999");
    $('#phone').inputmask("(999) 999-9999");
    $("#update").hide();

    assignDataToTable();

    $('table').on('click', 'a[id="edit"]', function(e){

       var id = $(this).closest('tr').children('td:first').text();
       var name = $(this).closest('tr').children('td:nth-child(2)').text(); 
       var lastname = $(this).closest('tr').children('td:nth-child(3)').text();
       var phone = $(this).closest('tr').children('td:nth-child(4)').text();

      //  $(".modal-body #wall-post").val($("#linkURL").val());

        $("#name").val(name);
        $("#lastname").val(lastname);
        $("#phone").val(phone);
/*
        $("#update").show();
        $("#save").hide();*/

        $("#update").click(function() {

            var jsonVar = {
                name: $("#name").val(),
                name: $("#lastname").val(),
                name: $("#phone").val()
            };

            $.ajax({
                type:"PUT",
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                url:"http://localhost:8080/api/updateUser/" + id,
                success: function(data){
                    alertUsing("Düzenlendi.", true);
                    $("#update").hide();
                    $("#save").show();
                    $("#name").val("");
                    $("#lastname").val("");
                    $("#phone").val("");
                    assignDataToTable();
                },
                error: function(err) {  
                    console.log(err);
                    alert(err);
                }

        });

    });

    });


/*
    var age = $("#lastname");

    age.keypress(function(key){
        if(key.charCode > 48 && key.charCode < 57){
            if(age.val().length < 3){
                return true;
            }else{
                alertUsing("3 Haneyi Aştınız.", false);
                return false;
            }
        }else{
            alertUsing("Sayı Giriniz.", false);
            return false;
        }
    });

*/

    $("#save").click(function() {

        var jsonVar = {

            name: $("#nameAdd").val(),
            lastname: $("#lastnameAdd").val(),
            phone: $("#phoneAdd").val()
        };

        $.ajax({
            type:"POST",
            url:"http://localhost:8080/api/addUser",
            data: JSON.stringify(jsonVar),
            contentType: "application/json",
            success: function(data){
                assignDataToTable();
            },
            error: function(err) {
                console.log(err);
                alert(err);
            }
        });


    });

    $('table').on('click', 'a[id="delete"]', function(e){

        var id = $(this).closest('tr').children('td:first').text();

        $("#deletecomfirm").click(function(){
        //var inputVal = document.getElementById("id").value;
        //console.log(inputVal);
        $.ajax({
            type:"DELETE",
            url:"http://localhost:8080/api/delete/" +id,
            success: function(data){
                alertUsing("Silindi.", true);
                assignDataToTable();
            },
            error: function(err) {
                console.log(err);
                alert(err);
            }

        },
        id='');

        });
    });

    function assignDataToTable() {
        $("tbody").empty();
        $.ajax({    
          type:"GET",
          contentType: "application/json",
          url:"http://localhost:8080/api/findAllUsers",
          success: function(data) {
            var users = JSON.parse(JSON.stringify(data));
            for (var i in users) {
                $("tbody").
                append("<tr> \
                            <td hidden='hidden'>" +  users[i].id + "</td> \
                            <td>" +  users[i].name + "</td> \
                            <td>" +  users[i].lastname + "</td> \
                            <td>" +  users[i].phone + "</td> \
                            <td> <a href=\"#editEmployeeModal\" id=\"update\" class=\"edit\" data-toggle=\"modal\"><i class=\"material-icons\" data-toggle=\"tooltip\" title=\"Edit\">&#xE254;</i></a>\
                            <a href=\"#deleteEmployeeModal\" id=\"delete\" class=\"delete\" data-toggle=\"modal\"><i class=\"material-icons\" data-toggle=\"tooltip\" title=\"Delete\">&#xE872;</i></a>\
                    </td> \
                    </tr>");
            }
          },
          error: function(data) { 
            console.log(data);
            }
        });
       
    }

function alertUsing(text, flag) {

    var alert = $(".alert");

    if(flag){
        alert.removeClass("alert-danger").addClass("alert-success");
    }else{
        alert.removeClass("alert-success").addClass("alert-danger");
        
    }
    
    alert.fadeIn(400);
    alert.css("display", "block");
    alert.text(text);
    setTimeout(function() {
        alert.fadeOut();
    }, 2000);

  }

});
