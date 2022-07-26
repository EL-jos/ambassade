const express = require("express");
const expressSession = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage});

const app = express();
const port = process.env.PORT || 4000;
const ejs = require('ejs');
app.listen(port, () => console.log("Demarrage du serveur reussit sur le port " + port));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const oneDay = 1000 * 60 * 60 * 24;
app.use(expressSession({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

global.ressortissant = null;
app.use("*", (req, res, next) => {
    ressortissant = req.session.ressortissant;
    next();
});

/* PARTIE RESSORTISSANT */
const index = require('./routes/index');
const monCompte = require('./routes/mon-compte');
const enregistrement = require('./routes/enregistrement');
const identification = require('./routes/identification');
const connexionRessortissant = require('./routes/connexion-ressortissant');
const deconnexion = require('./routes/deconnexion');
const about = require('./routes/about');
const e_services = require('./routes/e-services');
const demandeDocument = require('./routes/demande-document');
const telechargeDocument = require('./routes/telecharge-document');
const ressortissant_send_message = require('./routes/ressortissant_send_message');

const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

app.get('/', index);
app.get('/mon-compte', authMiddleware, monCompte);
app.get('/enregistrement', enregistrement);
app.get('/identification', identification);
app.post('/connexion-ressortissant', upload.none(), redirectIfAuthenticatedMiddleware, connexionRessortissant);
app.get('/deconnexion', deconnexion);
app.get('/e-services', e_services);
app.get('/about', about);
app.get('/d/:passeport/:categorie_document', demandeDocument);
app.get('/t/:passeport/:categorie_document', telechargeDocument);
app.post('/ressortissant-send-message', upload.none(), ressortissant_send_message);




/* PARTIE AMBASSADE */
const createRessortissant = require("./routes/create-ressortissant");
const getAllRessortissant = require("./routes/get-all-ressortissant");
const updateRessortissant = require("./routes/update-ressortissant");
const deleteRessortissant = require("./routes/delete-ressortissant");

const createDocument = require("./routes/create-document");
const getAllDocument = require("./routes/get-all-document");
const updateDocument = require("./routes/update-document");
const deleteDocument = require("./routes/delete-document");

const sexes = require("./routes/read-all-sexes");
const statuts = require("./routes/read-all-statuts");
const provinces = require("./routes/read-all-provinces");
const etatcivils = require("./routes/read-all-etat-civils");
const getFile = require('./routes/get-file');
const categoriesDocuments = require("./routes/get-all-categories-documents");

const getAllConversationAmbassade = require('./routes/get-all-conversation-ambassade');
const getAllRessortissantSendMessageAmbassade = require('./routes/get-all-ressortissant-send-message-ambassade');
const ambassadeSendMessage = require('./routes/ambassade-send-message');

/* CRUD RESSORTISSANTS */
app.post("/create-ressortissant", upload.single('photo'), createRessortissant);
app.get("/get-all-ressortissant", getAllRessortissant);
app.post("/update-ressortissant", upload.single('photo'), updateRessortissant);
app.post("/delete-ressortissant", upload.none(), deleteRessortissant);

/* CRUD DOCUMENTS */
app.post("/create-document", upload.single('file'), createDocument);
app.get("/get-all-document", getAllDocument);
app.post("/update-document", upload.none(), updateDocument);
app.post("/delete-document", upload.none(), deleteDocument);

/* CRUD MESSAGE */
app.post("/get-all-conversation", upload.none(), getAllConversationAmbassade);
app.get("/get-all-ressortissant-send-messages", getAllRessortissantSendMessageAmbassade);
app.post('/ambassade-send-message', upload.none(), ambassadeSendMessage);

app.get("/get-all-sexe", sexes);
app.get("/get-all-etat-civil", etatcivils);
app.get("/get-all-provinces", provinces);
app.get("/get-all-statuts", statuts);
app.get("/uploads/:name_file", getFile);
app.get("/get-all-categories-documents", categoriesDocuments);
