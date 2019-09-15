$(document).ready(function () {
    var redirectUrl = "http://localhost:8080";

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    assignDataToTable();
    $('#phoneAdd').inputmask("(999) 999-9999");
    $('#phone').inputmask("(999) 999-9999");

    $("#save").click(function () {
        var response = grecaptcha.getResponse();
        if (response.length == 0) {
            document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This captcha is required.</span>';
            return false;
        } else {
            if ($("#lastnameAdd").val().length == 0 || $("#phoneAdd").val().length == 0 || $("#nameAdd").val().length == 0) {
                document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This input is required.</span>';
            } else {
                var jsonVar = {
                    name: $("#nameAdd").val(),
                    lastname: $("#lastnameAdd").val(),
                    phone: $("#phoneAdd").val()
                };
                $.ajax({
                    type: "POST",
                    url: redirectUrl + "/api/addUser",
                    data: JSON.stringify(jsonVar),
                    contentType: "application/json",
                    success: function (data) {
                        $(this).prop("disabled", true);
                        // add spinner to button
                        if (data == "true") {
                            Command: toastr["success"]("User successfully registered.")
                            setTimeout(function () {
                                location.reload();
                            }, 2000);
                        }
                    },
                    error: function (err) {
                        Command: toastr["warning"]("User registration failed.")
                    }
                });
            }
            return true;
        }

    });

    $('table').on('click', 'a[id="delete"]', function (e) {
        var id = $(this).closest('tr').children('td:first').text();

        $("#deletecomfirm").click(function () {
            $.ajax({
                type: "DELETE",
                url: redirectUrl + "/api/delete/" + id,
                success: function (data) {
                    if (data == "true") {
                        Command: toastr["success"]("User successfully deleted.")
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    }
                },
                error: function (err) {
                    console.log(err);
                    alert(err);
                }
            });
        });
    });

    function assignDataToTable() {
        $("tbody").empty();
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: redirectUrl + "/api/findAllUsers",
            success: function (data) {
                var users = JSON.parse(JSON.stringify(data));
                for (var i in users) {
                    $("tbody").append("<tr> \
                            <td hidden='hidden'>" + users[i].id + "</td> \
                            <td>" + users[i].name + "</td> \
                            <td>" + users[i].lastname + "</td> \
                            <td>" + users[i].phone + "</td> \
                            <td> <a href=\"#editEmployeeModal\" data-id=\'" + users[i].id + "'  data-name=\'" + users[i].name + "' data-lastname=\'" + users[i].lastname + "'  data-phone=\'" + users[i].phone + "'  id=\"update\" class=\"edit\" data-toggle=\"modal\"><i class=\"material-icons\" data-toggle=\"tooltip\" title=\"Edit\">&#xE254;</i></a>\
                            <a href=\"#deleteEmployeeModal\" id=\"delete\" class=\"delete\" data-toggle=\"modal\"><i class=\"material-icons\" data-toggle=\"tooltip\" title=\"Delete\">&#xE872;</i></a>\
                    </td> \
                    </tr>");
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    function alertUsing(text, flag) {

        var alert = $(".alert");

        if (flag) {
            alert.removeClass("alert-danger").addClass("alert-success");
        } else {
            alert.removeClass("alert-success").addClass("alert-danger");

        }

        alert.fadeIn(400);
        alert.css("display", "block");
        alert.text(text);
        setTimeout(function () {
            alert.fadeOut();
        }, 2000);

    }

    $('#editEmployeeModal').on('show.bs.modal', function (event) {

        var button = $(event.relatedTarget)
        var id = button.data('id')
        var name = button.data('name')
        var lastname = button.data('lastname')
        var phone = button.data('phone')
        var modal = $(this)
        modal.find('.modal-body #name').val(name)
        modal.find('.modal-body #lastname').val(lastname)
        modal.find('.modal-body #phone').val(phone)

        $("#editcomfirm").click(function () {
            var jsonVar = {
                name: $("#name").val(),
                lastname: $("#lastname").val(),
                phone: $("#phone").val()
            };
            $.ajax({
                type: "PUT",
                url: redirectUrl + "/api/updateUser/" + id,
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                success: function (data) {
                    if (!(data.length == 0)) {
                        Command: toastr["success"]("User successfully Updated.")
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    }
                },
                error: function (err) {
                    console.log(err);
                    alert(err);
                }
            });
        });
    });
});
