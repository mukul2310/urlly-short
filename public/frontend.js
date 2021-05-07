function onSubmit()
{
    if($("#url").val()!="")
        $('#result_div').removeAttr('hidden');
}
function copyText()
{
    $temp=$("<input>");
    $("body").append($temp);
    $temp.val($("#result").text()).select();
    document.execCommand("copy");
    $temp.remove();
    $('.toast').toast('show');
};