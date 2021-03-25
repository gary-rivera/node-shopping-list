const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let pickles = { 
  name: "Pickles",
  price: 5.99
};

let cheesesteak = {
  name: "Philly Cheese",
  price: 9.99
}

beforeEach(function() {
  db.items.push(pickles, cheesesteak)
});

afterEach(function() {
  db.items = []
});

/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.items.length).toEqual(2);
  });
});
// end

/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/:name", function() {
  it("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${pickles.name}`);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ item: pickles });
  });

  it("Responds with 404 if can't find item", async function() {
    const resp = await request(app).get(`/items/not-here`);
    console.log(resp)
    expect(resp.statusCode).toEqual(404);
  });
});

// /** POST /items - create item from data; return `{item: item}` */

describe("POST /items", function() {
  it("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "Mayonaisse"
      });
      //check db length is 3 now
    expect(db.items.length).toEqual(3);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      item: { name: "Mayonaisse" }
    });
  });
});
// end

/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", function() {
  it("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${pickles.name}`)
      .send({
        name: "Cured Cucumbers"
      });
      //check db only has 2 items still
    expect(db.items.length).toEqual(2);
    expect(resp.body).toEqual({
      item: { name: "Cured Cucumbers", price: 5.99}
    });
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});
// // end

/** DELETE /items/[name] - delete item,
 *  return `{message: "Cat deleted"}` */

describe("DELETE /items/:name", function() {
  it("Deletes a single a item", async function() {
    const resp = await request(app)
      .delete(`/items/${pickles.name}`);

    expect(resp.body).toEqual({ message: "deleted" });
    expect(db.items.length).toEqual(1);
  });
});
// // end
