import { expect, test } from "vitest";
import { getColorId } from "./helper";

test("should get color id query if present", () => {
  const colorId = "1";
  const expectedResult = { id: "1" };

  const result = getColorId(colorId);

  expect(result).to.deep.equal(expectedResult);
});

test("should empty object if color id not present", () => {
  const colorId = null;
  const expectedResult = {};

  const result = getColorId(colorId);

  expect(result).to.deep.equal(expectedResult);
});
