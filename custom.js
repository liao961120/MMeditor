document.addEventListener('DOMContentLoaded', () => {
    sizeIframe();
    window.onresize = sizeIframe; 



    
    // local storage
    if (!sessionStorage.getItem('markdown-local'))
        sessionStorage.setItem('markdown-local', '')
    else 
        document.querySelector('textarea#text-input').value = sessionStorage.getItem('markdown-local');
    
    document.querySelector('textarea#text-input').addEventListener('input', function() {
        // update sessionStorage
        let content = this.value;
        sessionStorage.setItem('markdown-local', content);

        // render math        
        renderMathInElement(
            document.querySelector('#preview'),
            {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "\\[", right: "\\]", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\(", right: "\\)", display: false}
                ]
        });
    
    });
});


function sizeIframe() {
    var iframe = document.querySelector('iframe');
    iframe.height = window.innerHeight * 0.95;
}
