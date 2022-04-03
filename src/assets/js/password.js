$(function(){
    $("#modify").click(function(){
        if(checkSession()){
            $("span.errorMsg").text("");
            var oldPassword = $("#oldPassword").val();
            var newPassword = $("#newPassword").val();
            var confirmNewPassword = $("#confirmNewPassword").val();
            var check = checkNewPassword(newPassword,confirmNewPassword);
            if(!check.checkLength){
                $("span.errorMsg").text("密码长度应为6-32位");
                return false;
            }
            if(!check.checkStrong){
                $("span.errorMsg").text("密码应包含数字、字母、特殊字符(-_)中至少两种");
                return false;
            }
            if(!check.checkConfirm){
                $("span.errorMsg").text("两次新密码输入应相同");
                return false;
            }
            var schoolNumber = window.sessionStorage.getItem("schoolNumber");
            $.ajax({
                type:"post",
                url:"/homepage/modifyPassword",
                async:false,
                contentType:'application/json',
                dataType:'json',
                data:JSON.stringify({"oldPassword":oldPassword,"newPassword":newPassword,"schoolNumber":schoolNumber}),
                success:function(result){//后端返回result
                    var success=result.success;
                    if(success=="1"){ //返回值为1表示修改密码成功
                        $("span.errorMsg").text("");
                        alert("修改密码成功。");
                        if(window.sessionStorage.getItem("first_login") == "true"){
                            window.sessionStorage.setItem("first_login","0");
                            window.location.href = "homepage.html";
                        }
                        //window.location.href="homepage.html";
                        return true;
                    }else{//否则修改失败。
                        $("span.errorMsg").text("现用密码错误");
                        return false;
                    }
                },
                error:function(){
                    $("span.errorMsg").text("请求错误");
                    return false;
                }
            });
        }
    });
});

function checkNewPassword(newpw,confirm){
    var check={checkLength:true,checkConfirm:true,checkStrong:true};
    if(newpw.length<6 || newpw.length>32) check.checkLength = false;
    if(confirm!=newpw) check.checkConfirm = false;
    var strength = 0;
    if(/\d+/.test(newpw)) strength++;
    if(/[a-zA-z]+/.test(newpw)) strength++;
    if(/[-_]+/.test(newpw)) strength++;
    if(strength<2) check.checkStrong = false;
    return check;
}