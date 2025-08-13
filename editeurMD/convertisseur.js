document.addEventListener('DOMContentLoaded', () => {
    const htmlInput = document.getElementById('saisie');
    const htmlOutput = document.getElementById('rendu');

    function convertionMarkDownToHTML(texte) {
        
        // Taille titre
        texte = texte.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        texte = texte.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        texte = texte.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        texte = texte.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
        texte = texte.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
        texte = texte.replace(/^###### (.*$)/gim, '<h6>$1</h6>');

        // Bloc de code
        /*        
        NB : Le code pour le bloc de code est mis ici afin d'éviter d'avoir des problèmes avec les saut de ligne
        au sein même du bloc de code, et également afin d'éviter des comportements anormaux en rapport avec le télétype
        */
        texte = texte.replace(/```([\s\S]*?)```/g, (_, code) => {
        const escaped = code.replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;');
        return `<pre><code>${escaped}</code></pre>`;
        });

        // Saut de ligne
        texte = texte.replace(/\n$/gim, '<br/>');

        // Télétype
        texte = texte.replace(/`(.*)`/gim, '<tt>$1</tt>');

        // Souligné  
        texte = texte.replace(/\_\_(.*)\_\_/gm, '<span style="text-decoration: underline;">$1</span>');
    
        // Gras
        texte = texte.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>');
        texte = texte.replace(/___(.*)___/gim, '<b>$1</b>');

        // Italique
        texte = texte.replace(/\*(.*)\*/gim, '<i>$1</i>');
        texte = texte.replace(/_(.*)_/gim, '<i>$1</i>');

        // Bloc de citation
        texte = texte.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

        // Trait horizontal
        texte = texte.replace(/^\s*[-=]{3,}\s*$/gim, '<hr/>');

       // Liste non ordonée
       texte = texte.replace(/^\s*[-] (.*$)/gim, '<ul><li>$1</li></ul>').replace(/<\/ul>\n?<ul>/g, '');
        
        // Liste ordonée
        texte = texte.replace(/^\s*[+] (.*$)/gim, '<ol><li>$1</li></ol>').replace(/<\/ol>\n?<ol>/g, '');

        // Convertion de liens
        // [texte](lien)
        texte = texte.replace(/\[([^\[\]]+)\]\((?!.*\.(?:png|jpg|gif|jpeg))([^\)]+)\)/gim, '<a href="$2">$1</a>');

        // Convertion d'images
        // ![alt](src)
        texte = texte.replace(/\!\[([^\[\]]+)\]\((.*?)\)/gim, '<img alt="$1" src="$2"/>');
        
        // Liste à coche (non coché)
        texte = texte.replace(/^\[\] (.*$)/gim, '<input type="checkbox"/>$1'); // Sans espace au centre

        texte = texte.replace(/^\[\s\] (.*$)/gim, '<input type="checkbox"/>$1'); // Avec un espace au centre

        // Liste à coche (coché)
        texte = texte.replace(/^\[\X\] (.*$)/gim, '<input type="checkbox" checked/>$1');
        
        // Couleur texte
        /* 
        \c[color] texte \c
        "color" fait référence à une couleur direct (red, blue, white, green...)
        Peut également être remplacer par un hexadécimal ou rgb(X, X, X)
        */
        texte = texte.replace(/\\c\[(.*)\] (.*) \\c /gim, '<span style="color:$1;">$2 </span>');
        
        return texte.trim();
    }

    function majOutput() {
        const texte = htmlInput.value;
        htmlOutput.innerHTML = convertionMarkDownToHTML(texte);
    }

    htmlInput.addEventListener('input', majOutput);
});
