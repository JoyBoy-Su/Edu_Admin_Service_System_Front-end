$(function(){
    $("#logout").click(function(){
        window.sessionStorage.clear();
        window.location.href = "index.html";
    });
    $("#modifyProfile").click(function(){
        if(checkSession())
            document.getElementById("canvas").src = "profile.html";
    });
    $("#modifyPassword").click(function(){
        if(checkSession())
            document.getElementById("canvas").src = "password.html";
    });
    $("#studentCourses").click(function(){
        if(checkSession())
            document.getElementById("canvas").src = "studentCourses.html";
    });
    $("#studentScore").click(function(){
        if(checkSession())
            document.getElementById("canvas").src = "studentScore.html";
    });
    $("#teacherCourses").click(function(){
        if(checkSession())
            document.getElementById("canvas").src = "teacherCourses.html";
    });
    $("#teacherScore").click(function(){
        if(checkSession())
            document.getElementById("canvas").src = "teacherScore.html";
    });
    $("#register").click(function(){
        if(checkSession())
            window.location.href = "register.html";
    });
    $("#delete").click(function(){
        if(checkSession())
            document.getElementById("canvas").src = "delete.html";
    });
});

function getInfo(){//从session获取信息并显示
    var storage = window.sessionStorage;
    var schoolNumber = storage.getItem("schoolNumber");
    var name = storage.getItem("name");
    var type = storage.getItem("type");
    var identity = "";
    if(type == "student") identity = "学生";
    else if(type == "teacher") identity = "教师";
    else if(type == "admin") identity = "管理员";
    $("#name").text(name+" "+schoolNumber);
    $("#identity").text(identity);
}

function displayControll(){//只显示当前用户身份所需的功能
    var identity = document.getElementById("identity").innerHTML;
    if(identity == "学生"){
        $("#teacher").hide();
        $("#admin").hide();
    }
    else if(identity == "教师"){
        $("#student").hide();
        $("#admin").hide();
    }
    else if(identity == "管理员"){
        $("#student").hide();
        $("#teacher").hide();
    }
}