function onSubmit()
{
    if($("#url").val()!="")
        $('#result_div').removeAttr('hidden');
    $('#expire_toast').toast('show');

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