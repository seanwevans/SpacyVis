import { getRandomColor, isColorDark } from '../utils/color.js';

const dataAttributeLabels = {
    pos:            'part of speech',
    entType:        'type',
    value:          'text',
    lang:           'language',
    dep:            'dep',
    sentiment:      'sentiment',
    i:              'index',
    isAlpha:        'alphanumeric',
    isAscii:        'ascii',
    isBracket:      'bracket',
    isCurrency:     'currency',
    isDigit:        'digits',
    isLeftPunct:    'left punctuation',
    isLower:        'lowercase',
    isOov:          'out of vocabulary',
    isPunct:        'punctuation',
    isQuote:        'quote',
    isRightPunct:   'right punctuation',
    isSentEnd:      'sent end',
    isSentStart:    'sent start',
    isSpace:        'space',
    isStop:         'stop word',
    isTitle:        'title',
    isUpper:        'uppercase',
    likeEmail:      'like email',
    likeNum:        'like number',
    likeUrl:        'like url',
};

function adjustMainBody() {
    const headerHeight = document.querySelector('.header').offsetHeight;
    document.querySelector('.main-body').style.marginTop = `${headerHeight}px`;
    document.querySelector('.word-stats').style.marginTop = `${headerHeight}px`;
}

window.addEventListener('resize', adjustMainBody);

document.addEventListener("DOMContentLoaded", function() {
    
    adjustMainBody();
    
    document.addEventListener('mousemove', function(e) {
        const lens = document.querySelector('.magnifier');
        const { clientX: x, clientY: y } = e;
        
        lens.style.left = (x - lens.offsetWidth / 2) + 'px';
        lens.style.top = (y - lens.offsetHeight / 2) + 'px';

        const scaleX = 2;
        const scaleY = 2;

        lens.style.backgroundImage = `url(${document.body.ownerDocument.URL})`;
        lens.style.backgroundRepeat = 'no-repeat';
        lens.style.backgroundSize = `${window.innerWidth * scaleX}px ${window.innerHeight * scaleY}px`;
        lens.style.backgroundPosition = `-${x * scaleX - lens.offsetWidth / 2}px -${y * scaleY - lens.offsetHeight / 2}px`;

        lens.style.display = 'block';
    });

    document.addEventListener('mouseleave', function() {
        const lens = document.querySelector('.magnifier');
        lens.style.display = 'none';
    });

    document.querySelectorAll(".word").forEach(wordElem => {        
        wordElem.addEventListener("mouseenter", function() {                       
            let content = '<table>';
            for (let attr in this.dataset) {
                if (attr === 'tooltipSet') continue;
                const label = dataAttributeLabels[attr];
                content += `<tr><td>${this.dataset[attr]}</td><td>${label}</td></tr>`;
            }
            content += '</table>';

            const statsDiv = document.querySelector('.word-stats');
            statsDiv.innerHTML = content;            
            
            this.setAttribute('data-tooltip-set', 'true');
        });
    });

	document.querySelectorAll(".key span").forEach(span => {        
	    span.addEventListener('click', function() {
            
                let colorInput = document.createElement('input');
                colorInput.type = 'color';
                colorInput.value = this.style.backgroundColor;

                document.body.appendChild(colorInput);
                colorInput.addEventListener('change', () => colorInput.remove());
                colorInput.addEventListener('input', (event) => {
                
	            let newColor = event.target.value;
	            let entityType = this.parentElement.textContent.trim();
				
				document.querySelectorAll('.key').forEach(key => {                    
					if (key.textContent.trim() === entityType) {
						key.querySelector('span').style.backgroundColor = newColor;
                        
                        if (isColorDark(newColor)) {
                            key.querySelector('span').style.color = '#FFFFFF';
                        } else {
                            key.querySelector('span').style.color = '#000000';
                        }
					}
				});

				document.querySelectorAll('.word').forEach(word => {                    
					if (word.dataset.entType === entityType) {
						word.style.backgroundColor = newColor;
                        
                        if (isColorDark(newColor)) {
                            word.style.color = '#FFFFFF';
                        } else {
                            word.style.color = '#000000';
                        }
					}
				});
	        });
	        colorInput.click();
	    });
	});
    
});
