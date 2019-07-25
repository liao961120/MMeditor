document.addEventListener('DOMContentLoaded', () => {
    sizeIframe();
    window.onresize = sizeIframe; 



    
    // local storage
    if (!sessionStorage.getItem('markdown-local'))
        sessionStorage.setItem('markdown-local', '')
    else 
        document.querySelector('textarea#text-input').value = sessionStorage.getItem('markdown-local');
    
    // update storage
    document.querySelector('textarea#text-input').addEventListener('input', function() {
        let content = this.value;
        sessionStorage.setItem('markdown-local', content)
    });
});


function sizeIframe() {
    var iframe = document.querySelector('iframe');
    iframe.height = window.innerHeight * 0.95;
}
