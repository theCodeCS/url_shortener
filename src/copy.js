export default function copyToClipboard() {
    var copyText = document.getElementById("copy");     // get text from element
    var input = document.createElement("textArea");     // create temporary (invalid) HTML element "textArea"

    input.value = copyText.textContent;                 // copying text content from original element to temp element
    
    document.body.appendChild(input);                   // appeninding the invalid HTML element
    input.select();
    document.execCommand("Copy");                       // select and copy text from temp element onto clipboard

    input.remove();                                     // (important) removing HTMl element "textarea" after copy
}