function showFields(){
    var hiddenFields = document.getElementsByClassName("hiddenFields");
    for(var i=0; i<hiddenFields.length; i++){
        hiddenFields[i].style.visibility = "visible";
    }
}