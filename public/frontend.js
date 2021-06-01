function onSubmit()
{
    if($("#url").val()!="")
    {
        $('#result_div').removeAttr('hidden');
        if($("#custom_url").val()!="")
        {
            $("#pass_custom_url").attr("required",true);
        }
        else
        {
            $("#pass_custom_url").removeAttr("required");
        }
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
function editURL()
{
    
}