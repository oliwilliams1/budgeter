import { useMemo, useState, forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";
import type { ICellEditorParams } from "ag-grid-community";
import { useBudgetStore } from "../store/useBudgetStore";

type Props = ICellEditorParams & {
	values: string[];
};

const ProductDropdownEditor = forwardRef((props: Props, ref) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const [search, setSearch] = useState("");
	const [pos, setPos] = useState<DOMRect | null>(null);

	const values = props.values ?? [];
	const updateIngredient = useBudgetStore((s) => s.updateIngredient);

	useLayoutEffect(() => {
		const rect = props.eGridCell.getBoundingClientRect();
		setPos(rect);

		requestAnimationFrame(() => {
			containerRef.current?.querySelector("input")?.focus();
		});
	}, [props.eGridCell]);

	const filtered = useMemo(() => {
		return values.filter((v) =>
			v.toLowerCase().includes(search.toLowerCase())
		);
	}, [search, values]);

	useImperativeHandle(ref, () => ({
		getValue: () => props.value,
	}));

	const select = (v: string) => {
		updateIngredient(props.data.ingredient, {
			defaultProduct: v,
		});

		props.stopEditing();
	};

	if (!pos) return null;

	return (
		<div
			ref={containerRef}
			style={{
				position: "fixed",
				padding: 6,
				top: pos.bottom,
				left: pos.left,
				width: pos.width,
				zIndex: 9999,
			}}
		>
			<input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search..."
				style={{ width: "100%" }}
			/>

			<div style={{ maxHeight: 180, overflowY: "auto" }}>
				{filtered.map((v) => (
					<div
						key={v}
						onMouseDown={() => select(v)}
						style={{
							padding: 4,
							cursor: "pointer",
						}}
					>
						{v}
					</div>
				))}
			</div>
		</div>
	);
});

export default ProductDropdownEditor;