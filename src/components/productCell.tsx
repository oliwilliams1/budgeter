import type { ICellRendererParams } from "ag-grid-community";

export default function ProductCellRenderer(
	props: ICellRendererParams
) {
	return (
		<span style={{ display: "flex", justifyContent: "space-between" }}>
			<span>{props.value}</span>
			<span style={{ opacity: 0.6 }}>▾</span>
		</span>
	);
}