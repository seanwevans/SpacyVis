import express from 'express';
import multer from 'multer';
import xml2js from 'xml2js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getRandomColor, isColorDark } from './utils/color.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Simple logging utility honoring the LOGGING environment variable
const log = (...args) => {
    if (process.env.LOGGING !== 'false') {
        console.log(...args);
    }
};

app.use(express.static(path.join(__dirname, 'public')));
app.use('/utils', express.static(path.join(__dirname, 'utils')));
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
            log(`File '${req.file.originalname}' processed in ${endTime - startTime}ms`);
        });
    });
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    app.listen(port, () => {
        log(`Server running at http://localhost:${port}/`);
    });
}

export default app;
