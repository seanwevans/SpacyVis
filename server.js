const express = require('express');
const multer = require('multer');
const xml2js = require('xml2js');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMime = ['text/xml', 'application/xml'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedMime.includes(file.mimetype) && ext === '.xml') {
            cb(null, true);
        } else {
            cb(new Error('Only XML files are allowed'));
        }
    }
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function isColorDark(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b < 128;    
}


app.get('/', (req, res) => {
	res.render('index', { 
		wordsData: [], 
		uniqueEntityTypes: [], 
		entityTypeColorMap: {}, 
		entityTypeTextColorMap: {} 
	});
});

app.post('/upload', (req, res) => {
    const startTime = Date.now();
    upload.single('xmlfile')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err.message);
        } else if (err) {
            return res.status(500).send('An unknown error occurred when uploading.');
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const xmlData = req.file.buffer.toString();
        xml2js.parseString(xmlData, (parseErr, result) => {
            if (parseErr) {
                res.status(500).send('Unable to parse XML');
                return;
            }

            const words = result.document.word || [];
            const wordsData = words.map(wordElem => {
                const wordInfo = { value: wordElem.$.value }; // Get attributes
                (wordElem.method || []).forEach(methodElem => {
                    wordInfo[methodElem.$.value] = methodElem._;
                });
                return wordInfo;
            });

            const uniqueEntityTypes = [...new Set(wordsData.map(word => word.ent_type_))].filter(Boolean);
            const entityTypeColorMap = {};
            const entityTypeTextColorMap = {};
            uniqueEntityTypes.forEach(type => {
                const bgColor = getRandomColor();
                entityTypeColorMap[type] = bgColor;
                entityTypeTextColorMap[type] = isColorDark(bgColor) ? '#FFFFFF' : '#000000';
            });

            res.render('index', {
                wordsData: wordsData,
                uniqueEntityTypes: uniqueEntityTypes,
                entityTypeColorMap: entityTypeColorMap,
                entityTypeTextColorMap: entityTypeTextColorMap
            });

            const endTime = Date.now();
            console.log(`File '${req.file.originalname}' processed in ${endTime-startTime}ms`);
        });
    });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}

module.exports = app;
