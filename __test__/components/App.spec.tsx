import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import { cleanup, render } from "@testing-library/react";
import App from "../../src/app/components/App";

const products = {
  page: 1,
  per_page: 5,
  total: 12,
  total_pages: 3,
  data: [
    {
      id: 1,
      name: "cerulean",
      year: 2000,
      color: "#98B2D1",
      pantone_value: "15-4020",
    },
    {
      id: 2,
      name: "fuchsia rose",
      year: 2001,
      color: "#C74375",
      pantone_value: "17-2031",
    },
    {
      id: 3,
      name: "true red",
      year: 2002,
      color: "#BF1932",
      pantone_value: "19-1664",
    },
    {
      id: 4,
      name: "aqua sky",
      year: 2003,
      color: "#7BC4C4",
      pantone_value: "14-4811",
    },
    {
      id: 5,
      name: "tigerlily",
      year: 2004,
      color: "#E2583E",
      pantone_value: "17-1456",
    },
  ],
  support: {
    url: "https://reqres.in/#support-heading",
    text: "To keep ReqRes free, contributions towards server costs are appreciated!",
  },
};

beforeEach(() => {
  const fetchMocker = createFetchMock(vi);

  fetchMocker.mockIf(/^https?:\/\/reqres.in\/api\/products?".*$/, (req) => {
    if (req.url.includes("13")) {
      return { products };
    } else if (req.url.includes("14")) {
      return {
        status: 500,
        body: "Server error",
      };
    } else {
      return {
        status: 404,
        body: "Not Found",
      };
    }
  });
});

describe("App", () => {
  it("should render the app component with client not found error", () => {
    vi.mock("next/navigation", async () => {
      const mockUseSearchParams = {
        get: (id: string) => {
          return "13";
        },
      };

      const actual = (await vi.importActual("next/navigation")) as any;
      return {
        ...actual,
        useSearchParams: () => mockUseSearchParams,
        router: vi.fn(),
      };
    });

    vi.mock("next/navigation", async () => {
      const mockUseSearchParams = {
        get: (id: string) => {
          return "13";
        },
      };

      const actual = (await vi.importActual("next/navigation")) as any;
      return {
        ...actual,
        useSearchParams: () => mockUseSearchParams,
      };
    });
  });
});
afterEach(() => {
  cleanup();
});
