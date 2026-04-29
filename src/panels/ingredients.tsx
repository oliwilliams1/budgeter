import { useMemo } from "react";
import { registerPanel } from "./registry";
import { GRID_MODULES } from "../config/grid";
import { type ColDef } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import ProductDropdownEditor from "../components/productDropdown";
import ProductCellRenderer from "../components/productCell";
import { useBudgetStore } from "../store/useBudgetStore";

type IngredientRow = {
	ingredient: string;
	defaultProduct: string;
	costPerUnit: number;
};

const productOptions = [
	"rice 1kg",
	"rice 500g",
	"bulk rice 5kg",
	"milk 2L",
	"milk 1L no name",
];

function Example1() {
	const ingredients = useBudgetStore((s) => s.ingredients);

	const colDefs = useMemo<ColDef<IngredientRow>[]>(() => [
		{
			field: "ingredient",
			editable: true,
		},
		{
			field: "defaultProduct",
			editable: true,
			cellRenderer: ProductCellRenderer,
			cellEditor: ProductDropdownEditor,
			cellEditorPopup: true,

			cellEditorParams: {
				values: productOptions,
			},
		},
		{
			field: "costPerUnit",
			editable: false,
			valueFormatter: (p) => `$${Number(p.value).toFixed(4)}`,
		},
	], []);

	return (
		<div style={{ padding: 12 }}>
			<AgGridProvider modules={GRID_MODULES}>
				<div style={{ height: 500 }}>
					<AgGridReact
						rowData={ingredients}
						columnDefs={colDefs}
						singleClickEdit={true}
						stopEditingWhenCellsLoseFocus={true}
					/>
				</div>
			</AgGridProvider>
		</div>
	);
}

registerPanel({
	id: "example1",
	label: "Ingredients",
	component: Example1,
});

export default Example1;