import DetailModal from "../../src/app/components/DetailModal";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("DetailModal", () => {
  it("should render detail modal with one row and 5 cells", () => {
    // Act
    const { getByTestId } = render(
      <DetailModal
        open={true}
        onOpenChange={vi.fn()}
        selectedItem={{
          id: "1",
          color: "#fFF",
          name: "dasdsa",
          year: 12312,
          pantone_value: "sad",
        }}
      />
    );

    // Assert
    expect(getByTestId("detail-box").children.length).toBe(2);
    expect(getByTestId("detail-table-row").children.length).toBe(5);
  });

  it("should render detail modal without table", () => {
    // Act
    const { getByTestId } = render(
      <DetailModal open={true} onOpenChange={vi.fn()} selectedItem={null} />
    );

    // Assert
    expect(getByTestId("detail-box").children.length).toBe(1);
  });
});

afterEach(() => {
  cleanup();
});
