//检测session是否存在，不存在则跳回登录页面
checkSession = function() {
    var storage = window.sessionStorage;
    if(storage.getItem("name") == null){
        alert("您还未登录，请先登录。");
        window.location.href = "index.html";
        return false;
    }
    return true;
}

checkFirstLogin = function() {
    var storage = window.sessionStorage;
    if(storage.getItem("first_login") == "1"){
        alert("初次登录，请先修改密码。");
        window.location.href = "password.html";
        return true;
    }
    return false;
}