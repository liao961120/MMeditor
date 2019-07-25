document.addEventListener('DOMContentLoaded', () => {
    sizeIframe();
    window.onresize = sizeIframe; 

    document.querySelector('button#showPreview').onclick = () => {
        let mdPreview = document.querySelector('.row.md-preview');
        mdPreview.style.display = 'block';
        document.querySelector('button#hidePreview').style.display = 'inline';

        setInterval(window.scrollTo(0,0), 300); 
    };

    document.querySelector('button#hidePreview').onclick = () => {
        let mdPreview = document.querySelector('.row.md-preview');
        mdPreview.style.display = 'none';
        document.querySelector('button#hidePreview').style.display = 'none';
    };   


    // local storage
    if (!localStorage.getItem('markdown-local'))
        localStorage.setItem('markdown-local', '')
    else 
        document.querySelector('textarea#text-input').value = localStorage.getItem('markdown-local');
    
    document.querySelector('textarea#text-input').addEventListener('input', function() {
        // update localStorage
        let content = this.value;
        localStorage.setItem('markdown-local', content);

        // render math        
        renderMathInElement(
            document.querySelector('#preview'),
            {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false},
                ]
        });
    
    });
});


function sizeIframe() {
    var iframe = document.querySelector('iframe');
    iframe.height = window.innerHeight * 0.95;
}
