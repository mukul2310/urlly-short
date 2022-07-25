function onSubmit()
{
    if($("#url").val()!="")
    {
        if($("#custom_url").val()!="")
        {
            $("#pass").attr("required",true);
        }
        else
        {
            $("#pass").removeAttr("required");
        }
        //one ajax function for data validation of short url
    }
}
function copyText()
{
    temp=$("<input>");
    $("body").append(temp);
    temp.val($("#result").text()).select();
    document.execCommand("copy");
    temp.remove();
    $('#copy_toast').toast('show');
};
function openEditModal()
{
    $("#modal_short").val($("#table_short").html());
    $("#modal_original").val($("#table_org").html());
}