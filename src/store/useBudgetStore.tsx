import { create } from "zustand";

export type IngredientRow = {
	ingredient: string;
	defaultProduct: string;
	costPerUnit: number;
};

type BudgetStore = {
	ingredients: IngredientRow[];

	setIngredients: (rows: IngredientRow[]) => void;

	updateIngredient: (ingredient: string, update: Partial<IngredientRow>) => void;
};

export const useBudgetStore = create<BudgetStore>((set) => ({
	ingredients: [
		{ ingredient: "Rice", defaultProduct: "rice 1kg", costPerUnit: 0.0035 },
		{ ingredient: "Milk", defaultProduct: "milk 2L", costPerUnit: 2.0 },
	],

	setIngredients: (rows) => set({ ingredients: rows }),

	updateIngredient: (ingredient, update) =>
		set((state) => ({
			ingredients: state.ingredients.map((row) =>
				row.ingredient === ingredient
					? { ...row, ...update }
					: row
			),
		})),
}));