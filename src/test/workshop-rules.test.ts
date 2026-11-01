import { describe, expect, it } from "vitest";
import { cajonesRecuerdos, cuadroDecorativo, itemsTablonEnPaso, pasos, secretIds } from "@/config/content";

describe("Workshop rules", () => {
  it("shows exactly one note and one photo from step 1 through the final step", () => {
    for (let step = 0; step < pasos.length; step++) {
      const items = itemsTablonEnPaso(step);
      expect(items).toHaveLength(2);
      expect(items.filter((i) => i.tipo === "postit")).toHaveLength(1);
      expect(items.filter((i) => i.tipo === "foto")).toHaveLength(1);
      expect(items.find((i) => i.tipo === "foto")?.imagen).toBeTruthy();
    }
  });
  it("never counts the decorative frame as a secret", () => {
    expect(secretIds).not.toContain("cuadro");
    expect(cuadroDecorativo.imagen).toContain("lamina-capadocia.png");
  });
  it("keeps all three memory drawers with their two selectable objects", () => {
    expect(cajonesRecuerdos.map((c) => c.map((o) => o.id))).toEqual([["bingo", "guatafac"], ["shakira", "ticket"], ["mapas", "san-frutos"]]);
  });
});