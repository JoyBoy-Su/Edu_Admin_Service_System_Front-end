function onFocus(doucment_id) {
	var inputObj = $("#" + doucment_id);
	inputObj.css("border", "1px #e3e3e3 solid");
}

// 页面加载完成之后
$(function() {
    // 给注册按钮添加事件
    $("#sub-btn").click(function(){
        if(checkSession()){
            //错误提示dom对象，样式设置为红色，便于报错
            var errorMsg = $("span.errormsg");
            errorMsg.css("color", "red");


            // 获取用户名
            var usernameValue = $("#username").val();
            //判空
            if (usernameValue == "") {
                errorMsg.text("请填写用户名称！")
                $("#username").css("border", "red solid");
                return false;
            }
            // 验证用户名是否合法
            var usernameReg = /^[\u0391-\uFFE5A-Za-z]+$/;
            // 验证用户信息
            if (!usernameReg.test(usernameValue)) {
                // 提示用户
                errorMsg.text("用户名不合法！");
                $("#username").css("border", "red solid");
                return false;
            }

            //获取用户身份
            var statusValue = $('input:radio:checked').val();
            //判断是否选择
            if (statusValue == undefined) {
                errorMsg.text("请选择用户身份！");
                return false;
            }

            //获取用户学工号
            var schoolNumber = $("#schoolNumber").val();
            //判空
            if(schoolNumber == "") {
                errorMsg.text("请输入学工号！");
                $("#schoolNumber").css("border", "red solid");
                return false;
            }
            var schoolReg;
            if(statusValue == "student") schoolReg = /^\d{6}$/;     //学号6位
            else schoolReg = /^\d{8}$/;                             //工号8位
            //判断学工号是否合法
            if(!schoolReg.test(schoolNumber)) {
                errorMsg.text("学工号不合法！");
                $("#schoolNumber").css("border", "red solid");
                return false;
            }

            //获取身份证号
            var ID = $("#ID").val();
            //判空
            if( ID == "") {
                errorMsg.text("请输入身份证号！");
                $("#ID").css("border", "red solid");
                return false;
            }
            //判断身份证号是否合法
            var IDReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if(!IDReg.test(ID)) {
                errorMsg.text("身份证号不合法！");
                $("#ID").css("border", "red solid");
                return false;
            }

            //获取电话号码
            var telephone = $("#telephone").val();
            // 若电话号码非空，则验证号码是否合法
            if(telephone != "") {
                var telephoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
                if(!telephoneReg.test(telephone)) {
                    errorMsg.text("电话号码不合法！");
                    $("#telephone").css("border", "red solid");
                    return false;
                }
            }

            // 获取邮件
            var emailValue = $("#email").val();
            // 若邮件非空，则验证邮件输入是否合法。
            if(emailValue != "") {
                var emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                if (!emailReg.test(emailValue)) {
                    // 提示用户
                    errorMsg.text("邮件输入不合法！");
                    $("#email").css("border", "red solid");
                    return false;
                }
            }


            //确认信息无误传给服务器
            var arr = {
                "name" : usernameValue,
                "type" : statusValue,
                "schoolNumber" : schoolNumber,
                "ID" : ID,
                "telephone" : telephone,
                "email" : emailValue
            };

            $.ajax({
                type : "POST",
                url : "/homepage/addMember",
                dataType : "json",    //数据类型是json
                data:JSON.stringify(arr),
                //controller中的函数做完操作之后会通知success
                success : function(result) {
                    if(result.success == "1") {
                        errorMsg.css("color", "green");
                        errorMsg.text("注册成功！");
                    }
                    else {
                        errorMsg.text("注册失败！学工号：" + schoolNumber + "已存在！");
                    }
                },
                error : function() {
                    errorMsg.css("color", "red");
                    $("span.errorMsg").text("注册失败！");
                }
            });
        }
    });

});
