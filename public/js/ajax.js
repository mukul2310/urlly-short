
// if(port===8080)
// {
//     urlHeader="http://localhost:8080";
// }
// else
// {
//     urlHeader="https://urlly-short.herokuapp.com"
// }
$("form").on("submit",(e)=>
{
    e.preventDefault();
    const url=$("#url").val();
    const c_date=new Date().getTime();
    const e_date=c_date+15552000000;//6 months after creation
    $.ajax(
    {
        url:"/api",
        data:{
            original_url:url,
            creation_date:c_date,
            expiration_date:e_date
        },
        method:"POST",
        contentType:"application/x-www-form-urlencoded",
        success: function(response){
            //if request if made successfully then the response represent the data
    
            // $( "#result" ).empty().append("<a href=http://localhost:8080/"+response+">http://localhost:8080/"+response+"</a>" );
            $( "#result" ).empty().append("<a href=https://urlly-short.herokuapp.com/"+response+">https://urlly-short.herokuapp.com/"+response+"</a>" );
        }
    });
});