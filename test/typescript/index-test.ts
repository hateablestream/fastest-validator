import { expectAssignable } from "tsd";

import Validator from "../../";

const v = new Validator();

{
  const schema = {
    id: { type: "number", positive: true },
    name: { type: "string" },
    age: { type: "number", min: 18, max: 99 },
  };
  const check = v.compile(schema);

  const res = check({});

  if (res instanceof Array) {
    expectAssignable<"id" | "name" | "age">(res[0].field);
  }
}

{
  const schema = {
    name: { type: "string" },
    age: { type: "number", optional: true },
  };

  const check = v.compile(schema);

  const res = check({});

  if (res instanceof Array) {
    expectAssignable<"name" | "age">(res[0].field);
  }
}

{
  const schema = {
    name: { type: "string" },
    $$strict: true,
  };

  const check = v.compile(schema);

  const res = check({});

  if (res instanceof Array) {
    expectAssignable<"name">(res[0].field);
  }
}

{
  const schema = {
    cache: [{ type: "string" }, { type: "boolean" }],
  };

  const check = v.compile(schema);

  const res = check({});

  if (res instanceof Array) {
    expectAssignable<"cache">(res[0].field);
  }
}

{
  const schema = {
    $$root: true,
    type: "string",
    min: 3,
    max: 6,
  };

  const check = v.compile(schema);

  const res = check({});

  if (res instanceof Array) {
    expectAssignable<string>(res[0].field);
  }
}

{
  const schema = {
    password: "string|min:6",
    age: "number|optional|integer|positive|min:0|max:99",
    state: ["boolean", "number|min:0|max:1"],
  };

  const check = v.compile(schema);

  const res = check({});

  if (res instanceof Array) {
    expectAssignable<"password" | "age" | "state">(res[0].field);
  }
}

{
  const schema = {
    address: {
      type: "object",
      strict: true,
      props: {
        country: { type: "string" },
        city: "string",
        zip: "number",
      },
    },
  };

  const check = v.compile(schema);

  const res = check({});

  if (res instanceof Array) {
    expectAssignable<"address" | "address.country" | "address.city" | "address.zip">(
      res[0].field
    );
  }
}

{
  const schema = {
    dot: {
      $$type: "object",
      x: "number",
      y: "number"
    },
    circle: {
      $$type: "object|optional",
      o: {
        $$type: "object",
        x: "number",
        y: "number",
      },
      r: "number",
    },
  };

  const check = v.compile(schema);

  const res = check({});

  if (res instanceof Array) {
    expectAssignable<"dot" | "circle">(res[0].field);
  }
}
