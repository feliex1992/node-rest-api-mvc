/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express = __webpack_require__(/*! express */ \"express\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\nclass App {\n    constructor(routes, repository, variables, service) {\n        this.app = express();\n        this.expressRouter = express.Router();\n        this.port = variables.port;\n        this.routes = routes;\n        this.repository = repository;\n        this.service = service;\n        this._registerRoute = this._registerRoute.bind(this);\n        this._createRouteBoundAction = this._createRouteBoundAction.bind(this);\n        this._buildControllerInstance = this._buildControllerInstance.bind(this);\n    }\n    _registerRoute(uri, httpMethod, boundAction) {\n        this.expressRouter.route(uri)[httpMethod](boundAction);\n    }\n    _createRouteBoundAction(controllerClass, method, isSecure) {\n        const result = [\n            (req, res) => {\n                this._buildControllerInstance(controllerClass, req, res)[method]();\n            }\n        ];\n        if (isSecure) {\n            result.unshift(this.service.security.authenticate());\n        }\n        return result;\n    }\n    _buildControllerInstance(ControllerClass, req, res) {\n        return new ControllerClass({\n            params: req.params,\n            query: req.query,\n            headers: req.headers,\n            body: req.body,\n            repository: this.repository,\n            send: (statusCode, resource, location) => {\n                if (location) {\n                    res.location(location);\n                }\n                res.status(statusCode).send(resource);\n            }\n        });\n    }\n    start() {\n        this.app.use(express.json({ limit: \"30mb\" }));\n        this.app.use(express.urlencoded({ limit: \"30mb\", extended: true }));\n        this.app.use((req, res, next) => {\n            res.header(\"Access-Control-Allow-Origin\", \"*\");\n            res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept, x-auth-token\");\n            next();\n        });\n        this.app.use(cors());\n        this.app.use(helmet());\n        this.repository.registerRepositories();\n        this.routes.registerRoutes(this._registerRoute, this._createRouteBoundAction);\n        this.app.use(\"/api/v1\", this.expressRouter);\n        this.app.use((req, res) => {\n            res.status(404).send({ url: `${req.originalUrl} not found!` });\n        });\n        this.app.listen(this.port, () => this.service.logger.info(`App listening on port: ${this.port}.`));\n    }\n}\nexports.default = App;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/App.ts?");

/***/ }),

/***/ "./src/config/DataBase.ts":
/*!********************************!*\
  !*** ./src/config/DataBase.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst typeorm = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst UserEntity_1 = __webpack_require__(/*! ../entities/masters/UserEntity */ \"./src/entities/masters/UserEntity.ts\");\nclass DataBase {\n    constructor(variables, logger) {\n        const { typeDb, urlDb } = variables;\n        this.typeDb = typeDb;\n        this.urlDb = urlDb;\n        this.logger = logger;\n        this.connect();\n    }\n    connect() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield typeorm.createConnection({\n                type: this.typeDb,\n                url: this.urlDb,\n                synchronize: true,\n                entities: [\n                    UserEntity_1.tm_user\n                ]\n            })\n                .then((connection) => {\n                this.logger.info(\"Success connect to database.\");\n                return connection;\n            })\n                .catch((err) => {\n                throw new Error(`ERROR DATABASE: ${err}`);\n            });\n        });\n    }\n    getDb() {\n        return typeorm;\n    }\n}\nexports.default = DataBase;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/config/DataBase.ts?");

/***/ }),

/***/ "./src/config/Variables.ts":
/*!*********************************!*\
  !*** ./src/config/Variables.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Variables {\n    constructor() {\n        this.jwtPrivateKey = process.env.JWTKEY_API;\n        this.port = process.env.PORT_API;\n        this.typeDb = process.env.TYPEDB_API;\n        this.urlDb = process.env.URLDB_API;\n        this.checkVariables();\n    }\n    checkVariables() {\n        if (!this.jwtPrivateKey)\n            throw new Error(\"ERROR: JWT key api not found!\");\n        if (!this.port)\n            throw new Error(\"ERROR: Port api not found!\");\n        if (!this.typeDb)\n            throw new Error(\"ERROR: Type Database api not found!\");\n        if (!this.urlDb)\n            throw new Error(\"ERROR: Url Connection Database api not found!\");\n    }\n    getVariables() {\n        return {\n            jwtPrivateKey: this.jwtPrivateKey,\n            port: this.port,\n            typeDb: this.typeDb,\n            urlDb: this.urlDb\n        };\n    }\n}\nexports.default = Variables;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/config/Variables.ts?");

/***/ }),

/***/ "./src/controllers/ControllerBase.ts":
/*!*******************************************!*\
  !*** ./src/controllers/ControllerBase.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass ControllerBase {\n    constructor({ params, query, headers, body, send, repository }) {\n        this.params = params;\n        this.query = query;\n        this.headers = headers;\n        this.body = body;\n        this.send = send;\n        this.repository = repository;\n    }\n    error(err) {\n        const status = err.statusCode || err.status;\n        const statusCode = status || 500;\n        const message = err.message || err;\n        this.send(statusCode, message);\n    }\n    success(data) {\n        this.send(200, data);\n    }\n}\nexports.default = ControllerBase;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/controllers/ControllerBase.ts?");

/***/ }),

/***/ "./src/controllers/masters/UserController.ts":
/*!***************************************************!*\
  !*** ./src/controllers/masters/UserController.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst ControllerBase_1 = __webpack_require__(/*! ../ControllerBase */ \"./src/controllers/ControllerBase.ts\");\nclass UserController extends ControllerBase_1.default {\n    getUsers() {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.repository.users.createQueryRunner();\n            const result = yield this.repository.users.getUsers();\n            yield this.repository.users.releaseQueryRunner();\n            this.success(result);\n        });\n    }\n    getUserByUserId() {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.repository.users.createQueryRunner();\n            const result = yield this.repository.users.getUserById(this.params.user_id);\n            yield this.repository.users.releaseQueryRunner();\n            this.success(result);\n        });\n    }\n    addUser() {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const { error } = this.repository.users.validateAddUser(this.body);\n                if (error)\n                    this.error({ statusCode: 400, message: error.details[0].message });\n                if (this.body.password !== this.body.retype_password)\n                    return this.error({ statusCode: 400, message: \"Password dan retype-password tidak sama!\" });\n                yield this.repository.users.startTransaction();\n                let result = yield this.repository.users.getUserById(this.body.user_id);\n                if (result) {\n                    yield this.repository.users.rollbackTransaction();\n                    return this.error({ statusCode: 400, message: \"User id sudah terdaftar!\" });\n                }\n                result = yield this.repository.users.addUser(this.body);\n                yield this.repository.users.commitTransaction();\n                this.success(result);\n            }\n            catch (err) {\n                yield this.repository.users.rollbackTransaction();\n                this.error(err);\n            }\n        });\n    }\n    updateUserByUserId() {\n        return __awaiter(this, void 0, void 0, function* () {\n        });\n    }\n    deleteUser() {\n        return __awaiter(this, void 0, void 0, function* () {\n        });\n    }\n    loginUser() {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const { error } = this.repository.users.validateLoginUser(this.body);\n                if (error)\n                    this.error({ statusCode: 400, message: error.details[0].message });\n                yield this.repository.users.startTransaction();\n                const result = yield this.repository.users.loginUser(this.body);\n                yield this.repository.users.commitTransaction();\n                this.success(result);\n            }\n            catch (err) {\n                yield this.repository.users.rollbackTransaction();\n                this.error(err);\n            }\n        });\n    }\n}\nexports.default = UserController;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/controllers/masters/UserController.ts?");

/***/ }),

/***/ "./src/entities/masters/UserEntity.ts":
/*!********************************************!*\
  !*** ./src/entities/masters/UserEntity.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ValidLoginUser = exports.ValidAddUser = exports.tm_user = void 0;\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst jf = __webpack_require__(/*! joiful */ \"joiful\");\nlet tm_user = class tm_user {\n};\n__decorate([\n    typeorm_1.PrimaryColumn(),\n    __metadata(\"design:type\", String)\n], tm_user.prototype, \"user_id\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], tm_user.prototype, \"user_name\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], tm_user.prototype, \"level\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], tm_user.prototype, \"password\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], tm_user.prototype, \"kode_toko\", void 0);\ntm_user = __decorate([\n    typeorm_1.Entity()\n], tm_user);\nexports.tm_user = tm_user;\nclass ValidAddUser {\n}\n__decorate([\n    jf.string().required(),\n    __metadata(\"design:type\", String)\n], ValidAddUser.prototype, \"user_id\", void 0);\n__decorate([\n    jf.string().required(),\n    __metadata(\"design:type\", String)\n], ValidAddUser.prototype, \"user_name\", void 0);\n__decorate([\n    jf.string().required(),\n    __metadata(\"design:type\", String)\n], ValidAddUser.prototype, \"level\", void 0);\n__decorate([\n    jf.string().required(),\n    __metadata(\"design:type\", String)\n], ValidAddUser.prototype, \"password\", void 0);\n__decorate([\n    jf.string().required(),\n    __metadata(\"design:type\", String)\n], ValidAddUser.prototype, \"retype_password\", void 0);\n__decorate([\n    jf.string().required(),\n    __metadata(\"design:type\", String)\n], ValidAddUser.prototype, \"kode_toko\", void 0);\nexports.ValidAddUser = ValidAddUser;\nclass ValidLoginUser {\n}\n__decorate([\n    jf.string().required(),\n    __metadata(\"design:type\", String)\n], ValidLoginUser.prototype, \"user_id\", void 0);\n__decorate([\n    jf.string().required(),\n    __metadata(\"design:type\", String)\n], ValidLoginUser.prototype, \"password\", void 0);\nexports.ValidLoginUser = ValidLoginUser;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/entities/masters/UserEntity.ts?");

/***/ }),

/***/ "./src/repositories/Repository.ts":
/*!****************************************!*\
  !*** ./src/repositories/Repository.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst UserRepositories_1 = __webpack_require__(/*! ./masters/UserRepositories */ \"./src/repositories/masters/UserRepositories.ts\");\nclass Repository {\n    constructor(db, jf, service) {\n        this._db = db;\n        this._jf = jf;\n        this._service = service;\n    }\n    registerRepositories() {\n        this.users = new UserRepositories_1.default(this._db, this._jf, this._service);\n    }\n}\nexports.default = Repository;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/repositories/Repository.ts?");

/***/ }),

/***/ "./src/repositories/RepositoryBase.ts":
/*!********************************************!*\
  !*** ./src/repositories/RepositoryBase.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass RepositoryBase {\n    constructor(db, jf, service, sendColumn) {\n        this.db = db;\n        this.jf = jf;\n        this.sendColumn = sendColumn;\n        this.service = service;\n    }\n    createQueryRunner() {\n        return __awaiter(this, void 0, void 0, function* () {\n            this.queryRunner = this.db.getDb().getConnection().createQueryRunner();\n        });\n    }\n    releaseQueryRunner() {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.queryRunner.release();\n        });\n    }\n    startTransaction() {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.createQueryRunner();\n            yield this.queryRunner.startTransaction();\n        });\n    }\n    commitTransaction() {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.queryRunner.commitTransaction();\n            yield this.releaseQueryRunner();\n        });\n    }\n    rollbackTransaction() {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.queryRunner.rollbackTransaction();\n            yield this.releaseQueryRunner();\n        });\n    }\n}\nexports.default = RepositoryBase;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/repositories/RepositoryBase.ts?");

/***/ }),

/***/ "./src/repositories/masters/UserRepositories.ts":
/*!******************************************************!*\
  !*** ./src/repositories/masters/UserRepositories.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst RepositoryBase_1 = __webpack_require__(/*! ../RepositoryBase */ \"./src/repositories/RepositoryBase.ts\");\nconst UserEntity_1 = __webpack_require__(/*! ../../entities/masters/UserEntity */ \"./src/entities/masters/UserEntity.ts\");\nclass UserRepositories extends RepositoryBase_1.default {\n    constructor(db, jf, service) {\n        const sendColumn = [\"user.user_id\", \"user.user_name\", \"user.level\", \"user.kode_toko\"];\n        super(db, jf, service, sendColumn);\n    }\n    validateAddUser(userData) {\n        const result = this.jf.validateAsClass(userData, UserEntity_1.ValidAddUser);\n        return result;\n    }\n    validateLoginUser(userData) {\n        const result = this.jf.validateAsClass(userData, UserEntity_1.ValidLoginUser);\n        return result;\n    }\n    getUserById(user_id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const result = yield this.queryRunner.manager.createQueryBuilder()\n                .select(this.sendColumn)\n                .from(UserEntity_1.tm_user, \"user\")\n                .where(\"user.user_id = :user_id\", { user_id: user_id })\n                .getOne();\n            return result;\n        });\n    }\n    getUsers() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const result = yield this.queryRunner.manager.createQueryBuilder()\n                .select(this.sendColumn)\n                .from(UserEntity_1.tm_user, \"user\")\n                .where()\n                .getMany();\n            return result;\n        });\n    }\n    addUser(userData) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {\n                try {\n                    const newUser = {\n                        user_id: userData.user_id,\n                        user_name: userData.user_name,\n                        level: userData.level,\n                        password: userData.password,\n                        kode_toko: userData.kode_toko\n                    };\n                    newUser.password = yield this.service.userService.hashPassword(newUser.password);\n                    const result = yield this.queryRunner.manager.createQueryBuilder()\n                        .insert()\n                        .into(UserEntity_1.tm_user)\n                        .values([\n                        newUser\n                    ])\n                        .execute();\n                    resolve(\"Simpan data user berhasil.\");\n                }\n                catch (err) {\n                    reject(err);\n                }\n            }));\n        });\n    }\n    deleteUser(user_id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let result = yield this.queryRunner.manager.createQueryBuilder()\n                .select()\n                .from(UserEntity_1.tm_user)\n                .where(\"user_id = :user_id\", { user_id: user_id })\n                .getOne();\n            return result;\n        });\n    }\n    loginUser(userData) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {\n                try {\n                    const sendColumn = this.sendColumn;\n                    sendColumn.push(\"user.password\");\n                    const user = yield this.queryRunner.manager.createQueryBuilder()\n                        .select(sendColumn)\n                        .from(UserEntity_1.tm_user, \"user\")\n                        .where(\"user.user_id = :user_id\", { user_id: userData.user_id })\n                        .getOne();\n                    if (!user)\n                        return reject(\"User Id atau password salah!\");\n                    const matchPassword = yield this.service.user.comparePassword(userData.password, user);\n                    if (!matchPassword)\n                        return reject(\"User Id atau password salah!\");\n                    const token = yield this.service.security.generateToken(user);\n                    if (!token)\n                        return reject(\"Generate token gagal!\");\n                    let result = yield this.service.cacheData.storeCache({ user_id: user.user_id, token: token });\n                    if (!result)\n                        return reject(\"Gagal simpan token di cache!\");\n                    resolve({\n                        user_id: user.user_id,\n                        user_name: user.user_name,\n                        level: user.level,\n                        token: token\n                    });\n                }\n                catch (err) {\n                    reject(err);\n                }\n            }));\n        });\n    }\n    getCache(userId) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {\n                try {\n                    const result = yield this.service.cacheData.getCache({ \"user_id\": userId });\n                    resolve(result);\n                }\n                catch (err) {\n                    reject(err);\n                }\n            }));\n        });\n    }\n}\nexports.default = UserRepositories;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/repositories/masters/UserRepositories.ts?");

/***/ }),

/***/ "./src/routes/Routes.ts":
/*!******************************!*\
  !*** ./src/routes/Routes.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst RoutesCollection_1 = __webpack_require__(/*! ./RoutesCollection */ \"./src/routes/RoutesCollection.ts\");\nconst UserRoutes_1 = __webpack_require__(/*! ./masters/UserRoutes */ \"./src/routes/masters/UserRoutes.ts\");\nclass Routes {\n    constructor() {\n        this.routeBuilders = [\n            new UserRoutes_1.default()\n        ];\n    }\n    registerRoutes(registerRouteCallback, createRouteBoundAction) {\n        this.routeBuilders.map((builder) => {\n            const routes = builder.getRoutes();\n            routes.map((routeData) => {\n                RoutesCollection_1.default.addRouteData(routeData.controllerClass, routeData.action, {\n                    uri: routeData.uri, httpMethod: routeData.httpMethod\n                });\n                const boundAction = createRouteBoundAction(routeData.controllerClass, routeData.action, routeData.isSecure);\n                registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);\n            });\n        });\n    }\n}\nexports.default = Routes;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/routes/Routes.ts?");

/***/ }),

/***/ "./src/routes/RoutesBase.ts":
/*!**********************************!*\
  !*** ./src/routes/RoutesBase.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass RouteBase {\n    constructor(controllerClass) {\n        this.routes = [];\n        this.ControllerClass = controllerClass;\n    }\n    buildRoute(uri, httpMethod, action, isSecure = false) {\n        this.routes.push({\n            controllerClass: this.ControllerClass,\n            uri,\n            httpMethod,\n            action,\n            isSecure\n        });\n    }\n}\nexports.default = RouteBase;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/routes/RoutesBase.ts?");

/***/ }),

/***/ "./src/routes/RoutesCollection.ts":
/*!****************************************!*\
  !*** ./src/routes/RoutesCollection.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass RoutesCollection {\n    static addRouteData(controller, action, routeData) {\n        routeData.controller = controller.name;\n        routeData.action = action;\n        this.routesCollection = RoutesCollection;\n        if (!this.routesCollection[controller.name])\n            this.routesCollection[controller.name] = {};\n        this.routesCollection[controller.name] = Object.assign({}, this.routesCollection[controller.name], {\n            [action]: routeData\n        });\n    }\n}\nexports.default = RoutesCollection;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/routes/RoutesCollection.ts?");

/***/ }),

/***/ "./src/routes/masters/UserRoutes.ts":
/*!******************************************!*\
  !*** ./src/routes/masters/UserRoutes.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst RoutesBase_1 = __webpack_require__(/*! ../RoutesBase */ \"./src/routes/RoutesBase.ts\");\nconst UserController_1 = __webpack_require__(/*! ../../controllers/masters/UserController */ \"./src/controllers/masters/UserController.ts\");\nclass UserRoutes extends RoutesBase_1.default {\n    constructor() {\n        super(UserController_1.default);\n    }\n    getRoutes() {\n        this.buildRoute(\"/users/login\", \"post\", \"loginUser\");\n        this.buildRoute(\"/users\", \"get\", \"getUsers\", true);\n        this.buildRoute(\"/users/by-user-id/:user_id\", \"get\", \"getUserByUserId\", true);\n        this.buildRoute(\"/users/add\", \"post\", \"addUser\");\n        return this.routes;\n    }\n}\nexports.default = UserRoutes;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/routes/masters/UserRoutes.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\nconst jf = __webpack_require__(/*! joiful */ \"joiful\");\nconst App_1 = __webpack_require__(/*! ./App */ \"./src/App.ts\");\nconst Variables_1 = __webpack_require__(/*! ./config/Variables */ \"./src/config/Variables.ts\");\nconst Routes_1 = __webpack_require__(/*! ./routes/Routes */ \"./src/routes/Routes.ts\");\nconst Repository_1 = __webpack_require__(/*! ./repositories/Repository */ \"./src/repositories/Repository.ts\");\nconst DataBase_1 = __webpack_require__(/*! ./config/DataBase */ \"./src/config/DataBase.ts\");\nconst Services_1 = __webpack_require__(/*! ./services/Services */ \"./src/services/Services.ts\");\ndotenv.config();\nconst variables = new Variables_1.default();\nconst service = new Services_1.default(variables.getVariables());\nconst app = new App_1.default(new Routes_1.default, new Repository_1.default(new DataBase_1.default(variables.getVariables(), service.logger), jf, service), variables.getVariables(), service);\napp.start();\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/server.ts?");

/***/ }),

/***/ "./src/services/CacheData.ts":
/*!***********************************!*\
  !*** ./src/services/CacheData.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst NodeCache = __webpack_require__(/*! node-cache */ \"node-cache\");\nclass CacheData {\n    constructor() {\n        this.nodeCache = new NodeCache();\n    }\n    storeCache(dataStore) {\n        const result = this.nodeCache.set(dataStore.user_id, { token: dataStore.token }, 1200);\n        return result;\n    }\n    getCache(dataStore) {\n        const result = this.nodeCache.get(dataStore.user_id);\n        return result;\n    }\n    deleteCache(dataStore) {\n        const result = this.nodeCache.del(dataStore.user_id);\n        return result;\n    }\n}\nexports.default = CacheData;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/services/CacheData.ts?");

/***/ }),

/***/ "./src/services/Logger.ts":
/*!********************************!*\
  !*** ./src/services/Logger.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst winston = __webpack_require__(/*! winston */ \"winston\");\nclass Logger {\n    constructor() {\n        this.logger = winston.createLogger({\n            level: \"info\",\n            format: winston.format.json(),\n            transports: [\n                new winston.transports.File({ filename: \"log/error.log\", level: \"error\" }),\n                new winston.transports.Console({ level: \"info\", format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })\n            ],\n            exceptionHandlers: [\n                new winston.transports.File({ filename: \"log/exceptions.log\" }),\n                new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })\n            ]\n        });\n    }\n    info(message) {\n        this.logger.log({\n            level: \"info\",\n            message: message\n        });\n    }\n    error(message) {\n        this.logger.log({\n            level: \"error\",\n            message: message\n        });\n    }\n}\nexports.default = Logger;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/services/Logger.ts?");

/***/ }),

/***/ "./src/services/Security.ts":
/*!**********************************!*\
  !*** ./src/services/Security.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nclass Security {\n    constructor(variables) {\n        this.jwtPrivateKey = variables.jwtPrivateKey;\n    }\n    generateToken(userData) {\n        const token = jwt.sign({ user_id: userData.user_id, level: userData.level, validate_time: new Date() }, this.jwtPrivateKey);\n        return token;\n    }\n    authenticate() {\n        return [\n            (req, res, next) => {\n                if (req.headers[\"x-auth-token\"] !== \"test\") {\n                    return res.status(400).send(\"Un Authorization!!!\");\n                }\n                next();\n            }\n        ];\n    }\n}\nexports.default = Security;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/services/Security.ts?");

/***/ }),

/***/ "./src/services/Services.ts":
/*!**********************************!*\
  !*** ./src/services/Services.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst CacheData_1 = __webpack_require__(/*! ./CacheData */ \"./src/services/CacheData.ts\");\nconst Logger_1 = __webpack_require__(/*! ./Logger */ \"./src/services/Logger.ts\");\nconst Security_1 = __webpack_require__(/*! ./Security */ \"./src/services/Security.ts\");\nconst UserService_1 = __webpack_require__(/*! ./UserService */ \"./src/services/UserService.ts\");\nclass Services {\n    constructor(variables) {\n        this.variables = variables;\n        this.registerService();\n    }\n    registerService() {\n        this.cacheData = new CacheData_1.default();\n        this.logger = new Logger_1.default();\n        this.security = new Security_1.default(this.variables);\n        this.user = new UserService_1.default();\n    }\n}\nexports.default = Services;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/services/Services.ts?");

/***/ }),

/***/ "./src/services/UserService.ts":
/*!*************************************!*\
  !*** ./src/services/UserService.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nclass UserService {\n    hashPassword(password) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const salt = yield bcrypt.genSalt(10);\n            const encryptPassword = yield bcrypt.hash(password, salt);\n            return encryptPassword;\n        });\n    }\n    comparePassword(password, userData) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const validPassword = yield bcrypt.compare(password, userData.password);\n            if (!validPassword)\n                return validPassword;\n            return validPassword;\n        });\n    }\n}\nexports.default = UserService;\n\n\n//# sourceURL=webpack://rest-api-mvc/./src/services/UserService.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");;

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");;

/***/ }),

/***/ "joiful":
/*!*************************!*\
  !*** external "joiful" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("joiful");;

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");;

/***/ }),

/***/ "node-cache":
/*!*****************************!*\
  !*** external "node-cache" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-cache");;

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");;

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");;

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/server.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;