$(document).ready(function(){
    //function to display image before upload
    $("input.image").change(function(){
        var file=this.files[0];
        var url=URL.createObjectURL(file);
        $(this).closest(".row").find(".preview_img").attr("src",url);
    });

    //function to insert data to database 
    $("#insertForm").on("submit",function(e){ 
        $("#insertBtn").attr("disabled","disabled");
        e.preventDefault();
        $.ajax({
            url: "server.php?action=insertData",
            type:"POST",
            data: new FormData(this),
            contentType:false,
            cache:false,
            processData:false,
            success:function(response){
                var response=JSON.parse(response);
                if(response.statusCode==200){
                    $("#offcanvasAddUser").offcanvas("hide");
                    $("#insertBtn").removeAttr("disabled");
                    $("#insertForm")[0].reset();
                    $(".preview_img").attr("src","image/default_profile.jpg");
                    $("#successToast").toast("show");
                    $("#successMsg").html(response.message);
                    fetchData();

                }else if(response.statusCode==500){
                    $("#offcanvasAddUser").offcanvas("hide");
                    $("#insertBtn").removeAttr("disabled");
                    $("#insertForm")[0].reset();
                    $(".preview_img").attr("src","image/default_profile.jpg");
                    $("#errorToast").toast("show");
                    $("#errorMsg").html(response.message);

                }else if(response.statusCode==400)
                    {
                        $("#insertBtn").removeAttr("disabled"); 
                        $("#errorToast").toast("show");
                        $("#errorMsg").html(response.message);
    
                    }
                  
            }
        })
    })
});