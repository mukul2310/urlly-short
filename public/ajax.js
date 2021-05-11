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
            $( "#result" ).empty().append("<a href=https://urlly-short.herokuapp.com/"+response+" target='_blank' rel='noopener noreferrer'>https://urlly-short.herokuapp.com/"+response+"</a> <a class='btn p-0' onclick='copyText()'><svg width='30' height='30' xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 24 24'><path d='M15,14H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm0-4H11a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm2-6H15.82A3,3,0,0,0,13,2H11A3,3,0,0,0,8.18,4H7A3,3,0,0,0,4,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm8,14a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H8V7A1,1,0,0,0,9,8h6a1,1,0,0,0,1-1V6h1a1,1,0,0,1,1,1Z'/></svg></a>");
        }
    });
});