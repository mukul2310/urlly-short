$("#url_form").on("submit",(e)=>
{
    e.preventDefault();
    const url=$("#url").val();
    const customUrl=$("#custom_url").val();
    const exp_date=new Date().getTime()+Number(15778800000);//6 months after creation
    const passCustomUrl=$("#pass").val();
    let data,flag=false;
    function checkAlias(str)
    {
        for(i=0;i<str.length;i++)
        {
            let c=str.charAt(i);
            if((c<'a'||c>'z')&&(c<'A'||c>'Z')&&(c<'0'||c>'9'))
            {
                return false;
            }
        }
        return true;
    }
    if(customUrl!="")
    {
        if(!checkAlias(customUrl))
        {
            $("#error_alias").removeAttr("hidden");
            flag=true;
        }
        else
        {
            $("#error_alias").attr("hidden",true);   
        }
        if(customUrl.length<4)
        {
            $("#error_alias1").removeAttr("hidden");
            flag=true;
        }
        else
        {
            $("#error_alias1").attr("hidden",true);
        }
        if(passCustomUrl.length<3)
        {
            $("#error_pass").removeAttr("hidden");
            flag=true;
        }
        else
        {
            $("#error_pass").attr("hidden",true);
        }    
        if(flag)
        return;
        data=
        {
            original_url:url,
            expiration_date:exp_date,
            custom_url:customUrl,
            pass_custom_url:passCustomUrl,
            clicks:0
        };
    }
    else
    {
        data=
        {
            original_url:url,
            expiration_date:exp_date,
            clicks:0
        };
    }
    $.ajax(
    {
        url:"/create_short_url",
        data:data,
        method:"POST",
        contentType:"application/x-www-form-urlencoded",
        success: function(response){
            //if request if made successfully then the response represent the data
    
            // $( "#result" ).empty().append("<a href=http://localhost:8080/"+response+">http://localhost:8080/"+response+"</a>" );
            if(response)
            {
                $( "#result" ).empty().append("<a href=https://urlly-short.herokuapp.com/"+response+" target='_blank' rel='noopener noreferrer'>https://urlly-short.herokuapp.com/"+response+"</a> <a class='btn p-0' onclick='copyText()'><svg width='30' height='30' xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 24 24'><path d='M15,14H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm0-4H11a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm2-6H15.82A3,3,0,0,0,13,2H11A3,3,0,0,0,8.18,4H7A3,3,0,0,0,4,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm8,14a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H8V7A1,1,0,0,0,9,8h6a1,1,0,0,0,1-1V6h1a1,1,0,0,1,1,1Z'/></svg></a>");
                $("#validationFeedback").attr('hidden',true);
                $('#expire_toast').toast('show');
                $("#custom_url").removeClass('is-invalid');
            }
            else
            {
                $("#custom_url").addClass('is-invalid');
                $("#validationFeedback").removeAttr('hidden');
            }
        }
    });
});

// $('#home').on('click',()=>
// {
//     $.ajax(
//         {
//             url:"/",
//             method:"GET",
//             success: function(response)
//             {
//                 $("body").empty().append(response);
//             }
//         }
//     )
// })

// $('#myurl').on('click',()=>
// {
//     $.ajax(
//         {
//             url:"/analytics",
//             method:"GET",
//             success: function(response)
//             {
//                 $("body").empty().append(response);
//             }
//         }
//     )
// })


$("#second_form").on('submit',(e)=>
{
    e.preventDefault();
    const custom_url= $("#second_custom_url").val();
    const pass=$("#second_pass").val();
    let data=
    {
        custom_url:custom_url,
        pass:pass,
    }
    $.ajax(
        {
            url:'/authentication',
            method:"POST",
            data:data,
            success:function(response)
            {
                $("table").removeAttr("hidden");
                $("#table_short").empty().append(response.shortUrl);
                $("#table_org").empty().append(response.longUrl);
                $("#table_exp").empty().append(new Date(Number(response.expiry)).toString());
                $("#table_clicks").empty().append(response.clicks);
            },
            error:function(error)
            {
                $("#form_error").empty().append(error);
            }

        }
    )
})
function editURL()
{
    const org_link=$("#modal_original").val();   
    const pass=$("#modal_pass").val();
    const cus_link=$("#modal_short").val();
    let data
    if(org_link=="")
    {
        $("#error_org").removeAttr("hidden");
    }
    if(org_link!="")
    {
        $("#error_org").attr("hidden",true);
    }
    if(pass==="")
    {
        data=
        {
            original_url:org_link,
            pass:$("#second_pass").val(),
            custom_url:cus_link
        }
    }
    else
    {
        data=
        {
            original_url:org_link,
            pass:pass,
            custom_url:cus_link
        }
    }
    if(org_link!="")
    {
        $.ajax(
            {
                url:'/update',
                method:"POST",
                data:data,
                success:function()
                {
                    $("table").removeAttr("hidden");
                    $("#table_org").empty().append(org_link);
                    $('#modal_edit').modal('toggle');
                }
            }
        )
    }
}