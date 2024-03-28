import { afterEach, expect, test } from "vitest";
import { getColorId, getPage, getPerPage } from "../../src/app/utils/helper";
import { cleanup } from "@testing-library/react";

test("should get color id query if present", () => {
  const colorId = "1";
  const expectedResult = { id: "1" };

  const result = getColorId(colorId);

  expect(result).to.deep.equal(expectedResult);
});

test("should be empty object if color id not present", () => {
  const colorId = null;
  const expectedResult = {};

  const result = getColorId(colorId);

  expect(result).to.deep.equal(expectedResult);
});

test("should get number of page if present", () => {
  const page = "1";
  const expectedResult = { page: "1" };
  const result = getPage(page);
  expect(result).to.deep.equal(expectedResult);
});

test("should be empty object if page number not present", () => {
  const page = null;
  const expectedResult = {};
  const result = getPage(page);
  expect(result).to.deep.equal(expectedResult);
});

test("should get how many items are displayed per page if present", () => {
  const perPage = "10";
  const expoectedResult = { per_page: "10" };
  const result = getPerPage(perPage);
  expect(result).to.deep.equal(expoectedResult);
});

test("should not get how many items are displayed per page if not present", () => {
  const perPage = "";
  const expoectedResult = {};
  const result = getPerPage(perPage);
  expect(result).to.deep.equal(expoectedResult);
});
afterEach(() => {
  cleanup();
});
