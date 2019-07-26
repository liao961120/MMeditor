document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.md-preview').style.display = 'none';

    initTextarea();
    //window.onresize = sizeIframe; 
    document.querySelector('iframe').addEventListener('load', () => {
        document.querySelector("textarea").focus();
    });


    // Preview markdown
    document.querySelector('button#showPreview').onclick = function() {
        let mdPreview = document.querySelector('.md-preview');
        let status = mdPreview.style.display;

        if (status == 'block') {
            mdPreview.style.display = 'none';
            this.innerText = 'Preview';  // change button label
        } else {
            mdPreview.style.display = 'block';
            this.innerText = 'Hide';
        }

        simulateInput();
       //document.querySelector('button#hidePreview').style.display = 'inline';
    };


    // local storage
    if (!localStorage.getItem('markdown-local'))
        localStorage.setItem('markdown-local', '')
    else 
        document.querySelector('textarea#text-input').value = localStorage.getItem('markdown-local');
    
    // Markdown input
    document.querySelector('textarea').addEventListener('keydown', sizeTextarea);
    document.querySelector('textarea').addEventListener('focus', sizeTextarea);

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
    });  // textarea input listener


    // Latex Helper
    document.querySelector('button#latex-helper').addEventListener('click', () => {
        let div = document.querySelector('.latex-helper');
        let status = div.style.display;

        if (status == 'none') 
            div.style.display = 'block';
        else
            div.style.display = 'none';
    });

});  // DOMContentLoaded

///////////////// Helpers ////////////////////

function initTextarea() {
    let textarea = document.querySelector('textarea');
    let minHeight = window.innerHeight * 0.75
    console.log(textarea.height, window.innerHeight);
    textarea.style.height = minHeight + 'px';
}

function sizeTextarea() {
    let adjHeight = this.clientHeight;
    let minHeight = window.innerHeight * 0.76;
    adjHeight = Math.max(this.scrollHeight, adjHeight);

    let preview = document.createElement('textarea');
    preview.value = this.value;
    document.body.append(preview);

    // Get current scroll height;
    let height = preview.scrollHeight;
    let styleHeight = parseFloat(this.style.height.slice(0, -2));
    preview.parentNode.removeChild(preview);

    if (height*1.01 < minHeight) 
        return
    else
        this.style.height = height*1.01 + 'px';  //40: buffer
}

function simulateInput() {
    var el = document.querySelector("textarea#text-input");
    var evt = new Event('input');
    el.dispatchEvent(evt);
}