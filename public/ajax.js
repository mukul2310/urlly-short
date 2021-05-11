$("form").on("submit",(e)=>
{
    e.preventDefault();
    const url=$("#url").val();
    const exp_date=new Date().getTime()+15552000000;//6 months after creation
    $.ajax(
    {
        url:"/api",
        data:{
            original_url:url,
            expiration_date:exp_date
        },
        method:"POST",
        contentType:"application/x-www-form-urlencoded",
        success: function(response){
            //if request if made successfully then the response represent the data
    
            // $( "#result" ).empty().append("<a href=http://localhost:8080/"+response+">http://localhost:8080/"+response+"</a>" );
            $( "#result" ).empty().append("<a href=https://urlly-short.herokuapp.com/"+response+" target='_blank' rel='noopener noreferrer'>https://urlly-short.herokuapp.com/"+response+"</a>" );
        }
    });
});