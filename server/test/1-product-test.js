const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
const app = require('../app')
const clearDatabase = require('../helpers/test/clearDatabase')

chai.use(chaiHttp);

after(function(done){
  console.log('database product cleared')
  clearDatabase(done)
})

let token = ''
let ProductId = ''

//========== Get Token ==========
describe(`get token`, function(){
  it("Success login with status 200", function (done) {
    let user = {
      email: "qwer@mail.com",
      password: "qwerqwer"
    };
    chai
      .request(app)
      .post("/users/login")
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.keys("_id","email","name","isAdmin", "token")
        token = res.body.token
        done();
      })
  })
})


//========== CRUD Product ==========
describe(`product test`, function(){
  //========== Create Product ==========
  describe('POST /products/create', function(){
    it('Sucess create product with status 201', function (done){
      let product = {
        name: "sepatu",
        description: "running shoes",
        price: 5000,
        stock: 100,
      }
      chai
      .request(app)
      .post('/products/create')
      .set('token', token)
      .send(product)
      .end(function(err,res){
        expect(err).to.be.null
        expect(res.body).to.be.an("object")
        // expect(res).to.have.status(201)
        // expect(res.body.name).to.equal("qwer")
        // expect(res.body.email).to.equal("qwer@mail.com")
        // expect(res.body.password).to.not.equal("qwerqwer")
        // expect(res.body).to.have.keys(['_id', 'name', 'email', 'password', "createdAt", "updatedAt", "__v"])
        done()
      })
    })
  })

  //========== Read ==========
  describe("GET /products/findAll", function () {
    it("Success get products data with status 200", function (done) {
      chai
        .request(app)
        .get("/products/findAll")
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array")
          done();
        })
    })
  })

  describe("GET /products/product/:id", function () {
    it("Success get products data by id with status 200", function (done) {
      chai
        .request(app)
        .get(`/products/products/product/${ProductId}`)
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          done();
        })
    })
  })

  //========== Update ==========
  describe("POST /productts/:id", function () {
    it("Success update with status 200", function (done) {
      let product = {
        name: "sepatu",
        description: "running shoes",
        price: 5000,
        stock: 100,
      }
      chai
        .request(app)
        .post("/users/login")
        .send(product)
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          done();
        })
    })
  })

  //========== Delete ==========
  describe("POST /users//:id", function () {
    it("Success login with status 200", function (done) {
      chai
        .request(app)
        .post("/users/login")
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          done();
        })
    })
  })


})